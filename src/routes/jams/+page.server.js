import { loadJams } from '$lib/server/jamEvents';

export const prerender = false;

export async function load() {
    try {
        return { events: await loadJams(), calendarUnavailable: false };
    } catch {
        return { events: [], calendarUnavailable: true };
    }
}
