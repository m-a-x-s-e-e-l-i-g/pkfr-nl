import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve } from 'node:path';

test('American history follows overlapping iCal pages, retries incomplete loads and keeps upcoming requests separate', async () => {
    const server = await createServer({
        configFile: false,
        cacheDir: '.netlify/american-history-test-cache',
        optimizeDeps: { noDiscovery: true, include: [] },
        server: { middlewareMode: true, ws: false },
        resolve: { alias: { $lib: resolve('src/lib') } }
    });
    const originalFetch = globalThis.fetch;
    const ical = (items) =>
        `BEGIN:VCALENDAR\r\n${items.map(([id, date, status]) => `BEGIN:VEVENT\r\nUID:${id}\r\nSUMMARY:Jam ${id}\r\nDTSTART;VALUE=DATE:${date}\r\n${status ? `STATUS:${status}\r\n` : ''}END:VEVENT\r\n`).join('')}END:VCALENDAR`;
    let broken = true;
    const requests = [];
    globalThis.fetch = async (value) => {
        const url = new URL(value);
        const history = url.searchParams.get('eventDisplay') === 'past';
        const page = Number(url.searchParams.get('paged') || 1);
        requests.push({ history, page });
        if (!history) return new Response(ical([['future', '20990101']]));
        if (broken && page === 2) return new Response('', { status: 503 });
        return new Response(
            ical(
                page === 1
                    ? [
                          ['old1', '20010101'],
                          ['old2', '20010102'],
                          ['cancelled', '20010103', 'CANCELLED']
                      ]
                    : page === 2
                      ? [
                            ['old2', '20010102'],
                            ['old3', '20010104'],
                            ['old4', '20010105']
                        ]
                      : [['old4', '20010105']]
            )
        );
    };
    try {
        const { GET } = await server.ssrLoadModule('/src/routes/api/jams/american/+server.js');
        const get = (query = '') =>
            GET({ url: new URL(`https://www.pkfr.nl/api/jams/american${query}`) });
        const failure = await get('?includePast=true');
        assert.equal(failure.status, 503);
        assert.equal(failure.headers.get('cache-control'), 'no-store');
        assert.deepEqual(
            (await (await get()).json()).events.map((event) => event.id),
            ['future']
        );
        broken = false;
        const response = await get('?includePast=true');
        assert.equal(response.status, 200);
        const events = (await response.json()).events;
        assert.deepEqual(
            events.map((event) => event.id),
            ['old1', 'old2', 'old3', 'old4', 'future']
        );
        assert.equal(events[0].end, '2001-01-02');
        assert.ok(requests.some((request) => request.history && request.page === 3));
        const count = requests.length;
        await get('?includePast=true');
        assert.equal(requests.length, count);
    } finally {
        globalThis.fetch = originalFetch;
        await server.close();
    }
});
