import { json } from '@sveltejs/kit';

const AMERICAN_JAM_FEED_URL =
	'https://americanparkour.com/?post_type=tribe_events&ical=1&eventDisplay=list&iframe=1';
const CACHE_TTL_MS = 30 * 60 * 1000;

let cachedEvents = null;
let cacheExpiresAt = 0;
let pendingRequest = null;

const normalizeUrl = (value) => {
	if (!value) {
		return undefined;
	}

	const trimmedValue = value.trim();
	if (!trimmedValue) {
		return undefined;
	}

	if (/^https?:\/\//i.test(trimmedValue)) {
		return trimmedValue;
	}

	if (trimmedValue.startsWith('www.')) {
		return `https://${trimmedValue}`;
	}

	return undefined;
};

const decodeIcalText = (value = '') =>
	value
		.replace(/\\([nN,;\\])/g, (_match, escapedCharacter) => {
			switch (escapedCharacter) {
				case 'n':
				case 'N':
					return '\n';
				case ',':
					return ',';
				case ';':
					return ';';
				case '\\':
					return '\\';
				default:
					return escapedCharacter;
			}
		})
		.trim();

const unfoldIcalLines = (icalText) => {
	const lines = [];
	const rawLines = icalText.replace(/\r\n/g, '\n').split('\n');

	for (const rawLine of rawLines) {
		if ((rawLine.startsWith(' ') || rawLine.startsWith('\t')) && lines.length > 0) {
			lines[lines.length - 1] += rawLine.slice(1);
			continue;
		}

		lines.push(rawLine.trimEnd());
	}

	return lines;
};

const parseProperty = (line) => {
	const separatorIndex = line.indexOf(':');
	if (separatorIndex === -1) {
		return null;
	}

	const descriptor = line.slice(0, separatorIndex);
	const rawValue = line.slice(separatorIndex + 1);
	const [propertyName, ...rawParams] = descriptor.split(';');
	const params = {};

	for (const rawParam of rawParams) {
		const [paramName, ...paramValueParts] = rawParam.split('=');
		if (!paramName) {
			continue;
		}

		params[paramName.toUpperCase()] = paramValueParts.join('=');
	}

	return {
		name: propertyName.toUpperCase(),
		params,
		rawValue,
		value: decodeIcalText(rawValue)
	};
};

const parseIcalDateTime = (property) => {
	if (!property) {
		return null;
	}

	const rawValue = property.rawValue.trim();
	const isDateOnly = property.params.VALUE === 'DATE' || /^\d{8}$/.test(rawValue);

	const dateMatch = rawValue.match(/^(\d{4})(\d{2})(\d{2})$/);
	if (dateMatch) {
		const [, year, month, day] = dateMatch;
		return {
			value: `${year}-${month}-${day}`,
			allDay: true
		};
	}

	const utcMatch = rawValue.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
	if (utcMatch) {
		const [, year, month, day, hour, minute, second] = utcMatch;
		return {
			value: `${year}-${month}-${day}T${hour}:${minute}:${second}Z`,
			allDay: false
		};
	}

	const localMatch = rawValue.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
	if (localMatch) {
		const [, year, month, day, hour, minute, second] = localMatch;
		return {
			value: `${year}-${month}-${day}T${hour}:${minute}:${second}`,
			allDay: false
		};
	}

	return {
		value: null,
		allDay: isDateOnly
	};
};

const addDaysToDateString = (dateValue, daysToAdd) => {
	const [year, month, day] = dateValue.split('-').map(Number);
	if (!year || !month || !day) {
		return dateValue;
	}

	const date = new Date(Date.UTC(year, month - 1, day));
	date.setUTCDate(date.getUTCDate() + daysToAdd);

	const outputYear = date.getUTCFullYear();
	const outputMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
	const outputDay = String(date.getUTCDate()).padStart(2, '0');
	return `${outputYear}-${outputMonth}-${outputDay}`;
};

const parseIcalEvents = (icalText) => {
	const lines = unfoldIcalLines(icalText);
	const events = [];
	let currentEvent = null;

	for (const line of lines) {
		if (line === 'BEGIN:VEVENT') {
			currentEvent = {};
			continue;
		}

		if (line === 'END:VEVENT') {
			if (currentEvent) {
				events.push(currentEvent);
			}
			currentEvent = null;
			continue;
		}

		if (!currentEvent) {
			continue;
		}

		const property = parseProperty(line);
		if (!property) {
			continue;
		}

		if (!currentEvent[property.name]) {
			currentEvent[property.name] = property;
		}
	}

	return events;
};

const mapEvent = (event, index) => {
	const startInfo = parseIcalDateTime(event.DTSTART);
	if (!startInfo?.value) {
		return null;
	}

	const endInfo = parseIcalDateTime(event.DTEND);
	const allDay = startInfo.allDay;
	const start = startInfo.value;
	let end = endInfo?.value || undefined;

	if (allDay && !end) {
		end = addDaysToDateString(start, 1);
	}

	return {
		id: event.UID?.value || `${index}-${start}-${event.SUMMARY?.value || 'jam'}`,
		title: event.SUMMARY?.value?.trim() || 'Jam',
		start,
		end,
		allDay,
		url: normalizeUrl(event.URL?.value),
		extendedProps: {
			description: event.DESCRIPTION?.value || '',
			location: event.LOCATION?.value || ''
		}
	};
};

const toDate = (value) => {
	if (!value) {
		return null;
	}

	const parsedDate = new Date(value);
	if (Number.isNaN(parsedDate.valueOf())) {
		return null;
	}

	return parsedDate;
};

const loadAmericanEvents = async () => {
	if (cachedEvents && Date.now() < cacheExpiresAt) {
		return cachedEvents;
	}

	if (pendingRequest) {
		return pendingRequest;
	}

	pendingRequest = (async () => {
		const response = await fetch(AMERICAN_JAM_FEED_URL, {
			headers: {
				accept: 'text/calendar,text/plain;q=0.9,*/*;q=0.8'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to load American jams feed (${response.status})`);
		}

		const icalText = await response.text();
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const events = parseIcalEvents(icalText)
			.map(mapEvent)
			.filter((event) => event !== null)
			.filter((event) => {
				const startDate = toDate(event.start);
				if (!startDate) {
					return false;
				}

				const endDate = toDate(event.end) || startDate;
				return endDate >= today;
			})
			.sort((a, b) => new Date(a.start).valueOf() - new Date(b.start).valueOf());

		cachedEvents = events;
		cacheExpiresAt = Date.now() + CACHE_TTL_MS;
		return events;
	})();

	try {
		return await pendingRequest;
	} finally {
		pendingRequest = null;
	}
};

export const prerender = false;

export const GET = async () => {
	try {
		const events = await loadAmericanEvents();
		return json(
			{ events },
			{
				headers: {
					'cache-control': 'public, max-age=900'
				}
			}
		);
	} catch (error) {
		console.error('Failed to load American jams feed', error);
		return json({ events: [] }, { status: 500 });
	}
};
