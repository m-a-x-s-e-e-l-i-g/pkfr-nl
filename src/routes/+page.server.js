import { loadJams } from '$lib/server/jamEvents';
import { loadOpenGyms } from '$lib/server/openGymEvents';

export const prerender = false;

export async function load() {
    const [jams, gyms] = await Promise.all([
        loadJams()
            .then((events) => ({ events: events.slice(0, 1), calendarUnavailable: false }))
            .catch(() => ({ events: [], calendarUnavailable: true })),
        loadOpenGyms()
            .then((openGymDays) => ({ openGymDays, openGymUnavailable: false }))
            .catch(() => ({ openGymDays: [], openGymUnavailable: true }))
    ]);
    return { ...jams, ...gyms };
}
