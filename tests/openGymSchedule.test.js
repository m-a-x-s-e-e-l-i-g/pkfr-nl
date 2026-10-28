import test from 'node:test';
import assert from 'node:assert/strict';
import { openGymDays, groupOpenGyms, openGymTime } from '../src/lib/openGymSchedule.js';

test('today and tomorrow follow Amsterdam midnight, independent of the host timezone', () => {
    const days = openGymDays(new Date('2026-10-06T22:01:00Z'));
    assert.deepEqual(
        days.map((day) => day.date),
        ['2026-10-07', '2026-10-08']
    );
    assert.equal(days[0].start, '2026-10-06T22:00:00.000Z');
    assert.equal(days[1].end, '2026-10-08T22:00:00.000Z');
});

test('Dutch daylight-saving transitions preserve the complete 23-hour or 25-hour day', () => {
    const spring = openGymDays(new Date('2026-03-29T12:00:00Z'))[0];
    const autumn = openGymDays(new Date('2026-10-25T12:00:00Z'))[0];
    assert.equal((Date.parse(spring.end) - Date.parse(spring.start)) / 3600000, 23);
    assert.equal((Date.parse(autumn.end) - Date.parse(autumn.start)) / 3600000, 25);
    assert.equal(spring.end, '2026-03-29T22:00:00.000Z');
    assert.equal(autumn.end, '2026-10-25T23:00:00.000Z');
});

test('overnight sessions appear on both days; exclusive ends and cancelled events do not leak', () => {
    const days = openGymDays(new Date('2026-10-06T12:00:00Z'));
    const event = (id, start, end) => ({
        id,
        summary: id,
        start: { dateTime: start },
        end: { dateTime: end }
    });
    const grouped = groupOpenGyms(
        [
            event('overnight', '2026-10-06T23:00:00+02:00', '2026-10-07T02:00:00+02:00'),
            { id: 'all-day', start: { date: '2026-10-06' }, end: { date: '2026-10-07' } },
            event('outside', '2026-10-08T00:00:00+02:00', '2026-10-08T02:00:00+02:00'),
            {
                ...event('cancelled', '2026-10-06T14:00:00Z', '2026-10-06T15:00:00Z'),
                status: 'cancelled'
            },
            event('malformed', 'invalid', 'invalid')
        ],
        days
    );
    assert.deepEqual(
        grouped.map((day) => day.events.map((event) => event.id)),
        [['all-day', 'overnight'], ['overnight']]
    );
    assert.equal(openGymTime(grouped[0].events[1]), '23:00 – 24:00');
    assert.equal(openGymTime(grouped[1].events[0]), '00:00 – 02:00');
    assert.equal(grouped[0].events[0].allDay, true);
    assert.deepEqual(
        groupOpenGyms([], days).map((day) => day.events),
        [[], []]
    );
});
