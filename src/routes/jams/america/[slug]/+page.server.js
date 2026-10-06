import { error } from '@sveltejs/kit';
import { eventIdFromSlug } from '$lib/jamEvents';
import { loadInternationalJam } from '$lib/server/internationalJams';

export const prerender = false;

export async function load({ params, fetch }) {
    const id = eventIdFromSlug(params.slug, 'america');
    if (!id) error(404, 'Event not found');
    return { event: await loadInternationalJam('america', id, fetch) };
}
