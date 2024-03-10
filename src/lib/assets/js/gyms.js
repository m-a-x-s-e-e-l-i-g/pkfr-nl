const gymList = [
    {
        name: 'Munki Motion Haarlem',
        address: 'Stephensonstraat 4, 2014 KD Haarlem',
        latitude: 52.371143939525204,
        longitude: 4.614806308763699,
        website: 'https://www.munkimotion.nl/freerunhal-haarlem/',
        images: [
            'images/gyms/munki-motion/munki-motion-haarlem-1.jpg',
        ]
    },
    {
        name: 'Munki Motion Velserbroek',
        address: 'Meubelmakerstraat 9A, 1991 JD Velserbroek',
        latitude: 52.43618130223771,
        longitude: 4.651948813336322,
        website: 'https://www.munkimotion.nl/freerunhal-velserbroek/',
        images: [
            'images/gyms/munki-motion/munki-motion-velserbroek-1.jpg',
        ]
    },
    {
        name: 'Aquila Tilburg Reeshof',
        address: 'Spaubeekstraat 97, 5035 JV Tilburg',
        latitude: 51.58094627983169,
        longitude: 4.974729197949388,
        website: 'https://aquilafreerun.nl/',
        images: [
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-1.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-2.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-3.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-4.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-5.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-6.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-7.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-8.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-9.jpg',
            'images/gyms/aquila-tilburg-reeshof/aquila-tilburg-reeshof-10.jpg'
        ]
    }
];

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function getGyms(latitude, longitude, radius = 100) {
    // Calculate distance for each gym and filter by radius
    const filteredGyms = gymList.filter(gym => {
        gym.distance = calculateDistance(latitude, longitude, gym.latitude, gym.longitude);
        return gym.distance <= radius;
    });

    // Sort gyms by distance
    filteredGyms.sort((a, b) => a.distance - b.distance);

    return filteredGyms;
}