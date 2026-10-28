import { loadJamAgenda } from './jamEvents.js';
import { jamData, jamMarkdown } from '../eventData.js';
import { SITE_ORIGIN } from '../seo.js';

export async function jamFeed(format) {
    try {
        const agenda = await loadJamAgenda();
        return new Response(
            format === 'json' ? JSON.stringify(jamData(agenda)) : jamMarkdown(agenda),
            {
                headers: {
                    'Content-Type': `${format === 'json' ? 'application/json' : 'text/markdown'}; charset=utf-8`,
                    'Cache-Control': 'public, max-age=0, s-maxage=300',
                    'Access-Control-Allow-Origin': '*',
                    'X-Content-Type-Options': 'nosniff',
                    Link: `<${SITE_ORIGIN}/jams>; rel="canonical", <${SITE_ORIGIN}/llms.txt>; rel="describedby", <${SITE_ORIGIN}/${format === 'json' ? 'jams.md' : 'api/jams'}>; rel="alternate"; type="${format === 'json' ? 'text/markdown' : 'application/json'}"`
                }
            }
        );
    } catch {
        return new Response('Jam calendar temporarily unavailable. Please try again later.\n', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
        });
    }
}
