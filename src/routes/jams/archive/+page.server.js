import { error } from '@sveltejs/kit';
import { archivedJams } from '$lib/server/jamArchive';
import { isPastJam } from '$lib/jamEvents';

export const prerender = false;
const PAGE_SIZE = 30;

export async function load({ url }) {
    const region = url.searchParams.get('region') || 'all';
    const rawPage = url.searchParams.get('page') || '1';
    if (
        !['all', 'dutch', 'europe', 'america'].includes(region) ||
        !/^[1-9]\d*$/.test(rawPage) ||
        Number(rawPage) > 10000
    )
        error(400, 'Invalid archive filter');
    const archivePage = Number(rawPage);
    let captured;
    try {
        captured = await archivedJams();
    } catch {
        return { events: [], archiveUnavailable: true, region, archivePage, pages: 1 };
    }
    const events = captured
        .filter(
            (event) =>
                isPastJam(event) && (region === 'all' || (event.region || 'dutch') === region)
        )
        .sort((a, b) => Date.parse(b.start) - Date.parse(a.start));
    const pages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
    if (archivePage > pages) error(404, 'Archive page not found');
    return {
        events: events.slice((archivePage - 1) * PAGE_SIZE, archivePage * PAGE_SIZE),
        archiveUnavailable: false,
        region,
        archivePage,
        pages
    };
}
