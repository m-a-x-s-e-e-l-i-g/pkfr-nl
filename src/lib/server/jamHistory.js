import { archivedJams } from './jamArchive.js';
import { loadPastDutchJams } from './jamEvents.js';
import { loadPastInternationalJams } from './internationalJams.js';
import { isPastJam } from '../jamEvents.js';

export async function loadJamHistory(fetch, region = 'all') {
    const regions = region === 'all' ? ['dutch', 'europe', 'america'] : [region];
    const results = await Promise.allSettled([
        archivedJams(),
        ...regions.map((source) =>
            source === 'dutch' ? loadPastDutchJams() : loadPastInternationalJams(source, fetch)
        )
    ]);
    const byId = new Map();
    // Live history overrides older saved versions; saved-only events remain discoverable.
    for (const result of results) {
        if (result.status !== 'fulfilled') continue;
        for (const event of result.value) {
            const eventRegion = event.region || 'dutch';
            if (regions.includes(eventRegion) && isPastJam(event))
                byId.set(`${eventRegion}:${event.id}`, event);
        }
    }
    const unavailableSources = results.flatMap((result, index) =>
        result.status === 'rejected' ? [index ? regions[index - 1] : 'saved'] : []
    );
    return {
        events: [...byId.values()].sort(
            (a, b) => Date.parse(b.start) - Date.parse(a.start) || a.id.localeCompare(b.id)
        ),
        unavailableSources
    };
}
