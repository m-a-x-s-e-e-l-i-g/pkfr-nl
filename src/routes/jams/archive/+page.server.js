import { error } from '@sveltejs/kit';
import { loadJamHistory } from '$lib/server/jamHistory';

export const prerender = false;
const PAGE_SIZE = 30;

export async function load({ url, fetch }) {
    const region = url.searchParams.get('region') || 'all';
    const rawPage = url.searchParams.get('page') || '1';
    if (
        !['all', 'dutch', 'europe', 'america'].includes(region) ||
        !/^[1-9]\d*$/.test(rawPage) ||
        Number(rawPage) > 10000
    )
        error(400, 'Invalid archive filter');
    const archivePage = Number(rawPage);
    const { events, unavailableSources } = await loadJamHistory(fetch, region);
    const pages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
    // A temporary source failure can shrink the list; don't turn an existing page into a 404.
    if (archivePage > pages && !unavailableSources.length) error(404, 'Archive page not found');
    return {
        events: events.slice((archivePage - 1) * PAGE_SIZE, archivePage * PAGE_SIZE),
        archiveUnavailable: unavailableSources.length > 0 && events.length === 0,
        historyIncomplete: unavailableSources.length > 0,
        total: events.length,
        region,
        archivePage,
        pages: unavailableSources.length ? Math.max(pages, archivePage) : pages
    };
}
