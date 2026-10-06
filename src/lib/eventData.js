import { JAM_TIME_ZONE, jamInstant, jamPath, lastEventDate } from './jamEvents.js';
import { SITE_ORIGIN } from './seo.js';

export const DUTCH_CALENDAR_DESCRIPTION =
    'Community-maintained calendar of parkour jams and freerunning events in the Netherlands, curated by pkfr.nl from community submissions and event information.';

function eventDate(event, value) {
    if (event.allDay) return value.slice(0, 10);
    if (event.region && event.timeZone === 'UTC') {
        // A Z marker can represent a source-local wall clock, rather than UTC.
        return event.sourceTimeZone
            ? new Date(jamInstant(event, value)).toISOString()
            : value.replace(/Z$/, '');
    }
    return value;
}

export function structuredEvent(event) {
    const url = `${SITE_ORIGIN}${jamPath(event)}`;
    return {
        '@type': 'Event',
        '@id': `${url}#event`,
        name: event.title,
        url,
        startDate: eventDate(event, event.start),
        ...(event.end
            ? { endDate: eventDate(event, event.allDay ? lastEventDate(event) : event.end) }
            : {}),
        ...(event.descriptionText ? { description: event.descriptionText } : {}),
        ...(event.location ? { location: { '@type': 'Place', name: event.location } } : {}),
        ...(event.url || event.calendarUrl ? { sameAs: event.url || event.calendarUrl } : {})
    };
}

export function structuredPage(metadata, { event, events, path, language = 'nl' } = {}) {
    const publisher = `${SITE_ORIGIN}/#publisher`;
    const website = `${SITE_ORIGIN}/#website`;
    const graph = [
        {
            '@type': 'Organization',
            '@id': publisher,
            name: 'pkfr.nl',
            url: `${SITE_ORIGIN}/`,
            description: 'Parkour & freerunning community resource in the Netherlands.'
        },
        {
            '@type': 'WebSite',
            '@id': website,
            url: `${SITE_ORIGIN}/`,
            name: 'pkfr.nl',
            publisher: { '@id': publisher },
            creator: { '@type': 'Person', name: 'Max Seelig', url: 'https://maxmade.nl/' },
            inLanguage: ['nl', 'en']
        }
    ];
    const page = {
        '@type': Array.isArray(events) && path?.startsWith('/jams') ? 'CollectionPage' : 'WebPage',
        '@id': `${metadata.canonical}#webpage`,
        url: metadata.canonical,
        name: metadata.title,
        description: metadata.description,
        inLanguage: language === 'en' ? 'en' : 'nl',
        isPartOf: { '@id': website }
    };
    if (event) {
        const detail = structuredEvent(event);
        graph.push(detail);
        page.mainEntity = { '@id': detail['@id'] };
    } else if (Array.isArray(events) && path?.startsWith('/jams')) {
        const listId = `${metadata.canonical}#events`;
        graph.push({
            '@type': 'ItemList',
            '@id': listId,
            numberOfItems: events.length,
            itemListElement: events.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: structuredEvent(item)
            }))
        });
        page.mainEntity = { '@id': listId };
        if (path === '/jams') {
            graph.push({
                '@type': 'Dataset',
                '@id': `${SITE_ORIGIN}/#dutch-calendar`,
                name: 'Dutch parkour & freerunning event calendar',
                description: DUTCH_CALENDAR_DESCRIPTION,
                url: `${SITE_ORIGIN}/jams`,
                creator: { '@id': publisher },
                spatialCoverage: { '@type': 'Place', name: 'Netherlands' },
                distribution: [
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'application/json',
                        contentUrl: `${SITE_ORIGIN}/api/jams`
                    },
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'text/markdown',
                        contentUrl: `${SITE_ORIGIN}/jams.md`
                    }
                ]
            });
            page.about = { '@id': `${SITE_ORIGIN}/#dutch-calendar` };
        }
    }
    graph.push(page);
    return { '@context': 'https://schema.org', '@graph': graph };
}

// Source text may contain a literal </script> after HTML entity decoding.
export function safeJsonLd(value) {
    return JSON.stringify(value)
        .replaceAll('<', '\\u003c')
        .replaceAll('>', '\\u003e')
        .replaceAll('\u2028', '\\u2028')
        .replaceAll('\u2029', '\\u2029');
}

export function jamData({ events, retrievedAt }) {
    return {
        schemaVersion: 1,
        calendar: {
            name: 'pkfr.nl — Nederlandse parkour- en freerunagenda',
            url: `${SITE_ORIGIN}/jams`,
            description: DUTCH_CALENDAR_DESCRIPTION,
            timeZone: JAM_TIME_ZONE,
            scope: 'Current and upcoming published events; recurring events expanded up to five years ahead.',
            dateConvention:
                'All-day startDate and endDate are inclusive dates. Timed dates include their source UTC offset.',
            freshness:
                'retrievedAt is the source retrieval time, not the last edit time of an event. The source is cached for five minutes.',
            textUrl: `${SITE_ORIGIN}/jams.md`
        },
        retrievedAt,
        count: events.length,
        events: events.map((event) => ({ ...structuredEvent(event), allDay: event.allDay }))
    };
}

const markdownText = (value) =>
    String(value)
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
        .replace(/[\\`*_{}[\]()#+!|<>]/g, '\\$&');

export function jamMarkdown(agenda) {
    const data = jamData(agenda);
    const lines = [
        '# pkfr.nl — Parkour- en freerunagenda Nederland',
        '',
        '> De communityagenda voor parkour jams en freerunning events in Nederland.',
        '',
        DUTCH_CALENDAR_DESCRIPTION,
        '',
        `Agenda: ${data.calendar.url}`,
        `Bron opgehaald / source retrieved at: ${data.retrievedAt}`,
        `Tijdzone / time zone: ${JAM_TIME_ZONE}. Timed ISO dates include their UTC offset. All-day end dates below are inclusive.`,
        'This feed contains current and upcoming published events, up to five years ahead. Source data is cached for five minutes. Retrieval time is not an event edit time.',
        'Maintained by Max Seelig with contributions from the Dutch parkour community. Event descriptions come from the calendar; confirm participation requirements with the organizer.',
        '',
        `JSON: ${SITE_ORIGIN}/api/jams`,
        `Past events: ${SITE_ORIGIN}/jams/archive`,
        `Submit an event or correction: ${SITE_ORIGIN}/jams#submit-jam`,
        '',
        `## Events (${data.count})`
    ];
    if (!data.count)
        lines.push('', 'No current or upcoming events are published in this snapshot.');
    for (const event of data.events) {
        lines.push(
            '',
            `### ${markdownText(event.name).replace(/\s+/g, ' ')}`,
            '',
            `- Event page: ${event.url}`,
            `- Start: ${event.startDate}${event.allDay ? ' (all day)' : ''}`,
            ...(event.endDate
                ? [`- End: ${event.endDate}${event.allDay ? ' (inclusive, all day)' : ''}`]
                : []),
            `- Location: ${event.location ? markdownText(event.location.name).replace(/\s+/g, ' ') : 'Not specified in the source'}`,
            ...(event.sameAs ? [`- Original source: ${event.sameAs}`] : [])
        );
        if (event.description)
            lines.push(
                '',
                'Source-provided description:',
                '',
                ...markdownText(event.description)
                    .split(/\r?\n/)
                    .map((line) => `> ${line}`)
            );
    }
    return `${lines.join('\n')}\n`;
}
