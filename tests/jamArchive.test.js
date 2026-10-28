import test from 'node:test';
import assert from 'node:assert/strict';
import { createJamArchive } from '../src/lib/server/jamArchive.js';
import { isPastJam } from '../src/lib/jamEvents.js';

test('past detection respects inclusive all-day dates, Dutch midnight and timed ends', () => {
    const weekend = { start: '2026-10-24', end: '2026-10-26', allDay: true };
    assert.equal(isPastJam(weekend, new Date('2026-10-25T22:59:59Z')), false);
    assert.equal(isPastJam(weekend, new Date('2026-10-25T23:00:00Z')), true);
    const singleDay = { start: '2026-10-25', allDay: true };
    assert.equal(isPastJam(singleDay, new Date('2026-10-25T12:00:00Z')), false);
    assert.equal(isPastJam(singleDay, new Date('2026-10-26T12:00:00Z')), true);
    const timed = { start: '2026-10-25T08:00:00Z', end: '2026-10-25T15:00:00Z' };
    assert.equal(isPastJam(timed, new Date('2026-10-25T14:59:59Z')), false);
    assert.equal(isPastJam(timed, new Date('2026-10-25T15:00:00Z')), true);
});

test('international floating times end in their source timezone, with a conservative date fallback', () => {
    const berlin = {
        region: 'europe',
        start: '2026-10-25T10:00:00Z',
        end: '2026-10-25T19:00:00Z',
        timeZone: 'UTC',
        sourceTimeZone: 'Europe/Berlin'
    };
    assert.equal(isPastJam(berlin, new Date('2026-10-25T17:59:59Z')), false);
    assert.equal(isPastJam(berlin, new Date('2026-10-25T18:00:00Z')), true);
    const unknown = { ...berlin, sourceTimeZone: undefined };
    assert.equal(isPastJam(unknown, new Date('2026-10-25T21:00:00Z')), false);
    assert.equal(isPastJam(unknown, new Date('2026-10-26T12:00:00Z')), true);
});

test('snapshots survive a fresh archive instance, isolate feeds and only rewrite changed content', async () => {
    const records = new Map();
    let writes = 0;
    const store = () => ({
        async setJSON(key, value) {
            writes++;
            records.set(key, structuredClone(value));
        },
        async get(key) {
            return records.get(key) || null;
        },
        async list() {
            return { blobs: [...records.keys()].map((key) => ({ key })) };
        }
    });
    const archive = createJamArchive(store);
    const event = {
        id: 'a/long@source-id?é',
        region: 'america',
        title: 'Community jam',
        start: '2025-01-01',
        allDay: true,
        description: '<p>Original info</p>'
    };
    assert.deepEqual(await Promise.all([archive.save(event), archive.save(event)]), [true, true]);
    assert.equal(writes, 1);
    const reloaded = createJamArchive(store);
    assert.deepEqual(await reloaded.load('america', event.id), { ...event, archiveStored: true });
    assert.equal((await reloaded.list()).length, 1);
    assert.equal(await reloaded.load('europe', event.id), null);
    await archive.save({ ...event, title: 'Updated title' });
    assert.equal(writes, 2);
    assert.equal((await reloaded.load('america', event.id)).title, 'Updated title');
    assert.equal((await archive.list())[0].title, 'Updated title');
    assert.ok([...records.keys()].every((key) => key.length < 600));
});

test('immutable history batches survive removals, merge with individual snapshots and preserve detail lookup', async () => {
    const records = new Map();
    const store = () => ({
        async setJSON(key, value, options) {
            if (options?.onlyIfNew && records.has(key)) return { modified: false };
            records.set(key, structuredClone(value));
        },
        async get(key) {
            return records.get(key) || null;
        },
        async list() {
            return { blobs: [...records.keys()].map((key) => ({ key })) };
        }
    });
    const archive = createJamArchive(store);
    const old = { id: 'old', title: 'Original jam', start: '2000-01-01', allDay: true };
    const removed = { ...old, id: 'removed', title: 'Removed from source' };
    assert.equal(await archive.saveHistory('dutch', [old, removed]), true);
    assert.equal(records.size, 1);
    assert.equal(await archive.saveHistory('dutch', [removed, old]), true);
    assert.equal(records.size, 1);
    const reloaded = createJamArchive(store);
    assert.equal((await reloaded.load('dutch', 'old')).title, old.title);
    assert.equal(await reloaded.load('europe', 'old'), null);
    await archive.saveHistory('dutch', [{ ...old, title: 'Updated jam' }]);
    const history = await archive.list();
    assert.equal(history.length, 2);
    assert.equal(history.find((event) => event.id === 'old').title, 'Updated jam');
    assert.equal(history.find((event) => event.id === 'removed').title, removed.title);
    await archive.save({ ...old, title: 'Latest individual details' });
    assert.equal((await archive.load('dutch', 'old')).title, 'Latest individual details');
    assert.equal(
        (await archive.list()).find((event) => event.id === 'old').title,
        'Latest individual details'
    );
    await archive.saveHistory('dutch', [{ ...old, title: 'Newest history details' }]);
    assert.equal((await archive.load('dutch', 'old')).title, 'Newest history details');
    const list = archive.list.bind(archive);
    archive.list = async () => {
        const events = await list();
        await archive.save({ ...old, id: 'concurrent', title: 'Concurrent save' });
        return events;
    };
    assert.equal((await archive.load('dutch', 'removed')).title, removed.title);
});
