import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeJam } from '../src/lib/server/normalizeJam.js';
import {
    eventIdFromSlug,
    googleEventUrl,
    jamDateRange,
    jamPath,
    jamTime,
    mapsUrl
} from '../src/lib/jamEvents.js';

const fixture = (overrides = {}) => ({
    id: 'abc123',
    summary: 'Jam in de stad',
    start: { date: '2026-11-01' },
    end: { date: '2026-11-02' },
    ...overrides
});

test('all-day events show their inclusive date and preserve the exclusive calendar end', () => {
    const event = normalizeJam(fixture());
    assert.equal(jamDateRange(event), '1 november 2026');
    assert.equal(jamTime(event), '');
    assert.equal(new URL(googleEventUrl(event)).searchParams.get('dates'), '20261101/20261102');
    const weekend = normalizeJam(fixture({ end: { date: '2026-11-04' } }));
    assert.equal(jamDateRange(weekend), '1 november 2026 – 3 november 2026');
});

test('timed events use Dutch daylight saving time independent of the source timezone', () => {
    const event = normalizeJam(
        fixture({
            start: { dateTime: '2026-10-25T08:00:00Z', timeZone: 'Europe/Sofia' },
            end: { dateTime: '2026-10-25T15:00:00Z' }
        })
    );
    assert.equal(jamTime(event), '09:00 – 16:00');
    assert.equal(jamDateRange(event), '25 oktober 2026');
    const summer = normalizeJam(
        fixture({
            start: { dateTime: '2027-06-06T07:00:00Z' },
            end: { dateTime: '2027-06-06T14:00:00Z' }
        })
    );
    assert.equal(jamTime(summer), '09:00 – 16:00');
    assert.equal(
        new URL(googleEventUrl(event)).searchParams.get('dates'),
        '20261025T080000Z/20261025T150000Z'
    );
});

test('event routes distinguish duplicate titles and remain resolvable after a rename', () => {
    const event = normalizeJam(
        fixture({ summary: 'Jám & friends!', id: 'abc123_20261101T100000Z' })
    );
    const path = jamPath(event);
    assert.equal(path, '/jams/jam-friends--abc123_20261101T100000Z');
    assert.equal(eventIdFromSlug(path.split('/').at(-1)), event.id);
    assert.equal(eventIdFromSlug('previous-title--abc123_20261101T100000Z'), event.id);
    assert.notEqual(jamPath(event), jamPath({ ...event, id: 'def456' }));
    assert.equal(eventIdFromSlug('europe'), null);
    assert.equal(eventIdFromSlug('event--../private'), null);
});

test('a timed event ending at midnight does not add an extra day to the date range', () => {
    const event = normalizeJam(
        fixture({
            start: { dateTime: '2026-12-06T00:00:00+01:00' },
            end: { dateTime: '2026-12-07T00:00:00+01:00' }
        })
    );
    assert.equal(jamDateRange(event), '6 december 2026');
    assert.equal(
        new URL(googleEventUrl(event)).searchParams.get('dates'),
        '20261205T230000Z/20261206T230000Z'
    );
});

test('calendar descriptions keep formatting and links while removing executable content', () => {
    const event = normalizeJam(
        fixture({
            description:
                '<p><strong>Kom trainen</strong> &amp; spelen</p><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">Fout</a><a href="https://example.org/info">Info</a>\nhttps://example.org/tickets?x=1&amp;y=2'
        })
    );
    assert.match(event.description, /<strong>Kom trainen<\/strong>/);
    assert.match(event.description, /href="https:\/\/example.org\/info"/);
    assert.match(event.description, /href="https:\/\/example.org\/tickets\?x=1&amp;y=2"/);
    assert.doesNotMatch(event.description, /<script|<img|onerror|javascript:/);
    assert.match(event.descriptionText, /Kom trainen & spelen/);
    assert.doesNotMatch(event.descriptionText, /<strong>/);
    const attack = normalizeJam(
        fixture({ description: 'https://example.org/&quot; onmouseover=&quot;alert(1)' })
    );
    assert.doesNotMatch(attack.description, /<[^>]+\sonmouseover=/);
});

test('missing details remain empty and cancelled or malformed events are omitted', () => {
    const event = normalizeJam(fixture());
    assert.equal(event.location, '');
    assert.equal(event.descriptionText, '');
    assert.equal(normalizeJam(fixture({ status: 'cancelled' })), null);
    assert.equal(normalizeJam(fixture({ start: { dateTime: 'not-a-date' } })), null);
    assert.equal(
        new URL(mapsUrl('SaZa, Sportweg 1 & 2')).searchParams.get('query'),
        'SaZa, Sportweg 1 & 2'
    );
});
