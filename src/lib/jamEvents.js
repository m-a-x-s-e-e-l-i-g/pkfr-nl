export const JAM_TIME_ZONE = 'Europe/Amsterdam';

export function jamPath(event) {
    const title =
        event.title
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'event';
    return `/jams/${title}--${event.id}`;
}

export function eventIdFromSlug(slug) {
    const id = slug.slice(slug.lastIndexOf('--') + 2);
    return slug.includes('--') && /^[a-zA-Z0-9_]+$/.test(id) ? id : null;
}

export function jamDate(event, language = 'nl', options = {}, value = event.start) {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'nl-NL', {
        timeZone: event.allDay ? 'UTC' : event.timeZone || JAM_TIME_ZONE,
        ...options
    }).format(new Date(value));
}

export function lastEventDate(event) {
    if (!event.end) return event.start;
    // The end is exclusive, including timed events ending exactly at midnight.
    return event.allDay
        ? new Date(new Date(event.end).valueOf() - 86400000).toISOString().slice(0, 10)
        : new Date(new Date(event.end).valueOf() - 1).toISOString();
}

export function jamDateRange(event, language = 'nl') {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const start = jamDate(event, language, options);
    const end = jamDate(event, language, options, lastEventDate(event));
    return start === end ? start : `${start} – ${end}`;
}

export function jamTime(event, language = 'nl') {
    if (event.allDay) return '';
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const start = jamDate(event, language, options);
    if (!event.end) return start;
    const end = jamDate(event, language, options, event.end);
    return `${start} – ${end}`;
}

export function jamMonthKey(event) {
    return jamDate(event, 'en', { year: 'numeric', month: '2-digit' });
}

export function mapsUrl(location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

export function googleEventUrl(event) {
    const compact = (value) =>
        event.allDay
            ? value.replaceAll('-', '')
            : new Date(value)
                  .toISOString()
                  .replace(/[-:]/g, '')
                  .replace(/\.\d{3}Z$/, 'Z');
    const end =
        event.end ||
        (event.allDay
            ? new Date(new Date(event.start).valueOf() + 86400000).toISOString().slice(0, 10)
            : new Date(new Date(event.start).valueOf() + 3600000).toISOString());
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${compact(event.start)}/${compact(end)}`,
        details: `${event.descriptionText}\n\nhttps://www.pkfr.nl${jamPath(event)}`.trim(),
        location: event.location,
        ctz: JAM_TIME_ZONE
    });
    return `https://calendar.google.com/calendar/render?${params}`;
}
