import { error } from '@sveltejs/kit';
import { eventIdFromSlug } from '$lib/jamEvents';
import { loadJam } from '$lib/server/jamEvents';

export const prerender = false;

export async function load({ params }) {
    const id = eventIdFromSlug(params.slug);
    if (!id) error(404, 'Event not found');
    return { event: await loadJam(id) };
}
