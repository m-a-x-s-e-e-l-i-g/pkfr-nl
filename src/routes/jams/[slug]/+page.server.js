import { error } from '@sveltejs/kit';
import { eventIdFromSlug } from '$lib/jamEvents';
import { loadJam } from '$lib/server/jamEvents';

export const prerender = false;

export async function load({ params, setHeaders }) {
    const id = eventIdFromSlug(params.slug);
    if (!id) error(404, 'Event not found');
    const event = await loadJam(id);
    setHeaders({ 'x-pkfr-event-archive': event.archiveStored ? 'stored' : 'not-stored' });
    return { event, now: Date.now() };
}
