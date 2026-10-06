import { error } from '@sveltejs/kit';
import { getGym, gymSessions, nearbyGyms } from '$lib/gymDetails';
import { loadOpenGyms } from '$lib/server/openGymEvents';

export const prerender = false;

export async function load({ params }) {
    const gym = getGym(params.slug);
    if (!gym) error(404, 'Gym not found');
    const now = new Date();
    let sessions = [];
    let openGymUnavailable = false;
    try {
        sessions = gymSessions(gym, await loadOpenGyms(now, 7), now.getTime());
    } catch {
        openGymUnavailable = true;
    }
    return {
        gym,
        nearbyGyms: nearbyGyms(gym),
        sessions,
        openGymUnavailable,
        now: now.toISOString()
    };
}
