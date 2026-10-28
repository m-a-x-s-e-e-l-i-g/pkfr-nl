import { loadJamAgenda } from '$lib/server/jamEvents';

export const prerender = false;

export async function load() {
    try {
        const { events, retrievedAt } = await loadJamAgenda();
        return { events, calendarFetchedAt: retrievedAt, calendarUnavailable: false };
    } catch {
        return { events: [], calendarFetchedAt: null, calendarUnavailable: true };
    }
}
