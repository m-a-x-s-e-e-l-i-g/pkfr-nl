import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createServer } from 'vite';

test('gym routes reject unknown slugs and preserve gym information when the calendar fails', async () => {
    globalThis.__pkfrGymCalendar = async () => [
        {
            events: [
                {
                    id: 'session',
                    title: 'Munki Haarlem',
                    location: 'Stephensonstraat 4, 2014 KD Haarlem',
                    start: '2040-01-01T12:00:00Z',
                    end: '2040-01-01T14:00:00Z'
                }
            ]
        }
    ];
    const target = resolve('src/lib/server/openGymEvents.js').replaceAll('\\', '/');
    const server = await createServer({
        configFile: false,
        cacheDir: '.netlify/gym-route-test-cache',
        optimizeDeps: { noDiscovery: true, include: [] },
        server: { middlewareMode: true, ws: false },
        resolve: { alias: { $lib: resolve('src/lib') } },
        plugins: [
            {
                name: 'gym-calendar-fixture',
                enforce: 'pre',
                load(id) {
                    if (id.replaceAll('\\', '/') === target)
                        return 'export const loadOpenGyms = (...args) => globalThis.__pkfrGymCalendar(...args);';
                }
            }
        ]
    });
    try {
        const { load } = await server.ssrLoadModule('/src/routes/gyms/[slug]/+page.server.js');
        await assert.rejects(() => load({ params: { slug: 'unknown-gym' } }), { status: 404 });
        const detail = await load({ params: { slug: 'munki-motion-haarlem' } });
        assert.equal(detail.sessions.length, 1);
        assert.equal(detail.openGymUnavailable, false);
        assert.equal(detail.nearbyGyms.length, 3);
        assert.ok(detail.nearbyGyms.every((gym) => gym.slug !== detail.gym.slug));
        globalThis.__pkfrGymCalendar = async () => {
            throw new Error('Calendar offline');
        };
        const unavailable = await load({ params: { slug: 'munki-motion-haarlem' } });
        assert.equal(unavailable.gym.name, 'Munki Motion Haarlem');
        assert.equal(unavailable.openGymUnavailable, true);
        assert.deepEqual(unavailable.sessions, []);
    } finally {
        await server.close();
        delete globalThis.__pkfrGymCalendar;
    }
});
