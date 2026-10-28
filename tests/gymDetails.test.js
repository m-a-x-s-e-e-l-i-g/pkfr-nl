import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { gymList, getGyms } from '../src/lib/assets/js/gyms.js';
import {
    getGym,
    gymPath,
    gymSessions,
    openGymMatches,
    structuredGym
} from '../src/lib/gymDetails.js';
import { pageMetadata, SITE_ORIGIN } from '../src/lib/seo.js';
import { structuredPage } from '../src/lib/eventData.js';

test('all 34 gyms have unique permanent routes, bilingual source summaries and existing photos', () => {
    assert.equal(gymList.length, 34);
    assert.equal(new Set(gymList.map(gymPath)).size, 34);
    for (const gym of gymList) {
        assert.match(gym.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        assert.equal(getGym(gym.slug), gym);
        assert.ok(gym.description.nl && gym.description.en && gym.city);
        assert.ok(gym.sources.length && gym.reviewedAt);
        for (const source of gym.sources) assert.equal(new URL(source).protocol, 'https:');
        for (const photo of gym.images) assert.ok(existsSync(`static/${photo}`), photo);
        const metadata = pageMetadata(gymPath(gym), { gym });
        assert.ok(metadata.title.includes(gym.city));
        assert.equal(metadata.canonical, `${SITE_ORIGIN}${gymPath(gym)}`);
        assert.equal(metadata.image, `${SITE_ORIGIN}/${gym.images[0]}`);
        const graph = structuredPage(metadata, { gym })['@graph'];
        assert.ok(graph.find((item) => item['@type'] === 'BreadcrumbList'));
        assert.ok(graph.find((item) => item['@type'] === 'WebPage').mainEntity);
    }
    assert.equal(getGym('not-a-gym'), undefined);
    assert.ok(getGyms().every((gym) => gym.distance === null));
    assert.ok(getGyms(52.37, 4.61).every((gym) => Number.isFinite(gym.distance)));
});

test('calendar venue matches handle real source spelling, order and multiple branches', () => {
    const fixtures = [
        [
            'jump-freerun-haagse-sport-centrale',
            'Johan Van Veenplein 12, 2521 Den Haag, Netherlands'
        ],
        ['adaptive-movement-elst', 'Industrieweg 12b, 6662 Elst, Netherlands'],
        [
            'progression-academy-purmerend',
            'Progression Academy B.V., Flevostraat 166, Flevostraat 168, 1442 PZ Purmerend, Netherlands'
        ],
        ['munki-motion-velserbroek', 'Velserbroek, 1991 JD Meubelmakerstraat 9a'],
        ['thespot-groningen', 'TheSpot, Koningsweg 27 - 2, 9731 AP Groningen, Netherlands'],
        [
            'rush-world-rotterdam-zuid',
            'RUSH World Rotterdam-Zuid, Koperslagerstraat 10, 3077 MD Rotterdam, Netherlands'
        ],
        ['jump-freerun-zuid57', 'Zuidlarenstraat 57, 2544 AD Den Haag, Netherlands']
    ];
    for (const [slug, location] of fixtures) {
        const matched = gymList.filter((gym) =>
            openGymMatches(gym, { title: 'Open gym', location })
        );
        assert.deepEqual(
            matched.map((gym) => gym.slug),
            [slug]
        );
    }
    const gym = getGym('rush-world-rotterdam-zuid');
    for (const location of [
        '',
        'Rotterdam',
        'Koperslagerstraat 100, Rotterdam',
        'Koperslagerstraat 10, Amsterdam'
    ]) {
        assert.equal(openGymMatches(gym, { title: 'Rush World', location }), false);
    }
    assert.equal(
        openGymMatches(getGym('roots-underground-academy-zoetermeer'), {
            location: 'Onderlangs 25, Zoetermeer'
        }),
        false
    );
});

test('sessions exclude finished events, deduplicate overnight instances and keep ongoing sessions', () => {
    const gym = getGym('munki-motion-haarlem');
    const location = 'Stephensonstraat 4, 2014 KD Haarlem';
    const event = {
        id: 'same-event',
        title: 'Munki Haarlem',
        location,
        start: '2026-10-08T19:00:00Z',
        end: '2026-10-08T21:00:00Z'
    };
    const days = [
        {
            events: [
                event,
                { ...event, id: 'finished', end: '2026-10-06T21:00:00Z' },
                { ...event, id: 'wrong-branch', location: 'Marconistraat 5, Alkmaar' }
            ]
        },
        { events: [event] }
    ];
    assert.deepEqual(
        gymSessions(gym, days, Date.parse('2026-10-08T20:00:00Z')).map((e) => e.id),
        ['same-event']
    );
});

test('uncertain indoor locations retain pages without claiming their old address or hours in schema', () => {
    for (const slug of ['jump-freerun-zuid57', 'roots-underground-academy-zoetermeer']) {
        const schema = structuredGym(getGym(slug), SITE_ORIGIN);
        assert.equal(schema['@type'], 'Place');
        assert.equal(schema.geo, undefined);
        assert.equal(schema.address, undefined);
        assert.equal(schema.openingHours, undefined);
    }
    const schema = structuredGym(getGym('play-freerun-academy-leiden'), SITE_ORIGIN);
    assert.equal(schema.address.postalCode, '2312 ZZ');
    assert.equal(schema.address.addressLocality, 'Leiden');
    const collection = structuredPage(pageMetadata('/tools/gym-finder'), { gyms: gymList })[
        '@graph'
    ];
    assert.equal(collection.find((item) => item['@type'] === 'ItemList').numberOfItems, 34);
});
