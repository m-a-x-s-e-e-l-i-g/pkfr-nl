const gymList = [
    {
        name: 'Munki Motion Haarlem',
        address: 'Stephensonstraat 4, 2014 KD Haarlem',
        latitude: 52.371143939525204,
        longitude: 4.614806308763699,
        website: 'https://www.munkimotion.nl/freerunhal-haarlem/',
        images: ['images/gyms/munki-motion/munki-motion-haarlem-1.jpg']
    },
    {
        name: 'Munki Motion Velserbroek',
        address: 'Meubelmakerstraat 9A, 1991 JD Velserbroek',
        latitude: 52.43618130223771,
        longitude: 4.651948813336322,
        website: 'https://www.munkimotion.nl/freerunhal-velserbroek/',
        images: ['images/gyms/munki-motion/munki-motion-velserbroek-1.jpg']
    },
    {
        name: 'Munki Motion Zaandam',
        address: 'Noordervaldeurstraat 15, 1508 EK Zaandam',
        latitude: 52.45754085016276,
        longitude: 4.81590035531433,
        website: 'https://www.munkimotion.nl/freerunhal-zaandam/',
        images: ['images/gyms/munki-motion/munki-motion-zaandam-1.jpg']
    },
    {
        name: 'Munki Motion Alkmaar',
        address: 'Marconistraat 5, 1821 BX Alkmaar',
        latitude: 52.62616921056502,
        longitude: 4.766890486005982,
        website: 'https://www.munkimotion.nl/freerunhal-alkmaar/',
        images: [
            'images/gyms/munki-motion/munki-motion-alkmaar-1.jpg',
            'images/gyms/munki-motion/munki-motion-alkmaar-2.jpg'
        ]
    },
    {
        name: 'Munki Motion Castricum',
        address: 'Schulpstet 21, 1901 JH Castricum',
        latitude: 52.55980880555938,
        longitude: 4.66274531369486,
        website: 'https://www.munkimotion.nl/freerunhal-castricum/',
        images: ['images/gyms/munki-motion/munki-motion-castricum-1.jpg']
    },
    {
        name: 'Aquila Tilburg Reeshof',
        address: 'Spaubeekstraat 97, 5035 JV Tilburg',
        latitude: 51.58094627983169,
        longitude: 4.974729197949388,
        website: 'https://aquilafreerun.nl/',
        images: [
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-1.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-2.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-3.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-4.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-5.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-6.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-7.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-8.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-9.jpg',
            'images/gyms/aquila-freerun/aquila-tilburg-reeshof-10.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Amsterdam',
        address: 'Keienbergweg 29, 1101 EX Amsterdam',
        latitude: 52.30861761355552,
        longitude: 4.9366381,
        website: 'https://jumpfreerun.nl/amsterdam/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-amsterdam-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-amsterdam-2.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Zuid57',
        address: 'Zuidlarenstraat 57, 2544 AD Den Haag',
        latitude: 52.051998334553794,
        longitude: 4.269578226458709,
        website: 'https://jumpfreerun.nl/denhaag/',
        images: ['images/gyms/jump-freerun/jump-freerun-den-haag-zuid57-1.jpg']
    },
    {
        name: 'JUMP Freerun Ninja Academy',
        address: 'Zuidwoldestraat 40, 2545 CA Den Haag',
        latitude: 52.05274244255919,
        longitude: 4.266632468787963,
        website: 'https://jumpfreerun.nl/denhaag/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-2.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-3.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-4.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-5.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-6.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-7.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-8.jpg',
            'images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-9.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Haagse Sport Centrale',
        address: 'Johan Van Veenplein 12, Den Haag',
        latitude: 52.06213998437504,
        longitude: 4.313607111291565,
        website: 'https://jumpfreerun.nl/denhaag/',
        images: ['images/gyms/jump-freerun/jump-freerun-den-haag-haagse-sport-centrale-1.jpg']
    },
    {
        name: 'JUMP Freerun De Bilt',
        address: 'Ambachtstraat 17, 3732 CN De Bilt',
        latitude: 52.1095740199027,
        longitude: 5.18456774602476,
        website: 'https://jumpfreerun.nl/de-bilt/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-de-bilt-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-de-bilt-2.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Heerenveen',
        address: 'Jousterweg 42a, 8447 RH Heerenveen',
        latitude: 52.963563682396995,
        longitude: 5.899708011646034,
        website: 'https://jumpfreerun.nl/heerenveen/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-heerenveen-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-heerenveen-2.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Houten',
        address: 'Lange Schaft 9b, 3991 AP Houten',
        latitude: 52.02066453892232,
        longitude: 5.169738682420904,
        website: 'https://jumpfreerun.nl/houten/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-houten-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-houten-2.jpg',
            'images/gyms/jump-freerun/jump-freerun-houten-3.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Leeuwarden',
        address: 'Noordvliet 375, 8921 HH Leeuwarden',
        latitude: 53.20323539521943,
        longitude: 5.812432313493811,
        website: 'https://jumpfreerun.nl/leeuwarden/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-leeuwarden-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-leeuwarden-2.jpg',
            'images/gyms/jump-freerun/jump-freerun-leeuwarden-3.jpg'
        ]
    },
    {
        name: 'JUMP Freerun Uithoorn',
        address: 'J.A. van Seumerenlaan 1, 1422 XS Uithoorn',
        latitude: 52.23706315765284,
        longitude: 4.840041961366346,
        website: 'https://jumpfreerun.nl/uithoorn/',
        images: [
            'images/gyms/jump-freerun/jump-freerun-uithoorn-1.jpg',
            'images/gyms/jump-freerun/jump-freerun-uithoorn-2.jpg'
        ]
    },
    {
        name: 'Urban-Inside Waddinxveen',
        address: 'Staringlaan 17F, 2741 GC Waddinxveen',
        latitude: 52.056495920936,
        longitude: 4.659323055294357,
        website: 'http://www.urban-inside.nl/',
        images: [
            'images/gyms/urban-inside/urban-inside-waddinxveen-1.jpg',
            'images/gyms/urban-inside/urban-inside-waddinxveen-2.jpg',
            'images/gyms/urban-inside/urban-inside-waddinxveen-3.jpg'
        ]
    },
    {
        name: 'Urban-Inside Gouda',
        address: 'Antwerpseweg 9, 2803 PB Gouda',
        latitude: 52.020738189192414,
        longitude: 4.684936034146543,
        website: 'http://www.urban-inside.nl/',
        images: [
            'images/gyms/urban-inside/urban-inside-gouda-1.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-2.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-3.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-4.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-5.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-6.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-7.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-8.jpg',
            'images/gyms/urban-inside/urban-inside-gouda-9.jpg'
        ]
    },
    {
        name: 'Commit 040',
        address: 'Professor Horowitzstraat 200, 5651 GW Eindhoven',
        latitude: 51.445138996788245,
        longitude: 5.45835352642871,
        website: 'http://www.commit040.nl/',
        images: [
            'images/gyms/commit/commit-040-eindhoven-1.jpg',
            'images/gyms/commit/commit-040-eindhoven-2.jpg'
        ]
    },
    {
        name: 'Area 51 Skatepark',
        address: 'Ketelhuisplein 18, 5617 AE Eindhoven',
        latitude: 51.448132624557076,
        longitude: 5.455997397743182,
        website: 'https://www.area51eindhoven.nl/',
        images: [
            'images/gyms/commit/area51-eindhoven-1.jpg',
            'images/gyms/commit/area51-eindhoven-2.jpg',
            'images/gyms/commit/area51-eindhoven-3.jpg',
            'images/gyms/commit/area51-eindhoven-4.jpg'
        ]
    },
    {
        name: 'Adaptive Movement',
        address: 'Industrieweg 12B, 6662 PA Elst',
        latitude: 51.91101718575066,
        longitude: 5.856515512957941,
        website: 'https://www.adaptivemovement.nl/',
        images: [
            'images/gyms/adaptive-movement/adaptive-movement-elst-1.jpg',
            'images/gyms/adaptive-movement/adaptive-movement-elst-2.jpg'
        ]
    },
    {
        name: 'VROG',
        address: 'Mr. Visserplein 7, 1011 RD Amsterdam',
        latitude: 52.36801159554354,
        longitude: 4.904651540045059,
        website: 'http://www.vrog.nl/',
        images: [
            'images/gyms/vrog/vrog-amsterdam-1.jpg',
            'images/gyms/vrog/vrog-amsterdam-2.jpg',
            'images/gyms/vrog/vrog-amsterdam-3.jpg',
            'images/gyms/vrog/vrog-amsterdam-4.jpg',
            'images/gyms/vrog/vrog-amsterdam-5.jpg',
            'images/gyms/vrog/vrog-amsterdam-6.jpg'
        ]
    },
    {
        name: 'Flexbeweging',
        address: 'Doctor Bosstraat 46, 9645 JJ Veendam',
        latitude: 53.112112312284246,
        longitude: 6.884084913093284,
        website: 'https://www.flexbeweging.nl/',
        images: ['images/gyms/flexbeweging/flexbeweging-veendam-1.jpg']
    },
    {
        name: 'Rush World Rotterdam West',
        address: 'Schiehaven 15b, 3024 EC Rotterdam',
        latitude: 51.90249838599861,
        longitude: 4.4509717553642805,
        website: 'https://www.rushworld.nl/',
        images: [
            'images/gyms/rush-world/rush-world-rotterdam-west-1.jpg',
            'images/gyms/rush-world/rush-world-rotterdam-west-2.jpg'
        ]
    },
    {
        name: 'Rush World Rotterdam Zuid',
        address: 'Koperslagerstraat 10, 3077 MD Rotterdam',
        latitude: 51.89936227551222,
        longitude: 4.516746241870258,
        website: 'https://www.rushworld.nl/',
        images: [
            'images/gyms/rush-world/rush-world-rotterdam-zuid-1.jpg',
            'images/gyms/rush-world/rush-world-rotterdam-zuid-2.jpg'
        ]
    },
    {
        name: 'Rush World Barendrecht',
        address: 'Spoorlaan 38, 2991 LD Barendrecht',
        latitude: 51.85739685304908,
        longitude: 4.554324531196638,
        website: 'https://www.rushworld.nl/',
        images: [
            'images/gyms/rush-world/rush-world-barendrecht-1.jpg',
            'images/gyms/rush-world/rush-world-barendrecht-2.jpg',
            'images/gyms/rush-world/rush-world-barendrecht-3.jpg'
        ]
    },
    {
        name: 'Rooftop Kingdom',
        address: 'Nederhage 10, 3191 XB Hoogvliet Rotterdam',
        latitude: 51.86139931902219,
        longitude: 4.354791318821064,
        website: 'http://www.rooftopkings.nl/',
        images: ['images/gyms/rooftop-kings/rooftop-kingdom-hoogvliet-rotterdam-1.jpg']
    },
    {
        name: 'Gymworld Freerun Academy',
        address: 'Amerikaweg 135, 2717 AV Zoetermeer',
        latitude: 52.064044297880805,
        longitude: 4.466714355371986,
        website: 'https://www.parkourdisciplines.com/',
        images: [
            'images/gyms/parkour-disciplines/gymworld-freerun-academy-zoetermeer-1.jpg',
            'images/gyms/parkour-disciplines/gymworld-freerun-academy-zoetermeer-2.jpg',
            'images/gyms/parkour-disciplines/gymworld-freerun-academy-zoetermeer-3.jpg',
            'images/gyms/parkour-disciplines/gymworld-freerun-academy-zoetermeer-4.jpg'
        ]
    },
    {
        name: 'Roots Underground Academy',
        address: 'Onderlangs 25, Zoetermeer',
        latitude: 52.06154672321714,
        longitude: 4.490180157219515,
        website: 'https://www.parkourdisciplines.com/',
        images: ['images/gyms/parkour-disciplines/roots-underground-academy-zoetermeer-1.jpg']
    },
    {
        name: 'Play Freerun Academy',
        address: 'Lopsenstraat 2, 2321 GL Leiden',
        latitude: 52.16858617968449,
        longitude: 4.477435735124727,
        website: 'https://www.parkourdisciplines.com/',
        images: [
            'images/gyms/parkour-disciplines/play-freerun-academy-leiden-1.jpg',
            'images/gyms/parkour-disciplines/play-freerun-academy-leiden-2.jpg'
        ]
    },
    {
        name: 'Hero Freerun Academy',
        address: 'Kalkovenweg 7, 2401 LJ Alphen aan den Rijn',
        latitude: 52.14895637214106,
        longitude: 4.6487440553760635,
        website: 'https://www.parkourdisciplines.com/',
        images: [
            'images/gyms/parkour-disciplines/hero-freerun-academy-alphen-aan-den-rijn-1.jpg',
            'images/gyms/parkour-disciplines/hero-freerun-academy-alphen-aan-den-rijn-2.jpg'
        ]
    },
    {
        name: 'TheSpot',
        address: 'Koningsweg 27 - 2, 9731 AP Groningen',
        latitude: 53.2275316206207,
        longitude: 6.6076608555751495,
        website: 'https://thespotgroningen.nl/',
        images: [
            'images/gyms/achieve-body-control/thespot-groningen-1.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-2.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-3.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-4.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-5.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-6.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-7.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-8.jpg',
            'images/gyms/achieve-body-control/thespot-groningen-9.jpg'
        ]
    },
    {
        name: 'Progression Academy Purmerend',
        address: 'Flevostraat 166, 1442 PZ Purmerend',
        latitude: 52.51831828503364,
        longitude: 4.982102594853558,
        website: 'https://progression-academy.nl/',
        images: [
            'images/gyms/progression-academy/progression-academy-purmerend-1.jpg',
            'images/gyms/progression-academy/progression-academy-purmerend-2.jpg',
            'images/gyms/progression-academy/progression-academy-purmerend-3.jpg',
            'images/gyms/progression-academy/progression-academy-purmerend-4.jpg',
            'images/gyms/progression-academy/progression-academy-purmerend-5.jpg'
        ]
    },
    {
        name: 'Minded Motion',
        address: 'Garnizoenweg 17, 5928 NA Venlo',
        latitude: 51.37392374720662,
        longitude: 6.157620937570812,
        website: 'https://mindedmotion.com/',
        images: [
            'images/gyms/minded-motion/minded-motion-1.jpg',
            'images/gyms/minded-motion/minded-motion-2.jpg',
            'images/gyms/minded-motion/minded-motion-3.jpg',
            'images/gyms/minded-motion/minded-motion-4.jpg',
            'images/gyms/minded-motion/minded-motion-5.jpg'
        ]
    },
    {
        name: 'Elevation Freerun',
        address: 'Hoge Bothofstraat 49, 7511 ZA Enschede',
        latitude: 52.223019393034356,
        longitude: 6.904051184179774,
        website: 'https://www.elevationfreerun.com/',
        images: [
            'images/gyms/elevation-freerun/elevation-freerun-1.jpeg'
        ]
    }
];

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function getGyms(latitude, longitude) {
    // loop through the gymList and calculate the distance
    const filteredGyms = gymList.map((gym) => ({
        ...gym,
        distance: calculateDistance(latitude, longitude, gym.latitude, gym.longitude)
    }));

    // Sort gyms by distance
    filteredGyms.sort((a, b) => a.distance - b.distance);

    return filteredGyms;
}
