import { error } from '@sveltejs/kit';
import { normalizeJam } from './normalizeJam.js';
import { JAM_TIME_ZONE } from '$lib/jamEvents';

const CACHE_TTL = 5 * 60 * 1000;
let cachedList;
let pendingList;

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
        cachedList = { events, expires: Date.now() + CACHE_TTL };
        return events;
    })();
    try {
        return await pendingList;
    } finally {
        pendingList = null;
    }
}

export async function loadJam(id) {
    if (cachedList && cachedList.expires > Date.now()) {
        const cachedEvent = cachedList.events.find((event) => event.id === id);
        if (cachedEvent) return cachedEvent;
    }
    const event = normalizeJam(await requestEvents(`/${encodeURIComponent(id)}`));
    if (!event) error(404, 'Event not found');
    return event;
}
