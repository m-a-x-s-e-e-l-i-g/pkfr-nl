import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';

const keyFor = (region, id) => `${region}/${createHash('sha256').update(id).digest('hex')}`;

export function createJamArchive(storeProvider) {
    const saved = new Map();
    const pending = new Map();
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
                    await storeProvider().setJSON(key, { event: snapshot });
                    saved.set(key, fingerprint);
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
        async load(region, id) {
            if (!storeProvider) return null;
            try {
                const record = await storeProvider().get(keyFor(region, id), { type: 'json' });
                return record?.event?.id === id && (record.event.region || 'dutch') === region
                    ? { ...record.event, archiveStored: true }
                    : null;
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
