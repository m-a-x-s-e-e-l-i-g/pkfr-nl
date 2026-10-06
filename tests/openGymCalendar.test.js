import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createServer } from 'vite';

test('open gym loading recovers, follows pages, shares requests and refreshes at Dutch midnight', async () => {
    const server = await createServer({
        configFile: false,
        cacheDir: '.netlify/open-gym-test-cache',
        optimizeDeps: { noDiscovery: true, include: [] },
        define: {
            'import.meta.env.VITE_GOOGLE_API_KEY': '"test-key"',
            'import.meta.env.VITE_OPEN_GYM_CALENDAR_ID': '"test-calendar"'
        },
        server: { middlewareMode: true, ws: false },
        resolve: { alias: { $lib: resolve('src/lib') } }
    });
    const originalFetch = globalThis.fetch;
    try {
        const { loadOpenGyms } = await server.ssrLoadModule('/src/lib/server/openGymEvents.js');
        const now = new Date('2026-10-06T16:00:00Z');
        globalThis.fetch = async () => new Response('', { status: 503 });
        await assert.rejects(() => loadOpenGyms(now), { status: 503 });
        let requests = 0;
        globalThis.fetch = async (url) => {
            requests++;
            assert.equal(url.searchParams.get('timeMin'), '2026-10-05T22:00:00.000Z');
            assert.equal(url.searchParams.get('timeMax'), '2026-10-07T22:00:00.000Z');
            assert.equal(url.searchParams.get('timeZone'), 'Europe/Amsterdam');
            assert.equal(url.searchParams.get('singleEvents'), 'true');
            const second = url.searchParams.has('pageToken');
            return Response.json({
                items: [
                    {
                        id: second ? 'tomorrow' : 'today',
                        summary: 'Gym',
                        start: { dateTime: `2026-10-0${second ? 7 : 6}T17:00:00+02:00` },
                        end: { dateTime: `2026-10-0${second ? 7 : 6}T19:00:00+02:00` }
                    }
                ],
                ...(second ? {} : { nextPageToken: 'next' })
            });
        };
        const [days, concurrent] = await Promise.all([loadOpenGyms(now), loadOpenGyms(now)]);
        assert.equal(days, concurrent);
        assert.deepEqual(
            days.map((day) => day.events.map((event) => event.id)),
            [['today'], ['tomorrow']]
        );
        assert.equal(await loadOpenGyms(now), days);
        assert.equal(requests, 2);
        globalThis.fetch = async (url) => {
            requests++;
            assert.equal(url.searchParams.get('timeMin'), '2026-10-07T22:00:00.000Z');
            return Response.json({ items: [] });
        };
        const nextDay = await loadOpenGyms(new Date('2026-10-07T22:01:00Z'));
        assert.equal(nextDay[0].date, '2026-10-08');
        assert.equal(requests, 3);
    } finally {
        globalThis.fetch = originalFetch;
        await server.close();
    }
});
