import { AMERICAN_JAM_FEED_URL } from '$lib/calendarFeeds';

export const prerender = false;

export const GET = async ({ fetch }) => {
    try {
        const response = await fetch(AMERICAN_JAM_FEED_URL, {
            headers: {
                accept: 'text/calendar,text/plain;q=0.9,*/*;q=0.8'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to load American jams feed (${response.status})`);
        }

        return new Response(await response.text(), {
            headers: {
                'content-type': 'text/calendar; charset=utf-8',
                'content-disposition': 'inline; filename="american-parkour-jams.ics"',
                'cache-control': 'public, max-age=900, s-maxage=1800',
                'access-control-allow-origin': '*'
            }
        });
    } catch (error) {
        console.error('Failed to proxy American jams iCal feed', error);
        return new Response('Calendar feed is temporarily unavailable.', { status: 502 });
    }
};
