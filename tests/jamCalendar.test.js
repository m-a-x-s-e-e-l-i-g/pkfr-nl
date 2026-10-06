import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createServer } from 'vite';

test('calendar loading recovers from outages, follows every result page, and serves individual events', async () => {
    const server = await createServer({
        configFile: false,
        cacheDir: '.netlify/jam-test-cache',
        optimizeDeps: { noDiscovery: true, include: [] },
        define: {
            'import.meta.env.VITE_GOOGLE_API_KEY': '"test-key"',
            'import.meta.env.VITE_JAM_CALENDAR_ID': '"test-calendar"'
        },
        server: { middlewareMode: true },
        resolve: { alias: { $lib: resolve('src/lib') } }
    });
    const originalFetch = globalThis.fetch;
    try {
        const { loadJams, loadJam, loadJamAgenda, loadPastDutchJams } = await server.ssrLoadModule(
            '/src/lib/server/jamEvents.js'
        );
        globalThis.fetch = async () => new Response('', { status: 503 });
        await assert.rejects(loadJams, { status: 503 });

        const fixture = (id) => ({
            id,
            summary: `Jam ${id}`,
            start: { date: '2027-01-01' },
            end: { date: '2027-01-02' }
        });
        const requestedPages = [];
        globalThis.fetch = async (url) => {
            requestedPages.push(url.searchParams.get('pageToken'));
            assert.equal(url.searchParams.get('singleEvents'), 'true');
            assert.equal(url.searchParams.get('timeZone'), 'Europe/Amsterdam');
            return Response.json(
                url.searchParams.has('pageToken')
                    ? { items: [fixture('second')] }
                    : { items: [fixture('first')], nextPageToken: 'next' }
            );
        };
        const [events, concurrentEvents] = await Promise.all([loadJams(), loadJams()]);
        assert.deepEqual(
            events.map((event) => event.id),
            ['first', 'second']
        );
        assert.equal(events, concurrentEvents);
        assert.deepEqual(requestedPages, [null, 'next']);
        assert.equal(await loadJams(), events);
        const agenda = await loadJamAgenda();
        assert.equal(agenda.events, events);
        assert.ok(Number.isFinite(Date.parse(agenda.retrievedAt)));
        assert.equal((await loadJamAgenda()).retrievedAt, agenda.retrievedAt);
        assert.equal(requestedPages.length, 2);

        let historyCalls = 0;
        globalThis.fetch = async (url) => {
            historyCalls++;
            assert.equal(url.searchParams.has('timeMin'), false);
            assert.ok(url.searchParams.has('timeMax'));
            assert.equal(url.searchParams.get('singleEvents'), 'true');
            return Response.json(
                url.searchParams.has('pageToken')
                    ? {
                          items: [
                              {
                                  ...fixture('old2'),
                                  start: { date: '1999-01-01' },
                                  end: { date: '1999-01-02' }
                              }
                          ]
                      }
                    : {
                          items: [
                              {
                                  ...fixture('old1'),
                                  start: { date: '2000-01-01' },
                                  end: { date: '2000-01-02' }
                              },
                              fixture('future'),
                              { ...fixture('cancelledPast'), status: 'cancelled' }
                          ],
                          nextPageToken: 'history-next'
                      }
            );
        };
        const [history, sameHistory] = await Promise.all([
            loadPastDutchJams(),
            loadPastDutchJams()
        ]);
        assert.deepEqual(
            history.map((event) => event.id),
            ['old1', 'old2']
        );
        assert.equal(history, sameHistory);
        assert.equal(await loadPastDutchJams(), history);
        assert.equal(historyCalls, 2);

        globalThis.fetch = async (url) => {
            assert.ok(url.pathname.endsWith('/events/past123'));
            assert.equal(url.searchParams.has('timeMin'), false);
            return Response.json(fixture('past123'));
        };
        assert.equal((await loadJam('past123')).id, 'past123');
        globalThis.fetch = async () => new Response('', { status: 404 });
        await assert.rejects(() => loadJam('missing'), { status: 404 });
        globalThis.fetch = async () =>
            Response.json({ ...fixture('cancelled'), status: 'cancelled' });
        await assert.rejects(() => loadJam('cancelled'), { status: 404 });
    } finally {
        globalThis.fetch = originalFetch;
        await server.close();
    }
});
