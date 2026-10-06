import test from 'node:test';
import assert from 'node:assert/strict';
import {
    normalizeInternationalJam,
    upcomingInternationalJams,
    loadInternationalJam,
    loadInternationalJams
} from '../src/lib/server/internationalJams.js';
import {
    eventIdFromSlug,
    googleEventUrl,
    jamAgendaPath,
    jamDateRange,
    jamPath,
    jamTime
} from '../src/lib/jamEvents.js';

test('European inclusive weekends and American exclusive ends produce the same card dates', () => {
    const europe = normalizeInternationalJam(
        { id: 1, title: 'Weekend jam', start: '2026-11-06', end: '2026-11-08', all_day: 1 },
        'europe'
    );
    const america = normalizeInternationalJam(
        { id: 'usa-1', title: 'Weekend jam', start: '2026-11-06', end: '2026-11-09', allDay: true },
        'america'
    );
    assert.equal(europe.end, '2026-11-09');
    assert.equal(jamDateRange(europe), '6 november 2026 – 8 november 2026');
    assert.equal(jamDateRange(america), jamDateRange(europe));
    const floating = normalizeInternationalJam(
        { title: 'Evening jam', start: '2026-11-06T19:00:00', end: '2026-11-06T21:00:00' },
        'america'
    );
    assert.equal(jamTime(floating), '19:00 – 21:00');
});

test('regional routes round-trip source IDs with punctuation and remain valid after title changes', () => {
    const id = '252656-123@americanparkour.com/é?x=1#--';
    for (const region of ['europe', 'america']) {
        const event = normalizeInternationalJam(
            { id, title: 'Jám & friends', start: '2026-11-06', allDay: true, all_day: 1 },
            region
        );
        const path = jamPath(event);
        assert.ok(path.startsWith(`/jams/${region}/jam-friends--`));
        assert.equal(jamAgendaPath(event), `/jams/${region}`);
        assert.equal(eventIdFromSlug(path.split('/').at(-1), region), id);
        assert.equal(eventIdFromSlug(`old-title--${path.split('--').at(-1)}`, region), id);
        assert.equal(
            new URL(googleEventUrl(event)).searchParams.get('details').split('\n').at(-1),
            `https://www.pkfr.nl${path}`
        );
    }
    for (const invalid of ['missing-id', 'jam--0', 'jam--zz', 'jam--ff']) {
        assert.equal(eventIdFromSlug(invalid, 'america'), null);
    }
});

test('international calendar actions preserve all-day ends and known source-local times', () => {
    const event = normalizeInternationalJam(
        {
            id: 1,
            title: 'Evening jam',
            start: '2026-11-06T19:00:00',
            end: '2026-11-06T21:00:00',
            time_zone: 'Europe/Berlin'
        },
        'europe'
    );
    const params = new URL(googleEventUrl(event)).searchParams;
    assert.equal(params.get('dates'), '20261106T190000/20261106T210000');
    assert.equal(params.get('ctz'), 'Europe/Berlin');
    const weekend = normalizeInternationalJam(
        { start: '2026-11-06', end: '2026-11-08', all_day: 1 },
        'europe'
    );
    assert.equal(new URL(googleEventUrl(weekend)).searchParams.get('dates'), '20261106/20261109');
});

test('past details use the full source feed and distinguish missing events from feed failures', async () => {
    const items = [
        {
            id: 'old@apk.com',
            title: 'Previous jam',
            start: '2001-01-01',
            allDay: true,
            extendedProps: {
                description: '<p>Full <strong>description</strong>.</p><script>bad()</script>'
            }
        }
    ];
    const fetch = async (url) => {
        assert.equal(url, '/api/jams/american?includePast=true');
        return Response.json({ events: items });
    };
    assert.deepEqual(await loadInternationalJams('america', fetch), []);
    const event = await loadInternationalJam('america', 'old@apk.com', fetch);
    assert.equal(event.title, 'Previous jam');
    assert.ok(event.description.includes('<strong>description</strong>'));
    assert.ok(!event.description.includes('<script>'));
    await assert.rejects(loadInternationalJam('america', 'missing', fetch), { status: 404 });
    await assert.rejects(
        loadInternationalJam(
            'america',
            'old@apk.com',
            async () => new Response('', { status: 502 })
        ),
        { status: 503 }
    );
});

test('source links stay external and safe, with readable sanitized excerpts and location fallbacks', () => {
    const event = normalizeInternationalJam(
        {
            start: '2026-11-06',
            all_day: 1,
            link: { url: 'javascript:alert(1)' },
            organizer: { website: 'www.example.com/jam' },
            venue: { name: 'Community gym' },
            desc: '<p>Hello &amp; welcome</p><script>bad()</script>'
        },
        'europe'
    );
    assert.equal(event.url, 'https://www.example.com/jam');
    assert.equal(event.excerpt, 'Hello & welcome');
    assert.equal(event.location, 'Community gym');
    const noLink = normalizeInternationalJam(
        { start: '2026-11-06', all_day: 1, venue: { lat: '', lng: '' } },
        'europe'
    );
    assert.equal(noLink.url, 'https://www.matttma.de/en/parkourjamcalendar');
    const america = normalizeInternationalJam(
        { start: '2026-11-06', allDay: true, url: 'data:text/html,bad' },
        'america'
    );
    assert.equal(america.url, 'https://americanparkour.com/community-events/');
});

test('all upcoming jams are ordered, ongoing weekends retained and exclusive ended events omitted', () => {
    const items = [
        { id: 'later', start: '2026-11-09', allDay: true },
        { id: 'ended', start: '2026-11-06', end: '2026-11-08', allDay: true },
        { id: 'ongoing', start: '2026-11-06', end: '2026-11-09', allDay: true },
        { id: 'invalid', start: 'no-date' },
        null
    ];
    // It is already November 8 in the Netherlands, even though UTC is still November 7.
    const events = upcomingInternationalJams(items, 'america', new Date('2026-11-07T23:30:00Z'));
    assert.deepEqual(
        events.map((event) => event.id),
        ['ongoing', 'later']
    );
    assert.deepEqual(upcomingInternationalJams(null, 'europe'), []);
});
