import { loadInternationalJams } from '$lib/server/internationalJams';

export const prerender = false;

export async function load({ fetch }) {
    try {
        return { events: await loadInternationalJams('europe', fetch), calendarUnavailable: false };
    } catch {
        return { events: [], calendarUnavailable: true };
    }
}
