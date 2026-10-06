import { SEO_PAGES, sitemapXml } from '$lib/seo';
import { jamPath } from '$lib/jamEvents';
import { gymList } from '$lib/assets/js/gyms';
import { gymPath } from '$lib/gymDetails';
import { loadJamHistory } from '$lib/server/jamHistory';
import { loadJams } from '$lib/server/jamEvents';
import { loadInternationalJams } from '$lib/server/internationalJams';

export const prerender = false;

export async function GET({ fetch }) {
    try {
        const sources = await Promise.allSettled([
            loadJams(),
            loadInternationalJams('europe', fetch),
            loadInternationalJams('america', fetch),
            loadJamHistory(fetch)
        ]);
        if (
            sources.some((source) => source.status === 'rejected') ||
            sources[3].value.unavailableSources.length
        )
            return new Response('Sitemap temporarily unavailable', { status: 503 });
        const paths = [
            ...Object.keys(SEO_PAGES),
            ...gymList.map(gymPath),
            ...sources[3].value.events.map(jamPath),
            ...sources.slice(0, 3).flatMap((source) => source.value.map(jamPath))
        ];
        return new Response(sitemapXml(paths), {
            headers: {
                'content-type': 'application/xml; charset=utf-8',
                'cache-control': 'public, max-age=300, s-maxage=300'
            }
        });
    } catch {
        return new Response('Sitemap temporarily unavailable', { status: 503 });
    }
}
