import { EUROPE_JAM_FEED_URL } from '../calendarFeeds.js';
import { JAM_TIME_ZONE, lastEventDate, isPastJam } from '../jamEvents.js';
import { normalizeJam } from './normalizeJam.js';
import { error } from '@sveltejs/kit';
import { archivedJam, preserveJam, preserveJamHistory } from './jamArchive.js';

const EUROPE_SOURCE = 'https://www.matttma.de/en/parkourjamcalendar';
const AMERICA_SOURCE = 'https://americanparkour.com/community-events/';
let cachedEurope;
let pendingEurope;

function safeUrl(value) {
    if (typeof value !== 'string') return null;
    const url = value.trim().replace(/^www\./, 'https://www.');
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null;
    } catch {
        return null;
    }
}

function europeUrl(item) {
    const link = typeof item.link === 'string' ? item.link : item.link?.url;
    const website =
        safeUrl(link) || safeUrl(item.organizer?.website) || safeUrl(item.venue?.website);
    if (website) return website;
    const lat = item.venue?.lat;
    const lng = item.venue?.lng || item.venue?.long;
    if (
        lat !== '' &&
        lat != null &&
        lng !== '' &&
        lng != null &&
        Number.isFinite(Number(lat)) &&
        Number.isFinite(Number(lng))
    ) {
        return `https://maps.google.com/?q=${Number(lat)},${Number(lng)}`;
    }
    return EUROPE_SOURCE;
}

export function normalizeInternationalJam(item, region) {
    if (!item || typeof item.start !== 'string') return null;
    const start = item.start.trim();
    if (!start || Number.isNaN(Date.parse(start))) return null;
    const allDay =
        region === 'europe'
            ? [true, 1, '1'].includes(item.all_day) || /^\d{4}-\d{2}-\d{2}$/.test(start)
            : Boolean(item.allDay);
    let end = typeof item.end === 'string' ? item.end.trim() : null;
    // MATTTMA ends are inclusive; the American iCal feed already uses exclusive ends.
    if (region === 'europe' && allDay) {
        const inclusiveEnd = Date.parse(end || start);
        end = new Date(
            Math.max(
                Date.parse(start),
                Number.isNaN(inclusiveEnd) ? Date.parse(start) : inclusiveEnd
            ) + 86400000
        )
            .toISOString()
            .slice(0, 10);
    }
    const event = normalizeJam({
        id: String(item.id ?? `${start}-${item.title || 'jam'}`),
        summary: item.title,
        start: allDay ? { date: start.slice(0, 10) } : { dateTime: start },
        end: allDay ? { date: end?.slice(0, 10) } : { dateTime: end },
        description: region === 'europe' ? item.desc : item.extendedProps?.description,
        location:
            region === 'europe'
                ? item.venue?.address || item.venue?.name
                : item.extendedProps?.location
    });
    if (!event) return null;
    // Floating source times retain their wall-clock time regardless of the server timezone.
    if (!allDay && !/Z$|[+-]\d{2}:?\d{2}$/.test(start)) {
        event.start += 'Z';
        if (event.end && !/Z$|[+-]\d{2}:?\d{2}$/.test(event.end)) event.end += 'Z';
        event.timeZone = 'UTC';
        const sourceTimeZone = region === 'europe' ? item.time_zone : item.timeZone;
        if (sourceTimeZone) {
            try {
                new Intl.DateTimeFormat('en', { timeZone: sourceTimeZone }).format();
                event.sourceTimeZone = sourceTimeZone;
            } catch {
                /* Unknown source timezone: show the original time without guessing. */
            }
        }
    }
    event.region = region;
    event.url = region === 'europe' ? europeUrl(item) : safeUrl(item.url) || AMERICA_SOURCE;
    return event;
}

export function upcomingInternationalJams(items, region, now = new Date()) {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: JAM_TIME_ZONE }).format(now);
    return (Array.isArray(items) ? items : [])
        .map((item) => normalizeInternationalJam(item, region))
        .filter((event) => event && lastEventDate(event).slice(0, 10) >= today)
        .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}

async function loadInternationalItems(region, fetch, includePast = false) {
    let items;
    if (region === 'europe') {
        if (!cachedEurope || cachedEurope.expires <= Date.now()) {
            pendingEurope ||= (async () => {
                const response = await fetch(EUROPE_JAM_FEED_URL, {
                    signal: AbortSignal.timeout(10000)
                });
                if (!response.ok) throw new Error('European calendar unavailable');
                const data = await response.json();
                if (!Array.isArray(data.events)) throw new Error('Invalid European calendar');
                cachedEurope = { items: data.events, expires: Date.now() + 300000 };
            })();
            try {
                await pendingEurope;
            } finally {
                pendingEurope = null;
            }
        }
        items = cachedEurope.items;
    } else {
        const response = await fetch(
            `/api/jams/american${includePast ? '?includePast=true' : ''}`,
            {
                signal: AbortSignal.timeout(includePast ? 50000 : 15000)
            }
        );
        if (!response.ok) throw new Error('American calendar unavailable');
        const data = await response.json();
        if (!Array.isArray(data.events)) throw new Error('Invalid American calendar');
        items = data.events;
    }
    return items;
}

export async function loadInternationalJams(region, fetch) {
    const events = upcomingInternationalJams(await loadInternationalItems(region, fetch), region);
    return Promise.all(events.map(preserveJam));
}

export async function loadInternationalJam(region, id, fetch) {
    let items;
    try {
        items = await loadInternationalItems(region, fetch, true);
    } catch {
        const archived = await archivedJam(region, id);
        if (archived && isPastJam(archived)) return archived;
        error(503, 'Jam calendar is temporarily unavailable');
    }
    const event = items
        .map((item) => normalizeInternationalJam(item, region))
        .find((event) => event?.id === id);
    if (!event) {
        const archived = await archivedJam(region, id);
        if (archived && isPastJam(archived)) return archived;
        error(404, 'Event not found');
    }
    return preserveJam(event);
}

const cachedHistory = new Map();
const pendingHistory = new Map();
export async function loadPastInternationalJams(region, fetch) {
    const cached = cachedHistory.get(region);
    if (cached && cached.expires > Date.now()) return cached.events;
    if (pendingHistory.has(region)) return pendingHistory.get(region);
    const request = (async () => {
        const events = (await loadInternationalItems(region, fetch, true))
            .map((item) => normalizeInternationalJam(item, region))
            .filter((event) => event && isPastJam(event));
        const preserved = await preserveJamHistory(region, events);
        cachedHistory.set(region, { events: preserved, expires: Date.now() + 300000 });
        return preserved;
    })();
    pendingHistory.set(region, request);
    try {
        return await request;
    } finally {
        pendingHistory.delete(region);
    }
}
