const gymList = [
    {
        name: 'Munki Motion Haarlem',
        address: 'Stephensonstraat 4, 2014 KD Haarlem',
        latitude: 52.371143939525204,
        longitude: 4.614806308763699,
        website: 'https://www.munkimotion.nl/freerunhal-haarlem/',
        images: [
            'images/gyms/munki-motion-haarlem-1.jpg',
        ]
    },
    {
        name: 'Munki Motion Velserbroek',
        address: 'Meubelmakerstraat 9A, 1991 JD Velserbroek',
        latitude: 52.43618130223771,
        longitude: 4.651948813336322,
        website: 'https://www.munkimotion.nl/freerunhal-velserbroek/',
        images: [
            'images/gyms/munki-motion-velserbroek-1.jpg',
        ]
    },
    {
        name: 'Aquila Tilburg Reeshof',
        address: 'Spaubeekstraat 97, 5035 JV Tilburg',
        latitude: 51.58094627983169,
        longitude: 4.974729197949388,
        website: 'https://aquilafreerun.nl/',
        images: [
        ]
    }
];

export function getGyms(latitude, longitude) {
    // sort by distance
    gymList.sort((a, b) => {
        const aDistance = Math.sqrt(Math.pow(a.latitude - latitude, 2) + Math.pow(a.longitude - longitude, 2));
        const bDistance = Math.sqrt(Math.pow(b.latitude - latitude, 2) + Math.pow(b.longitude - longitude, 2));
        return aDistance - bDistance;
    });
    return gymList;
}