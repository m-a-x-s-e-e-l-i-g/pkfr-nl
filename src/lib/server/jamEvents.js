import { error } from '@sveltejs/kit';
import { normalizeJam } from './normalizeJam.js';
import { JAM_TIME_ZONE, isPastJam } from '$lib/jamEvents';
import { archivedJam, preserveJam, preserveJamHistory } from './jamArchive.js';

const CACHE_TTL = 5 * 60 * 1000;
let cachedList;
let pendingList;
let cachedHistory;
let pendingHistory;

async function requestEvents(path = '', params = {}) {
    const key = import.meta.env.VITE_GOOGLE_API_KEY;
    const calendar = import.meta.env.VITE_JAM_CALENDAR_ID;
    if (!key || !calendar) error(503, 'Jam calendar is not configured');
    const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar)}/events${path}`
    );
    url.search = new URLSearchParams({ key, timeZone: JAM_TIME_ZONE, ...params }).toString();
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (response.status === 404 || response.status === 410) error(404, 'Event not found');
    if (!response.ok) error(503, 'Jam calendar is temporarily unavailable');
    return response.json();
}

export async function loadJams() {
    if (cachedList && cachedList.expires > Date.now()) return cachedList.events;
    if (pendingList) return pendingList;
    pendingList = (async () => {
        const events = [];
        const now = new Date();
        // A finite horizon is needed when Google expands indefinitely recurring events.
        const horizon = new Date(now);
        horizon.setUTCFullYear(horizon.getUTCFullYear() + 5);
        const params = {
            singleEvents: 'true',
            orderBy: 'startTime',
            maxResults: '2500',
            timeMin: now.toISOString(),
            timeMax: horizon.toISOString()
        };
        let pageToken;
        do {
            const data = await requestEvents('', {
                ...params,
                ...(pageToken ? { pageToken } : {})
            });
            events.push(...(data.items || []).map(normalizeJam).filter(Boolean));
            pageToken = data.nextPageToken;
        } while (pageToken);
        const retrievedAt = new Date().toISOString();
        const preserved = await Promise.all(events.map(preserveJam));
        cachedList = { events: preserved, retrievedAt, expires: Date.now() + CACHE_TTL };
        return preserved;
    })();
    try {
        return await pendingList;
    } finally {
        pendingList = null;
    }
}

// HTML and public data representations share one source snapshot and retrieval time.
export async function loadJamAgenda() {
    const events = await loadJams();
    return { events, retrievedAt: cachedList.retrievedAt };
}

export async function loadPastDutchJams() {
    if (cachedHistory && cachedHistory.expires > Date.now()) return cachedHistory.events;
    if (pendingHistory) return pendingHistory;
    pendingHistory = (async () => {
        const now = new Date();
        const events = [];
        let pageToken;
        do {
            const data = await requestEvents('', {
                singleEvents: 'true',
                orderBy: 'startTime',
                maxResults: '2500',
                // No lower cutoff: retrieve all available history, including recurrence instances.
                timeMax: now.toISOString(),
                ...(pageToken ? { pageToken } : {})
            });
            events.push(
                ...(data.items || [])
                    .map(normalizeJam)
                    .filter((event) => event && isPastJam(event, now))
            );
            pageToken = data.nextPageToken;
        } while (pageToken);
        const preserved = await preserveJamHistory('dutch', events);
        cachedHistory = { events: preserved, expires: Date.now() + CACHE_TTL };
        return preserved;
    })();
    try {
        return await pendingHistory;
    } finally {
        pendingHistory = null;
    }
}

export async function loadJam(id) {
    if (cachedList && cachedList.expires > Date.now()) {
        const cachedEvent = cachedList.events.find((event) => event.id === id);
        if (cachedEvent) return cachedEvent;
    }
    let item;
    try {
        item = await requestEvents(`/${encodeURIComponent(id)}`);
    } catch (err) {
        const archived = await archivedJam('dutch', id);
        if (archived && isPastJam(archived)) return archived;
        throw err;
    }
    const event = normalizeJam(item);
    if (!event) error(404, 'Event not found');
    return preserveJam(event);
}
