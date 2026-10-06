import { error } from '@sveltejs/kit';
import { eventIdFromSlug } from '$lib/jamEvents';
import { loadInternationalJam } from '$lib/server/internationalJams';

export const prerender = false;

export async function load({ params, fetch, setHeaders }) {
    const id = eventIdFromSlug(params.slug, 'america');
    if (!id) error(404, 'Event not found');
    const event = await loadInternationalJam('america', id, fetch);
    setHeaders({ 'x-pkfr-event-archive': event.archiveStored ? 'stored' : 'not-stored' });
    return { event, now: Date.now() };
}
