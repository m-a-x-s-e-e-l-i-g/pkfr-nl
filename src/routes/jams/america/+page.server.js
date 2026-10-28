import { loadInternationalJams } from '$lib/server/internationalJams';

export const prerender = false;

export async function load({ fetch }) {
    try {
        return {
            events: await loadInternationalJams('america', fetch),
            calendarUnavailable: false
        };
    } catch {
        return { events: [], calendarUnavailable: true };
    }
}
