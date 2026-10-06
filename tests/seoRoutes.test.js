import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createServer } from 'vite';

test('sitemap and archive retain past details, paginate and handle unavailable sources', async () => {
    const fixtures = {
        archive: async () =>
            Array.from({ length: 35 }, (_, index) => ({
                id: `past${index}`,
                title: `Past jam ${index}`,
                start: '2001-01-01',
                allDay: true,
                ...(index % 2 ? { region: 'europe' } : {})
            })).concat({
                id: 'removedFuture',
                title: 'Removed future event',
                start: '2040-01-01',
                allDay: true
            }),
        upcoming: async () => [
            { id: 'upcoming', title: 'Upcoming jam', start: '2040-01-01', allDay: true }
        ],
        international: async () => [],
        pastDutch: async () => [
            { id: 'neverCaptured', title: 'Old calendar jam', start: '2000-01-01', allDay: true },
            {
                id: 'past0',
                title: 'Past jam 0',
                start: '2001-01-01',
                allDay: true,
                descriptionText: 'Fresh source description'
            }
        ],
        pastInternational: async () => []
    };
    globalThis.__pkfrSeoFixtures = fixtures;
    const overrides = {
        [resolve('src/lib/server/jamArchive.js').replaceAll('\\', '/')]:
            'export const archivedJams = () => globalThis.__pkfrSeoFixtures.archive();',
        [resolve('src/lib/server/jamEvents.js').replaceAll('\\', '/')]:
            'export const loadJams = () => globalThis.__pkfrSeoFixtures.upcoming(); export const loadPastDutchJams = () => globalThis.__pkfrSeoFixtures.pastDutch();',
        [resolve('src/lib/server/internationalJams.js').replaceAll('\\', '/')]:
            'export const loadInternationalJams = () => globalThis.__pkfrSeoFixtures.international(); export const loadPastInternationalJams = (region) => globalThis.__pkfrSeoFixtures.pastInternational(region);'
    };
    const server = await createServer({
        configFile: false,
        cacheDir: '.netlify/seo-route-test-cache',
        optimizeDeps: { noDiscovery: true, include: [] },
        plugins: [
            {
                name: 'seo-route-fixtures',
                enforce: 'pre',
                load(id) {
                    return overrides[id.replaceAll('\\', '/')];
                }
            }
        ],
        server: { middlewareMode: true, ws: false },
        resolve: { alias: { $lib: resolve('src/lib') } }
    });
    try {
        const { GET } = await server.ssrLoadModule('/src/routes/sitemap.xml/+server.js');
        const response = await GET({ fetch });
        assert.equal(response.status, 200);
        const xml = await response.text();
        assert.match(xml, /past-jam-0--past0/);
        assert.match(xml, /upcoming-jam--upcoming/);
        assert.ok(!xml.includes('removedFuture'));
        assert.match(xml, /old-calendar-jam--neverCaptured/);
        assert.equal((xml.match(/<url>/g) || []).length, 49);
        const { load } = await server.ssrLoadModule('/src/routes/jams/archive/+page.server.js');
        const archive = (query) =>
            load({ url: new URL(`https://www.pkfr.nl/jams/archive${query}`), fetch });
        const first = await archive('');
        assert.equal(first.events.length, 30);
        assert.equal(first.pages, 2);
        assert.equal(first.total, 36);
        assert.equal(
            first.events.find((event) => event.id === 'past0').descriptionText,
            'Fresh source description'
        );
        assert.equal((await archive('?page=2')).events.length, 6);
        assert.equal((await archive('?region=europe')).events.length, 17);
        await assert.rejects(() => archive('?page=3'), { status: 404 });
        await assert.rejects(() => archive('?page=-1'), { status: 400 });
        await assert.rejects(() => archive('?region=invalid'), { status: 400 });
        fixtures.upcoming = async () => {
            throw new Error('Calendar unavailable');
        };
        const unavailable = await GET({ fetch });
        assert.equal(unavailable.status, 503);
        assert.equal(unavailable.headers.get('cache-control'), null);
        fixtures.archive = async () => {
            throw new Error('Archive unavailable');
        };
        // Keep showing live history even when snapshot storage fails.
        assert.equal((await archive('')).historyIncomplete, true);
        assert.ok((await archive('')).events.some((event) => event.id === 'neverCaptured'));
        fixtures.pastDutch = async () => {
            throw new Error('History unavailable');
        };
        assert.equal((await archive('')).archiveUnavailable, true);
        assert.equal((await GET({ fetch })).status, 503);
    } finally {
        delete globalThis.__pkfrSeoFixtures;
        await server.close();
    }
});
