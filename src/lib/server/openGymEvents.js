import { error } from '@sveltejs/kit';
import { JAM_TIME_ZONE } from '$lib/jamEvents';
import { openGymDays, groupOpenGyms } from '$lib/openGymSchedule';

let cached;
let pending;
const CACHE_TTL = 5 * 60 * 1000;

export async function loadOpenGyms(now = new Date()) {
    const days = openGymDays(now);
    const key = days[0].date;
    if (cached?.key === key && cached.expires > Date.now()) return cached.days;
    if (pending?.key === key) return pending.promise;
    const promise = (async () => {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const calendar = import.meta.env.VITE_OPEN_GYM_CALENDAR_ID;
        if (!apiKey || !calendar) error(503, 'Open gym calendar is not configured');
        const items = [];
        let pageToken;
        do {
            const url = new URL(
                `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar)}/events`
            );
            url.search = new URLSearchParams({
                key: apiKey,
                timeZone: JAM_TIME_ZONE,
                singleEvents: 'true',
                orderBy: 'startTime',
                timeMin: days[0].start,
                timeMax: days[1].end,
                maxResults: '2500',
                ...(pageToken ? { pageToken } : {})
            }).toString();
            const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
            if (!response.ok) error(503, 'Open gym calendar is temporarily unavailable');
            const data = await response.json();
            items.push(...(data.items || []));
            pageToken = data.nextPageToken;
        } while (pageToken);
        const schedule = groupOpenGyms(items, days);
        cached = { key, days: schedule, expires: Date.now() + CACHE_TTL };
        return schedule;
    })();
    pending = { key, promise };
    try {
        return await promise;
    } finally {
        if (pending?.promise === promise) pending = null;
    }
}
