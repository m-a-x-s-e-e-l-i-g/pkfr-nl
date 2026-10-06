import test from 'node:test';
import assert from 'node:assert/strict';
import {
    jamData,
    jamMarkdown,
    safeJsonLd,
    structuredEvent,
    structuredPage
} from '../src/lib/eventData.js';
import { pageMetadata } from '../src/lib/seo.js';

const event = {
    id: 'community123',
    title: 'Community jam',
    start: '2026-10-24',
    end: '2026-10-26',
    allDay: true,
    location: 'Utrecht',
    descriptionText: 'Train together.'
};

test('Event data uses canonical detail links and inclusive all-day dates without inventing ticket or organizer facts', () => {
    const data = structuredEvent(event);
    assert.equal(data.url, 'https://www.pkfr.nl/jams/community-jam--community123');
    assert.equal(data.startDate, '2026-10-24');
    assert.equal(data.endDate, '2026-10-25');
    assert.deepEqual(data.location, { '@type': 'Place', name: 'Utrecht' });
    for (const field of ['offers', 'organizer', 'eventStatus', 'dateModified'])
        assert.ok(!(field in data));
    const missing = structuredEvent({ ...event, location: '', end: null });
    assert.ok(!('location' in missing));
    assert.ok(!('endDate' in missing));
});

test('timed events preserve offsets; international floating clocks resolve known zones and do not guess unknown ones', () => {
    const timed = {
        ...event,
        allDay: false,
        start: '2026-10-25T14:00:00+01:00',
        end: '2026-10-25T17:00:00+01:00'
    };
    assert.equal(structuredEvent(timed).startDate, timed.start);
    const local = {
        ...timed,
        region: 'america',
        timeZone: 'UTC',
        sourceTimeZone: 'America/New_York',
        start: '2026-11-01T14:00:00Z',
        end: '2026-11-01T17:00:00Z'
    };
    assert.equal(structuredEvent(local).startDate, '2026-11-01T19:00:00.000Z');
    assert.equal(structuredEvent(local).endDate, '2026-11-01T22:00:00.000Z');
    assert.equal(
        structuredEvent({ ...local, sourceTimeZone: null }).startDate,
        '2026-11-01T14:00:00'
    );
    assert.equal(
        structuredEvent({ ...local, sourceTimeZone: null, timeZone: null }).startDate,
        local.start
    );
});

test('structured pages distinguish the publisher from event organizers and link downloadable Dutch agenda data', () => {
    const graph = structuredPage(pageMetadata('/jams'), { path: '/jams', events: [event] })[
        '@graph'
    ];
    assert.equal(graph.find((item) => item['@type'] === 'ItemList').itemListElement.length, 1);
    assert.equal(
        graph.find((item) => item['@type'] === 'Dataset').distribution[0].contentUrl,
        'https://www.pkfr.nl/api/jams'
    );
    const detail = structuredPage(pageMetadata('/jams/old-title', { event }), { event })['@graph'];
    assert.equal(
        detail.find((item) => item['@type'] === 'WebPage').mainEntity['@id'],
        structuredEvent(event)['@id']
    );
    assert.ok(!('organizer' in detail.find((item) => item['@type'] === 'Event')));
    assert.ok(
        !structuredPage(pageMetadata('/jams/europe'), { path: '/jams/europe', events: [] })[
            '@graph'
        ].some((item) => item['@type'] === 'Dataset')
    );
});

test('JSON-LD escapes script termination and Markdown keeps source headings separate from document structure', () => {
    const hostile = {
        ...event,
        title: 'Jam\n## injected',
        descriptionText: '</script><script>alert(1)</script>\n# New heading'
    };
    const serialized = safeJsonLd(structuredEvent(hostile));
    assert.ok(!serialized.includes('<'));
    assert.deepEqual(JSON.parse(serialized), structuredEvent(hostile));
    const agenda = { events: [hostile], retrievedAt: '2026-10-07T10:00:00Z' };
    const markdown = jamMarkdown(agenda);
    assert.match(markdown, /### Jam \\#\\# injected/);
    assert.match(markdown, /> \\# New heading/);
    assert.ok(!markdown.includes('\n## injected'));
    assert.equal(jamData(agenda).retrievedAt, agenda.retrievedAt);
    assert.match(markdown, /source retrieved at: 2026-10-07T10:00:00Z/);
    assert.match(markdown, /End: 2026-10-25 \(inclusive, all day\)/);
});
