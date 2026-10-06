import { loadJams } from '$lib/server/jamEvents';

export const prerender = false;

export async function load() {
    try {
        const events = await loadJams();
        return { events: events.slice(0, 1), calendarUnavailable: false };
    } catch {
        return { events: [], calendarUnavailable: true };
    }
}
