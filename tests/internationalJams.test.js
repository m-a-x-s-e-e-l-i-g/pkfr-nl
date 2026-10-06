import test from 'node:test';
import assert from 'node:assert/strict';
import {
    normalizeInternationalJam,
    upcomingInternationalJams
} from '../src/lib/server/internationalJams.js';
import { jamDateRange, jamTime } from '../src/lib/jamEvents.js';

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
