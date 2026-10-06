import { SEO_PAGES, sitemapXml } from '$lib/seo';
import { isPastJam, jamPath } from '$lib/jamEvents';
import { archivedJams } from '$lib/server/jamArchive';
import { loadJams } from '$lib/server/jamEvents';
import { loadInternationalJams } from '$lib/server/internationalJams';

export const prerender = false;

export async function GET({ fetch }) {
    try {
        const sources = await Promise.allSettled([
            loadJams(),
            loadInternationalJams('europe', fetch),
            loadInternationalJams('america', fetch)
        ]);
        const captured = await archivedJams();
        const paths = [
            ...Object.keys(SEO_PAGES),
            ...captured.filter((event) => isPastJam(event)).map(jamPath),
            ...sources.flatMap((source) =>
                source.status === 'fulfilled' ? source.value.map(jamPath) : []
            )
        ];
        // Don't cache an incomplete calendar after a transient upstream failure.
        if (sources.some((source) => source.status === 'rejected'))
            return new Response('Sitemap temporarily unavailable', { status: 503 });
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
