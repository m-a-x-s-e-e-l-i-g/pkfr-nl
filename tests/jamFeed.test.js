import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createServer } from 'vite';

test('public JSON, Markdown and HTML loaders share the source snapshot and return honest outage responses', async () => {
    const snapshot = {
        events: [{ id: 'jam1', title: 'Dutch jam', start: '2026-11-01', allDay: true }],
        retrievedAt: '2026-10-07T10:00:00Z'
    };
    globalThis.__pkfrFeedFixture = async () => snapshot;
    const server = await createServer({
        configFile: false,
        cacheDir: '.netlify/feed-route-test-cache',
        optimizeDeps: { noDiscovery: true, include: [] },
        plugins: [
            {
                name: 'feed-fixture',
                enforce: 'pre',
                load(id) {
                    if (
                        id.replaceAll('\\', '/') ===
                        resolve('src/lib/server/jamEvents.js').replaceAll('\\', '/')
                    )
                        return 'export const loadJamAgenda = () => globalThis.__pkfrFeedFixture();';
                }
            }
        ],
        server: { middlewareMode: true, ws: false },
        resolve: { alias: { $lib: resolve('src/lib') } }
    });
    try {
        const json = await server.ssrLoadModule('/src/routes/api/jams/+server.js');
        const markdown = await server.ssrLoadModule('/src/routes/jams.md/+server.js');
        const page = await server.ssrLoadModule('/src/routes/jams/+page.server.js');
        const response = await json.GET();
        assert.equal(response.status, 200);
        assert.match(response.headers.get('content-type'), /application\/json/);
        assert.equal(response.headers.get('access-control-allow-origin'), '*');
        assert.match(response.headers.get('link'), /jams.md.*alternate/);
        const data = await response.json();
        assert.equal(data.count, 1);
        assert.equal(data.retrievedAt, snapshot.retrievedAt);
        assert.equal(data.events[0].url, 'https://www.pkfr.nl/jams/dutch-jam--jam1');
        assert.match(
            await (await markdown.GET()).text(),
            /https:\/\/www.pkfr.nl\/jams\/dutch-jam--jam1/
        );
        assert.equal((await page.load()).calendarFetchedAt, data.retrievedAt);
        globalThis.__pkfrFeedFixture = async () => ({ ...snapshot, events: [] });
        assert.equal((await (await json.GET()).json()).count, 0);
        globalThis.__pkfrFeedFixture = async () => {
            throw new Error('Source unavailable');
        };
        for (const route of [json, markdown]) {
            const failure = await route.GET();
            assert.equal(failure.status, 503);
            assert.equal(failure.headers.get('cache-control'), 'no-store');
        }
        assert.equal((await page.load()).calendarUnavailable, true);
        assert.equal((await page.load()).calendarFetchedAt, null);
    } finally {
        delete globalThis.__pkfrFeedFixture;
        await server.close();
    }
});
