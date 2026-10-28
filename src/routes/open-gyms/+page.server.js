import { error } from '@sveltejs/kit';
import { loadOpenGyms } from '$lib/server/openGymEvents';
import { openGymDays } from '$lib/openGymSchedule';

export const prerender = false;

export async function load({ url }) {
    const rawWeek = url.searchParams.get('week') || '0';
    if (!/^-?\d+$/.test(rawWeek) || Math.abs(Number(rawWeek)) > 52)
        error(400, 'Invalid schedule week');
    const week = Number(rawWeek);
    const now = new Date();
    try {
        return {
            week,
            openGymDays: await loadOpenGyms(now, 7, week * 7),
            openGymUnavailable: false
        };
    } catch {
        return { week, openGymDays: openGymDays(now, 7, week * 7), openGymUnavailable: true };
    }
}
