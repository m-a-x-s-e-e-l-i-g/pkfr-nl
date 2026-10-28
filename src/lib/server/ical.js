const CRLF = '\r\n';
const textEncoder = new TextEncoder();

const decodeHtmlEntities = (value) =>
    value
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&#(\d+);/g, (_match, codePoint) => String.fromCodePoint(Number(codePoint)))
        .replace(/&#x([0-9a-f]+);/gi, (_match, codePoint) =>
            String.fromCodePoint(Number.parseInt(codePoint, 16))
        );

const stripHtml = (value = '') =>
    decodeHtmlEntities(
        value
            .replace(/<br\s*\/?\s*>/gi, '\n')
            .replace(/<\/p\s*>/gi, '\n')
            .replace(/<[^>]+>/g, ' ')
    )
        .replace(/[ \t]+/g, ' ')
        .replace(/ *\n */g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

const escapeIcalText = (value = '') =>
    String(value)
        .replace(/\\/g, '\\\\')
        .replace(/\r?\n/g, '\\n')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,');

const foldIcalLine = (line) => {
    const foldedLines = [];
    let currentLine = '';

    for (const character of line) {
        const candidate = `${currentLine}${character}`;
        if (currentLine && textEncoder.encode(candidate).length > 75) {
            foldedLines.push(currentLine);
            currentLine = ` ${character}`;
        } else {
            currentLine = candidate;
        }
    }

    foldedLines.push(currentLine);
    return foldedLines.join(CRLF);
};

const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const formatUtcDateTime = (date) => {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${formatDate(date)}T${hours}${minutes}${seconds}Z`;
};

const formatDateOnly = (value) => value.replaceAll('-', '');

const addDays = (value, days) => {
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + days);
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
        date.getUTCDate()
    ).padStart(2, '0')}`;
};

const isAllDayEvent = (value) => value === true || value === 1 || value === '1';

const isDateOnly = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || '');

const isValidTimeZone = (value) => {
    if (!value) {
        return false;
    }

    try {
        new Intl.DateTimeFormat('en', { timeZone: value }).format();
        return true;
    } catch {
        return false;
    }
};

const formatDateTimeProperty = (propertyName, value, timeZone) => {
    const normalizedValue = value?.trim();
    if (!normalizedValue) {
        return null;
    }

    if (/Z$|[+-]\d{2}:?\d{2}$/.test(normalizedValue)) {
        const date = new Date(normalizedValue);
        return Number.isNaN(date.valueOf()) ? null : `${propertyName}:${formatUtcDateTime(date)}`;
    }

    const localDateTime = normalizedValue.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/
    );
    if (!localDateTime) {
        return null;
    }

    const [, year, month, day, hour, minute, second = '00'] = localDateTime;
    const tzid = isValidTimeZone(timeZone) ? timeZone : 'Europe/Amsterdam';
    return `${propertyName};TZID=${tzid}:${year}${month}${day}T${hour}${minute}${second}`;
};

const normalizeUrl = (value) => {
    if (typeof value !== 'string') {
        return null;
    }

    const trimmedValue = value.trim();
    if (/^https?:\/\//i.test(trimmedValue)) {
        return trimmedValue;
    }

    if (trimmedValue.startsWith('www.')) {
        return `https://${trimmedValue}`;
    }

    return null;
};

const getEventUrl = (event) => {
    const eventLink =
        typeof event.link === 'string'
            ? event.link
            : event.link && typeof event.link === 'object'
              ? event.link.url
              : null;
    const directUrl = normalizeUrl(eventLink);
    if (directUrl) {
        return directUrl;
    }

    const organizerUrl = normalizeUrl(event.organizer?.website);
    if (organizerUrl) {
        return organizerUrl;
    }

    const venueUrl = normalizeUrl(event.venue?.website);
    if (venueUrl) {
        return venueUrl;
    }

    const latitudeValue = event.venue?.lat;
    const longitudeValue = event.venue?.lng ?? event.venue?.long;
    if (latitudeValue === null || latitudeValue === undefined || latitudeValue === '') {
        return null;
    }
    if (longitudeValue === null || longitudeValue === undefined || longitudeValue === '') {
        return null;
    }

    const latitude = Number(latitudeValue);
    const longitude = Number(longitudeValue);
    return Number.isFinite(latitude) && Number.isFinite(longitude)
        ? `https://maps.google.com/?q=${latitude},${longitude}`
        : null;
};

const createEventLines = (event, timestamp) => {
    const start = event.start?.trim();
    if (!start) {
        return [];
    }

    const allDay = isAllDayEvent(event.all_day) || isDateOnly(start);
    const title = event.title?.trim() || 'Jam';
    const uid = `${event.id ?? `${start}-${title}`}@matttma.pkfr.nl`;
    const lines = [
        'BEGIN:VEVENT',
        `UID:${escapeIcalText(uid)}`,
        `DTSTAMP:${timestamp}`,
        `SUMMARY:${escapeIcalText(title)}`
    ];

    if (allDay) {
        const startDate = start.slice(0, 10);
        const inclusiveEndDate = (event.end?.trim() || startDate).slice(0, 10);
        lines.push(`DTSTART;VALUE=DATE:${formatDateOnly(startDate)}`);
        lines.push(`DTEND;VALUE=DATE:${formatDateOnly(addDays(inclusiveEndDate, 1))}`);
    } else {
        const startLine = formatDateTimeProperty('DTSTART', start, event.time_zone);
        const endLine = formatDateTimeProperty('DTEND', event.end, event.time_zone);
        if (!startLine) {
            return [];
        }

        lines.push(startLine);
        if (endLine) {
            lines.push(endLine);
        }
    }

    const description = stripHtml(event.desc);
    const location = event.venue?.address?.trim() || event.venue?.name?.trim();
    const eventUrl = getEventUrl(event);
    const categories = Array.isArray(event.categories)
        ? event.categories
              .map((category) => category?.name?.trim())
              .filter(Boolean)
              .join(',')
        : '';

    if (description) {
        lines.push(`DESCRIPTION:${escapeIcalText(description)}`);
    }
    if (location) {
        lines.push(`LOCATION:${escapeIcalText(location)}`);
    }
    if (eventUrl) {
        lines.push(`URL:${eventUrl}`);
    }
    if (categories) {
        lines.push(`CATEGORIES:${escapeIcalText(categories)}`);
    }

    lines.push('STATUS:CONFIRMED', 'TRANSP:TRANSPARENT', 'END:VEVENT');
    return lines;
};

export const createEuropeJamCalendar = (events, now = new Date()) => {
    const timestamp = formatUtcDateTime(now);
    const today = now.toISOString().slice(0, 10);
    const upcomingEvents = Array.isArray(events)
        ? events
              .filter((event) => event?.start)
              .filter((event) => (event.end || event.start).slice(0, 10) >= today)
              .sort((a, b) => a.start.localeCompare(b.start))
        : [];

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//pkfr.nl//MATTTMA European Jam Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:MATTTMA European Parkour Jams',
        'X-WR-CALDESC:European parkour jams maintained by MATTTMA and shared by pkfr.nl',
        'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
        'X-PUBLISHED-TTL:PT1H',
        ...upcomingEvents.flatMap((event) => createEventLines(event, timestamp)),
        'END:VCALENDAR'
    ];

    return `${lines.map(foldIcalLine).join(CRLF)}${CRLF}`;
};
