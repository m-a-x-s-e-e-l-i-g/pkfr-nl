import test from 'node:test';
import assert from 'node:assert/strict';
import { outboundUrl, OUTBOUND_UTM } from '../src/lib/outboundLinks.js';

test('external links carry referral tags while preserving destination parameters and fragments', () => {
    const original =
        'https://example.org/register?event=parkour%20jam&next=%2Fjoin%3Fage%3D18#tickets';
    const tagged = outboundUrl(original);
    const url = new URL(tagged);
    for (const [key, value] of Object.entries(OUTBOUND_UTM)) {
        assert.equal(url.searchParams.get(key), value);
        assert.equal(url.searchParams.getAll(key).length, 1);
    }
    assert.equal(url.searchParams.get('event'), 'parkour jam');
    assert.equal(url.searchParams.get('next'), '/join?age=18');
    assert.equal(url.hash, '#tickets');
    assert.equal(outboundUrl(tagged), tagged);
    assert.equal(new URL(outboundUrl('//example.org/gym')).protocol, 'https:');
});

test('existing campaign tags are preserved and only missing tags are added', () => {
    const original =
        'https://example.org/?utm_source=partner&utm_campaign=special&utm_content=banner';
    const url = new URL(outboundUrl(original));
    assert.equal(url.searchParams.get('utm_source'), 'partner');
    assert.equal(url.searchParams.get('utm_campaign'), 'special');
    assert.equal(url.searchParams.get('utm_content'), 'banner');
    assert.equal(url.searchParams.get('utm_medium'), 'referral');
});

test('internal routes, feeds, deep links and signed URLs remain unchanged', () => {
    for (const href of [
        '/gyms/munki-motion-haarlem',
        '#visit',
        '?week=1',
        'https://www.pkfr.nl/jams',
        'http://pkfr.nl/open-gyms',
        '//www.pkfr.nl/gyms/munki-motion-haarlem',
        'http://127.0.0.1:5189/jams',
        'webcal://www.pkfr.nl/api/jams/calendar.ics',
        'mailto:hello@example.org',
        'tel:+31123456789',
        'javascript:alert(1)',
        'https://',
        'https://calendar.google.com/calendar/ical/calendar/public/basic.ics?token=abc',
        'https://example.org/file?X-Amz-Signature=signed%20value',
        'https://example.org/file?signature=token',
        null,
        undefined
    ])
        assert.equal(outboundUrl(href, 'http://127.0.0.1:5189'), href);
});

test('maps, calendar navigation and community invites retain their functional parameters', () => {
    for (const href of [
        'https://www.google.com/maps/search/?api=1&query=Marconistraat%205%2C%20Alkmaar',
        'https://calendar.google.com/calendar/r?cid=webcal%3A%2F%2Fwww.pkfr.nl%2Fapi%2Fjams%2Fcalendar.ics',
        'https://www.google.com/calendar/event?eid=eventID&ctz=Europe%2FAmsterdam',
        'https://maps.app.goo.gl/4n4oQeJ4FysKAkcy5?g_st=ac',
        'https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8'
    ]) {
        const original = new URL(href);
        const tagged = new URL(outboundUrl(href));
        assert.equal(tagged.origin, original.origin);
        assert.equal(tagged.pathname, original.pathname);
        for (const [key, value] of original.searchParams)
            assert.equal(tagged.searchParams.get(key), value);
        assert.equal(tagged.searchParams.get('utm_source'), 'pkfr.nl');
    }
});
