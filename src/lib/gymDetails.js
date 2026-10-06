import { gymList, calculateDistance } from './assets/js/gyms.js';

export const gymPath = (gym) => `/gyms/${gym.slug}`;
export const gymDescription = (gym, language = 'nl') =>
    gym.description[language === 'en' ? 'en' : 'nl'];
export const getGym = (slug) => gymList.find((gym) => gym.slug === slug);
export const gymMapUrl = (gym) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`;

export function nearbyGyms(gym, count = 3) {
    return gymList
        .filter((other) => other.slug !== gym.slug && !other.locationUnconfirmed)
        .map((other) => ({
            ...other,
            distance: calculateDistance(
                gym.latitude,
                gym.longitude,
                other.latitude,
                other.longitude
            )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, count);
}

const normalized = (value) =>
    String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

// Match the venue address, not a brand shared by several branches. Never assign a
// calendar event to a gym merely because its title contains the same city/brand.
export function openGymMatches(gym, event) {
    if (gym.locationUnconfirmed && gym.slug !== 'jump-freerun-zuid57') return false;
    const location = normalized(event.location);
    if (!location) return false;
    const streetAddress = gym.address.split(',')[0].trim();
    const parts = streetAddress.match(/^(.+?)\s+(\d+[a-z]?(?:\s*-\s*\d+)?)$/i);
    if (!parts) return false;
    const searchable = (value) =>
        String(value)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    const street = searchable(parts[1]).split(' ').join('\\s*');
    const number = searchable(parts[2]).split(' ').join('\\s*');
    const postcode = gym.address.match(/\b\d{4}\s*[a-z]{2}\b/i)?.[0];
    const regionalMatch =
        location.includes(normalized(gym.city)) ||
        (postcode && location.includes(normalized(postcode)));
    // Requiring the full house number avoids matching e.g. number 2 to number 20.
    const addressMatch = new RegExp(`\\b${street}\\s*${number}(?=\\s|$)`).test(
        searchable(event.location)
    );
    return Boolean(regionalMatch && addressMatch);
}

export function gymSessions(gym, days, now = Date.now()) {
    const seen = new Set();
    return days
        .flatMap((day) => day.events)
        .filter((event) => {
            if (
                seen.has(event.id) ||
                Date.parse(event.end || event.start) <= now ||
                !openGymMatches(gym, event)
            )
                return false;
            seen.add(event.id);
            return true;
        });
}

export function structuredGym(gym, origin, language = 'nl') {
    const url = `${origin}${gymPath(gym)}`;
    const address = gym.address.match(/^(.+?),\s*(?:(\d{4}\s*[A-Z]{2})\s+)?(.+)$/i);
    return {
        '@type': gym.locationUnconfirmed ? 'Place' : 'SportsActivityLocation',
        '@id': `${url}#gym`,
        name: gym.name,
        url,
        description: gymDescription(gym, language),
        image: gym.images.map((image) => `${origin}/${image}`),
        sameAs: gym.website,
        ...(!gym.locationUnconfirmed
            ? {
                  address: {
                      '@type': 'PostalAddress',
                      streetAddress: address?.[1] || gym.address,
                      addressLocality: gym.city,
                      addressCountry: 'NL',
                      ...(address?.[2] ? { postalCode: address[2] } : {})
                  },
                  geo: {
                      '@type': 'GeoCoordinates',
                      latitude: gym.latitude,
                      longitude: gym.longitude
                  },
                  hasMap: gymMapUrl(gym)
              }
            : {})
    };
}
