import { EUROPE_JAM_FEED_URL } from '$lib/calendarFeeds';
import { createEuropeJamCalendar } from '$lib/server/ical';

export const prerender = false;

export const GET = async ({ fetch }) => {
    try {
        const response = await fetch(EUROPE_JAM_FEED_URL, {
            headers: {
                accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to load European jams feed (${response.status})`);
        }

        const data = await response.json();
        const calendar = createEuropeJamCalendar(data.events);

        return new Response(calendar, {
            headers: {
                'content-type': 'text/calendar; charset=utf-8',
                'content-disposition': 'inline; filename="matttma-european-parkour-jams.ics"',
                'cache-control': 'public, max-age=900, s-maxage=1800',
                'access-control-allow-origin': '*'
            }
        });
    } catch (error) {
        console.error('Failed to build European jams iCal feed', error);
        return new Response('Calendar feed is temporarily unavailable.', { status: 502 });
    }
};
