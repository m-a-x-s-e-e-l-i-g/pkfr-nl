import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';

const keyFor = (region, id) => `${region}/${createHash('sha256').update(id).digest('hex')}`;

export function createJamArchive(storeProvider) {
    const saved = new Map();
    const pending = new Map();
    let cachedList;
    let pendingList;
    return {
        async save(event) {
            if (!storeProvider) return false;
            const { archiveStored, ...snapshot } = event;
            const region = event.region || 'dutch';
            const key = keyFor(region, event.id);
            const fingerprint = JSON.stringify(snapshot);
            if (saved.get(key) === fingerprint) return true;
            if (pending.has(key)) {
                await pending.get(key);
                if (saved.get(key) === fingerprint) return true;
            }
            const request = (async () => {
                try {
                    await storeProvider().setJSON(key, {
                        event: snapshot,
                        savedAt: new Date().toISOString()
                    });
                    saved.set(key, fingerprint);
                    cachedList = null;
                    return true;
                } catch (err) {
                    console.error('Jam archive write failed', {
                        region,
                        id: event.id,
                        error: err.name
                    });
                    return false;
                }
            })();
            pending.set(key, request);
            try {
                return await request;
            } finally {
                pending.delete(key);
            }
        },
        async saveHistory(region, events) {
            if (!storeProvider || !events.length) return false;
            const snapshots = events
                .map(({ archiveStored, ...event }) => event)
                .sort((a, b) => a.id.localeCompare(b.id));
            const fingerprint = createHash('sha256')
                .update(JSON.stringify(snapshots))
                .digest('hex');
            const key = `_history/${region}/${fingerprint}`;
            if (saved.has(key)) return true;
            try {
                // Immutable batches preserve removed events without hundreds of writes
                // or a shared mutable index. Identical history needs no new snapshot.
                await storeProvider().setJSON(
                    key,
                    { events: snapshots, savedAt: new Date().toISOString() },
                    { onlyIfNew: true }
                );
                saved.set(key, fingerprint);
                cachedList = null;
                return true;
            } catch (err) {
                console.error('Jam history archive write failed', { region, error: err.name });
                return false;
            }
        },
        async list() {
            if (!storeProvider) return [];
            if (cachedList && cachedList.expires > Date.now()) return cachedList.events;
            if (pendingList) return pendingList;
            pendingList = (async () => {
                const store = storeProvider();
                const { blobs } = await store.list();
                const allRecords = [];
                // Bound concurrent reads; each event owns its own key, without a shared mutable index.
                for (let offset = 0; offset < blobs.length; offset += 12) {
                    const records = await Promise.all(
                        blobs
                            .slice(offset, offset + 12)
                            .map((blob) => store.get(blob.key, { type: 'json' }))
                    );
                    allRecords.push(...records.filter(Boolean));
                }
                const byId = new Map();
                const versions = new Map();
                allRecords.sort(
                    (a, b) => (Date.parse(a.savedAt) || 0) - (Date.parse(b.savedAt) || 0)
                );
                for (const record of allRecords) {
                    for (const event of record.events || (record.event ? [record.event] : [])) {
                        if (event?.id && event.start && event.title) {
                            versions.set(`${event.region || 'dutch'}:${event.id}`, {
                                savedAt: Date.parse(record.savedAt) || 0,
                                history: Boolean(record.events)
                            });
                            byId.set(`${event.region || 'dutch'}:${event.id}`, {
                                ...event,
                                archiveStored: true
                            });
                        }
                    }
                }
                const events = [...byId.values()];
                cachedList = { events, versions, expires: Date.now() + 300000 };
                return events;
            })();
            try {
                return await pendingList;
            } finally {
                pendingList = null;
            }
        },
        async load(region, id) {
            if (!storeProvider) return null;
            try {
                // Individual records are read through, even when another instance
                // has a warm overview cache. A newer history batch still takes precedence.
                const record = await storeProvider().get(keyFor(region, id), { type: 'json' });
                const historical = (await this.list()).find(
                    (event) => (event.region || 'dutch') === region && event.id === id
                );
                const version = cachedList?.versions.get(`${region}:${id}`);
                const savedAt = Date.parse(record?.savedAt) || 0;
                if (
                    record?.event?.id === id &&
                    (record.event.region || 'dutch') === region &&
                    (!version ||
                        savedAt > version.savedAt ||
                        (savedAt === version.savedAt && !version.history))
                )
                    return { ...record.event, archiveStored: true };
                return historical || null;
            } catch (err) {
                console.error('Jam archive read failed', { region, id, error: err.name });
                return null;
            }
        }
    };
}

const context =
    typeof __NETLIFY_DEPLOY_CONTEXT__ === 'string' ? __NETLIFY_DEPLOY_CONTEXT__ : 'local';
// Site-wide production storage survives deploys; previews use a separate store.
const archive = createJamArchive(
    context === 'local'
        ? null
        : () =>
              getStore({
                  name: `jam-events-${context}`,
                  consistency: 'strong'
              })
);

export async function preserveJam(event) {
    return { ...event, archiveStored: await archive.save(event) };
}

export function archivedJam(region, id) {
    return archive.load(region, id);
}

export function archivedJams() {
    return archive.list();
}

export async function preserveJamHistory(region, events) {
    const stored = await archive.saveHistory(region, events);
    return events.map((event) => ({ ...event, archiveStored: stored }));
}
