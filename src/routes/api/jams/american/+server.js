import { json } from '@sveltejs/kit';
import { AMERICAN_JAM_FEED_URL } from '$lib/calendarFeeds';
const CACHE_TTL_MS = 30 * 60 * 1000;

const cachedLists = new Map();
const pendingRequests = new Map();

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
	if (event.STATUS?.value?.toUpperCase() === 'CANCELLED') return null;
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
		timeZone: event.DTSTART?.params.TZID?.replace(/^"|"$/g, ''),
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

async function requestIcal(url, signal) {
	const response = await fetch(url, {
		signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
		headers: { accept: 'text/calendar,text/plain;q=0.9,*/*;q=0.8' }
	});
	if (!response.ok) throw new Error(`Failed to load American jams feed (${response.status})`);
	const text = await response.text();
	if (!text.trimStart().startsWith('BEGIN:VCALENDAR') || !text.includes('END:VCALENDAR'))
		throw new Error('Invalid American calendar response');
	return parseIcalEvents(text);
}

const loadAmericanEvents = async (includePast = false) => {
	const key = includePast ? 'history' : 'upcoming';
	const cached = cachedLists.get(key);
	if (cached && Date.now() < cached.expires) return cached.events;
	if (pendingRequests.has(key)) return pendingRequests.get(key);
	const request = (async () => {
		const events = new Map();
		if (includePast) {
			for (const event of await loadAmericanEvents()) events.set(event.id, event);
			const signal = AbortSignal.timeout(45000);
			const seen = new Set();
			let pageSize;
			for (let page = 1; ; page++) {
				if (page > 500) throw new Error('American calendar pagination limit exceeded');
				const url = new URL(AMERICAN_JAM_FEED_URL);
				url.searchParams.set('eventDisplay', 'past');
				url.searchParams.set('paged', String(page));
				const items = await requestIcal(url, signal);
				pageSize ??= items.length;
				let added = 0;
				for (const [index, item] of items.entries()) {
					const sourceId =
						item.UID?.value || `${item.DTSTART?.value}:${item.SUMMARY?.value}`;
					if (!seen.has(sourceId)) {
						seen.add(sourceId);
						added++;
					}
					const event = mapEvent(item, index);
					if (event) events.set(event.id, event);
				}
				// The export contains overlapping windows larger than the site's list pages.
				if (!items.length || items.length < pageSize) break;
				if (!added) throw new Error('American calendar repeated a history page');
			}
		} else {
			for (const [index, item] of (
				await requestIcal(AMERICAN_JAM_FEED_URL, AbortSignal.timeout(15000))
			).entries()) {
				const event = mapEvent(item, index);
				if (event && toDate(event.start)) events.set(event.id, event);
			}
		}
		const list = [...events.values()]
			.filter((event) => toDate(event.start))
			.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
		cachedLists.set(key, { events: list, expires: Date.now() + CACHE_TTL_MS });
		return list;
	})();
	pendingRequests.set(key, request);
	try {
		return await request;
	} finally {
		pendingRequests.delete(key);
	}
};

export const prerender = false;

export const GET = async ({ url }) => {
	try {
		const allEvents = await loadAmericanEvents(url.searchParams.get('includePast') === 'true');
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const events =
			url.searchParams.get('includePast') === 'true'
				? allEvents
				: allEvents.filter((event) => (toDate(event.end) || toDate(event.start)) >= today);
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
		return json({ events: [] }, { status: 503, headers: { 'cache-control': 'no-store' } });
	}
};
