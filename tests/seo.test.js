import test from 'node:test';
import assert from 'node:assert/strict';
import { SEO_PAGES, pageMetadata, sitemapXml } from '../src/lib/seo.js';
import { openGymDays } from '../src/lib/openGymSchedule.js';

test('main pages have distinct localized metadata and error pages are excluded from indexing', () => {
    for (const language of ['nl', 'en']) {
        const descriptions = Object.keys(SEO_PAGES).map((path) => {
            const metadata = pageMetadata(path, { language });
            assert.equal(metadata.canonical, `https://www.pkfr.nl${path}`);
            assert.ok(metadata.title && metadata.description);
            assert.equal(metadata.noindex, false);
            return metadata.description;
        });
        assert.equal(new Set(descriptions).size, descriptions.length);
    }
    assert.equal(pageMetadata('/missing', { status: 404 }).noindex, true);
    assert.equal(pageMetadata('/missing', { status: 404 }).canonical, null);
});

test('past jam metadata retains its canonical ID and makes the date and past status clear', () => {
    const event = {
        id: 'past123',
        title: 'Community jam',
        start: '2025-01-01',
        allDay: true,
        location: 'Utrecht',
        excerpt: 'Bring your friends.'
    };
    const metadata = pageMetadata('/jams/old-title--past123', { event, language: 'en' });
    assert.equal(metadata.canonical, 'https://www.pkfr.nl/jams/community-jam--past123');
    assert.match(metadata.title, /Past jam/);
    assert.match(metadata.description, /1 January 2025.*Utrecht/);
    assert.equal(metadata.noindex, false);
});

test('sitemap contains canonical main and detail URLs once and escapes XML metacharacters', () => {
    const xml = sitemapXml(['/', '/', '/jams/a--1', '/jams/archive?page=2&region=europe']);
    assert.equal((xml.match(/<url>/g) || []).length, 3);
    assert.match(xml, /https:\/\/www.pkfr.nl\/jams\/a--1/);
    assert.match(xml, /page=2&amp;region=europe/);
    assert.ok(!xml.includes('<lastmod>'));
});

test('seven-day navigation uses Dutch calendar dates across the autumn DST boundary', () => {
    const now = new Date('2026-10-24T22:30:00Z');
    const week = openGymDays(now, 7);
    assert.equal(week.length, 7);
    assert.equal(week[0].date, '2026-10-25');
    assert.equal(week.at(-1).date, '2026-10-31');
    assert.equal((Date.parse(week[0].end) - Date.parse(week[0].start)) / 3600000, 25);
    assert.equal(openGymDays(now, 7, 7)[0].date, '2026-11-01');
    assert.equal(openGymDays(now, 7, -7)[0].date, '2026-10-18');
});
