import { isPastJam, jamDateRange, jamPath } from './jamEvents.js';

export const SITE_ORIGIN = 'https://www.pkfr.nl';
export const SEO_PAGES = {
    '/': {
        nl: [
            'Parkour & freerunning in Nederland',
            'Ontdek parkour en freerunning in Nederland: jams, open gyms, trainingsspots en handige tools voor de community.'
        ],
        en: [
            'Parkour & freerunning in the Netherlands',
            'Discover parkour and freerunning in the Netherlands: jams, open gyms, training spots and useful community tools.'
        ]
    },
    '/jams': {
        nl: [
            'Parkour jams & freerunning events in Nederland',
            'Bekijk aankomende parkour jams en freerunning events in Nederland. Vind datums, locaties en eventdetails en abonneer je op de volledige agenda.'
        ],
        en: [
            'Parkour jams & events in the Netherlands',
            'Find upcoming parkour jams and freerunning events in the Netherlands, with dates, locations, event details and calendar subscriptions.'
        ]
    },
    '/jams/europe': {
        nl: [
            'Parkour jams & freerunning events in Europa',
            'Ontdek aankomende parkour jams en freerunning events in Europa. Bekijk de datums, locaties en details van de internationale jamagenda.'
        ],
        en: [
            'European parkour jams & freerunning events',
            'Explore upcoming parkour jams and freerunning events across Europe, with dates, locations and details from the international jam calendar.'
        ]
    },
    '/jams/america': {
        nl: [
            'Amerikaanse parkour jams & freerunning events',
            'Bekijk de American Parkour jamagenda met aankomende parkour- en freerunningevents, datums, locaties en eventdetails.'
        ],
        en: [
            'American Parkour jams & freerunning events',
            'Browse upcoming parkour and freerunning events shared by American Parkour, with dates, locations and individual event details.'
        ]
    },
    '/jams/archive': {
        nl: [
            'Archief van parkour jams & freerunning events',
            'Bekijk bewaarde parkour jams en freerunning events uit Nederland, Europa en de American Parkour agenda, met oorspronkelijke datums en eventdetails.'
        ],
        en: [
            'Past parkour jams & freerunning events',
            'Browse saved past parkour jams and freerunning events from the Netherlands, Europe and the American Parkour calendar, with dates and event details.'
        ]
    },
    '/open-gyms': {
        nl: [
            'Freerun open gyms in Nederland — agenda & tijden',
            'Vind open gyms voor parkour en freerunning in Nederland. Bekijk de sessies van de komende zeven dagen, tijden en locaties en open de volledige agenda.'
        ],
        en: [
            'Freerun open gyms in the Netherlands — schedule',
            'Find parkour and freerunning open gyms in the Netherlands. Browse the next seven days of sessions, times and locations and subscribe to the calendar.'
        ]
    },
    '/spots': {
        nl: [
            'Parkour & freerunning spots in Nederland',
            'Vind parkour- en freerunningspots met kaarten van de community, spotapps en indoor trainingslocaties in Nederland.'
        ],
        en: [
            'Parkour & freerunning spots in the Netherlands',
            'Find parkour and freerunning spots through community maps, spot apps and indoor training locations in the Netherlands.'
        ]
    },
    '/links': {
        nl: [
            'Parkour community — clubs, merken & handige links',
            'Ontdek parkourclubs, freerunningmerken en handige websites uit de Nederlandse en internationale parkourcommunity.'
        ],
        en: [
            'Parkour community — clubs, brands & useful links',
            'Discover parkour clubs, freerunning brands and useful websites from the Dutch and international parkour community.'
        ]
    },
    '/tools': {
        nl: [
            'Parkour & freerunning tools — gyms, spots & sprongen',
            'Handige tools voor freerunners: vind indoor gyms, deel spotkaarten en vergelijk sprongafstanden.'
        ],
        en: [
            'Parkour & freerunning tools — gyms, spots & jumps',
            'Useful tools for freerunners: find indoor gyms, share spot maps and compare jump distances.'
        ]
    },
    '/tools/gym-finder': {
        nl: [
            'Freerun Gym Finder — indoor gyms in Nederland',
            'Vind indoor freerun gyms in Nederland. Bekijk foto’s, locaties en websites en sorteer gyms op afstand van jouw locatie.'
        ],
        en: [
            'Freerun Gym Finder — indoor gyms in the Netherlands',
            'Find indoor freerunning gyms in the Netherlands. Browse photos, locations and websites and sort gyms by distance from your location.'
        ]
    },
    '/tools/spot-map-finder': {
        nl: [
            'Parkour spotkaarten vinden & delen',
            'Vind en deel kaarten met parkour- en freerunningspots. Ontdek trainingslocaties verzameld door de community.'
        ],
        en: [
            'Find & share parkour spot maps',
            'Find and share maps of parkour and freerunning spots. Discover training locations collected by the community.'
        ]
    },
    '/tools/distance-converter': {
        nl: [
            'Sprongafstand omrekenen — parkour Distance Converter',
            'Reken sprongafstanden om tussen centimeters en schoenlengtes met de Distance Converter voor parkour en freerunning.'
        ],
        en: [
            'Jump distance converter for parkour & freerunning',
            'Convert jump distances between centimetres and shoe lengths with the parkour and freerunning Distance Converter.'
        ]
    }
};

export function pageMetadata(
    path,
    { event, now = Date.now(), status = 200, language = 'nl' } = {}
) {
    const lang = language === 'en' ? 'en' : 'nl';
    if (status >= 400)
        return {
            title: `${status === 404 ? (lang === 'en' ? 'Page not found' : 'Pagina niet gevonden') : lang === 'en' ? 'Temporarily unavailable' : 'Tijdelijk niet beschikbaar'} | pkfr.nl`,
            description: '',
            canonical: null,
            noindex: true
        };
    const [title, description] = (SEO_PAGES[path] || SEO_PAGES['/'])[lang];
    if (!event)
        return {
            title: `${title} | pkfr.nl`,
            description,
            canonical: `${SITE_ORIGIN}${path}`,
            noindex: false
        };
    const past = isPastJam(event, new Date(now));
    const label = past
        ? lang === 'en'
            ? 'Past jam'
            : 'Afgelopen jam'
        : lang === 'en'
          ? 'Parkour jam'
          : 'Parkourjam';
    const details = `${event.title} · ${jamDateRange(event, lang)}${event.location ? ` · ${event.location}` : ''}`;
    return {
        title: `${event.title} · ${label} | pkfr.nl`,
        description:
            `${past ? (lang === 'en' ? 'Past event. ' : 'Afgelopen event. ') : ''}${details}${event.excerpt ? ` — ${event.excerpt}` : ''}`.slice(
                0,
                160
            ),
        canonical: `${SITE_ORIGIN}${jamPath(event)}`,
        noindex: false
    };
}

export function sitemapXml(paths) {
    const escape = (value) =>
        value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&apos;');
    const urls = [...new Set(paths)]
        .sort()
        .map((path) => `<url><loc>${escape(`${SITE_ORIGIN}${path}`)}</loc></url>`)
        .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
