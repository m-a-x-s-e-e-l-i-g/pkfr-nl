// Editorial summaries of the linked official websites. Keep slugs stable when names change.
// Photos and coordinates remain in assets/js/gyms.js; do not copy third-party media.
const profile = (slug, city, nl, en, features, website, extra = {}) => ({
    slug,
    city,
    description: { nl, en },
    features,
    website,
    sources: [website],
    reviewedAt: '2026-10-07',
    ...extra
});

export const gymProfiles = {
    'Munki Motion Haarlem': profile(
        'munki-motion-haarlem',
        'Haarlem',
        'Een speciaal ingerichte freerunhal aan de Stephensonstraat, met schuine muren, stangen en een foampit. Munki biedt hier lessen, proeflessen, kinderfeestjes en open gyms aan.',
        'A purpose-built freerun gym on Stephensonstraat with angled walls, bars and a foam pit. Munki offers classes, trial lessons, birthday parties and open gyms here.',
        ['lessons', 'openGym', 'foamPit', 'parties'],
        'https://www.munkimotion.nl/freerunhal-haarlem/'
    ),
    'Munki Motion Velserbroek': profile(
        'munki-motion-velserbroek',
        'Velserbroek',
        'Freerunhal aan de Meubelmakerstraat met obstakels, stangen en zachte landingsmaterialen. Je kunt bij Munki terecht voor begeleide lessen, een proefles en vrij trainen.',
        'A freerun gym on Meubelmakerstraat with obstacles, bars and soft landing equipment. Munki offers coached classes, trial lessons and free training.',
        ['lessons', 'openGym', 'parties'],
        'https://www.munkimotion.nl/freerunhal-velserbroek/'
    ),
    'Munki Motion Zaandam': profile(
        'munki-motion-zaandam',
        'Zaandam',
        'Aan de Noordervaldeurstraat heeft Munki een freerunhal met schuine muren, stangen en een foampit. Er zijn vaste lessen, proeflessen en momenten om zelf te trainen.',
        'Munki’s gym on Noordervaldeurstraat has angled walls, bars and a foam pit. It offers regular classes, trial lessons and opportunities to train independently.',
        ['lessons', 'openGym', 'foamPit', 'parties'],
        'https://www.munkimotion.nl/freerunhal-zaandam/'
    ),
    'Munki Motion Alkmaar': profile(
        'munki-motion-alkmaar',
        'Alkmaar',
        'Munki’s hal aan de Marconistraat in Oudorp heeft obstakels, stangen en een airbag om nieuwe salto’s te oefenen. De locatie biedt lessen en open gyms.',
        'Munki’s gym on Marconistraat in Oudorp has obstacles, bars and an airbag for practising new flips. The location offers classes and open gyms.',
        ['lessons', 'openGym', 'airbag', 'parties'],
        'https://www.munkimotion.nl/freerunhal-alkmaar/'
    ),
    'Munki Motion Castricum': profile(
        'munki-motion-castricum',
        'Castricum',
        'Freerunnen bij Munki aan de Schulpstet: oefenen op obstakels en stangen, met zachte matten voor landingen. Het aanbod bestaat uit lessen, proeflessen en vrij trainen.',
        'Train at Munki on Schulpstet using obstacles, bars and soft landing mats. The programme includes classes, trial lessons and free training.',
        ['lessons', 'openGym', 'parties'],
        'https://www.munkimotion.nl/freerunhal-castricum/'
    ),
    'Aquila Tilburg Reeshof': profile(
        'aquila-tilburg-reeshof',
        'Tilburg',
        'Aquila’s freerunhal in de Reeshof is speciaal gebouwd voor freerunning. De hal heeft een foampit, airtracks en een modulaire opstelling. Er zijn leeftijdsgroepen en open trainingen.',
        'Aquila’s Reeshof gym was built for freerunning. It has a foam pit, airtracks and modular obstacles, with classes organised by age and open training sessions.',
        ['lessons', 'openGym', 'foamPit', 'airtrack'],
        'https://aquilafreerun.nl/freerun-hal/',
        { sources: ['https://aquilafreerun.nl/freerun-hal/', 'https://aquilafreerun.nl/'] }
    ),
    'JUMP Freerun Amsterdam': profile(
        'jump-freerun-amsterdam',
        'Amsterdam',
        'JUMP’s freerunlocatie aan de Keienbergweg biedt lessen, proeflessen, vrij trainen en freerunfeestjes. De trainingen richten zich op technieken, creativiteit en persoonlijke ontwikkeling.',
        'JUMP’s location on Keienbergweg offers classes, trial lessons, free training and freerun parties. Training focuses on technique, creativity and personal development.',
        ['lessons', 'openGym', 'parties'],
        'https://jumpfreerun.nl/amsterdam/'
    ),
    'JUMP Freerun Zuid57': profile(
        'jump-freerun-zuid57',
        'Den Haag',
        'Zuid57 is de JUMP-locatie aan de Zuidlarenstraat in onze Gym Finder. De communityagenda bevat open gyms voor deze locatie.',
        'Zuid57 is the JUMP location on Zuidlarenstraat in our Gym Finder. The community calendar contains open gyms for this location.',
        [],
        'https://jumpfreerun.nl/denhaag/',
        {
            locationUnconfirmed: true,
            note: {
                nl: 'Zuid57 staat niet in JUMP’s huidige vestigingenoverzicht. Onze agenda bevat wel sessies op dit adres. Bevestig de locatie en toegang bij JUMP voordat je gaat.',
                en: 'Zuid57 is absent from JUMP’s current location list, while our calendar still contains sessions at this address. Confirm the location and access with JUMP before visiting.'
            },
            sources: ['https://jumpfreerun.nl/denhaag/vestigingen/']
        }
    ),
    'JUMP Freerun Ninja Academy': profile(
        'jump-freerun-ninja-academy',
        'Den Haag',
        'JUMP’s vestiging aan de Zuidwoldestraat in Den Haag, bekend als Ninja Academy. Via JUMP vind je het lesrooster en informatie over freerunning en vrij trainen.',
        'JUMP’s gym on Zuidwoldestraat in Den Haag, known as Ninja Academy. JUMP’s website provides class schedules and information about freerunning and free training.',
        ['lessons'],
        'https://jumpfreerun.nl/denhaag/',
        { sources: ['https://jumpfreerun.nl/denhaag/vestigingen/'] }
    ),
    'JUMP Freerun Haagse Sport Centrale': profile(
        'jump-freerun-haagse-sport-centrale',
        'Den Haag',
        'JUMP geeft freerunlessen in de Haagse Sport Centrale aan het Johan van Veenplein. Het officiële vestigingenoverzicht verwijst naar het rooster van deze locatie.',
        'JUMP teaches freerunning at Haagse Sport Centrale on Johan van Veenplein. Its official location list links to this venue’s class schedule.',
        ['lessons'],
        'https://jumpfreerun.nl/denhaag/',
        { sources: ['https://jumpfreerun.nl/denhaag/vestigingen/'] }
    ),
    'JUMP Freerun De Bilt': profile(
        'jump-freerun-de-bilt',
        'De Bilt',
        'Freerunlocatie aan de Ambachtstraat in De Bilt. JUMP biedt hier vaste lessen en proeflessen, met aandacht voor sprongen, landingen en het combineren van bewegingen.',
        'A freerun location on Ambachtstraat in De Bilt. JUMP offers regular classes and trial lessons, covering jumps, landings and combining movements.',
        ['lessons', 'parties'],
        'https://jumpfreerun.nl/de-bilt/'
    ),
    'JUMP Freerun Heerenveen': profile(
        'jump-freerun-heerenveen',
        'Heerenveen',
        'Aan de Jousterweg kun je bij JUMP freerunlessen volgen, een proefles doen en vrij trainen. De locatie organiseert ook freerunfeestjes.',
        'At JUMP on Jousterweg you can take freerunning classes, try a lesson and train independently. The location also offers freerun birthday parties.',
        ['lessons', 'openGym', 'parties'],
        'https://jumpfreerun.nl/heerenveen/'
    ),
    'JUMP Freerun Houten': profile(
        'jump-freerun-houten',
        'Houten',
        'JUMP’s hal aan de Lange Schaft heeft een programma met freerunlessen, proeflessen, vrij trainen en feestjes. Je oefent technieken en werkt aan je eigen runs.',
        'JUMP’s gym on Lange Schaft offers freerunning classes, trial lessons, free training and parties. Practise techniques and develop your own runs.',
        ['lessons', 'openGym', 'parties'],
        'https://jumpfreerun.nl/houten/'
    ),
    'JUMP Freerun Leeuwarden': profile(
        'jump-freerun-leeuwarden',
        'Leeuwarden',
        'De JUMP-locatie aan het Noordvliet in Leeuwarden staat in onze Gym Finder en open-gymagenda. Bekijk hieronder de sessies die in de communityagenda staan.',
        'The JUMP location on Noordvliet in Leeuwarden appears in our Gym Finder and open gym calendar. See sessions published in the community calendar below.',
        [],
        'https://jumpfreerun.nl/',
        {
            note: {
                nl: 'De oude officiële locatiepagina geeft momenteel een 404. De communityagenda bevat nog sessies op dit adres. Controleer bij JUMP of deze doorgaan.',
                en: 'The old official location page currently returns a 404. The community calendar still contains sessions at this address. Check with JUMP that they are running.'
            },
            sources: ['https://jumpfreerun.nl/'],
            reviewedAt: '2026-10-07'
        }
    ),
    'JUMP Freerun Uithoorn': profile(
        'jump-freerun-uithoorn',
        'Uithoorn',
        'JUMP’s freerunlocatie aan de J.A. van Seumerenlaan. Het aanbod omvat lessen, proeflessen, vrij trainen en feestjes, met ruimte om technieken stap voor stap te oefenen.',
        'JUMP’s freerun location on J.A. van Seumerenlaan offers classes, trial lessons, free training and parties, with opportunities to practise techniques step by step.',
        ['lessons', 'openGym', 'parties'],
        'https://jumpfreerun.nl/uithoorn/'
    ),
    'Urban-Inside Waddinxveen': profile(
        'urban-inside-waddinxveen',
        'Waddinxveen',
        'Urban-Inside heeft sinds 2020 een eigen freerunlocatie in Waddinxveen. De freerunschool voor de Gouwestreek verzorgt lessen, kinderfeestjes en workshops.',
        'Urban-Inside has its own freerun location in Waddinxveen, established in 2020. The Gouwestreek freerun school offers classes, birthday parties and workshops.',
        ['lessons', 'parties', 'workshops'],
        'https://urban-inside.nl/Home/'
    ),
    'Urban-Inside Gouda': profile(
        'urban-inside-gouda',
        'Gouda',
        'Urban-Inside opende in juni 2024 een eigen freerunlocatie in Gouda. Je kunt hier terecht voor freerunlessen en activiteiten van de freerunschool uit de Gouwestreek.',
        'Urban-Inside opened its Gouda freerun location in June 2024. It offers freerunning classes and activities as part of its Gouwestreek freerun school.',
        ['lessons'],
        'https://urban-inside.nl/Home/'
    ),
    'Commit 040': profile(
        'commit-040-eindhoven',
        'Eindhoven',
        'Commit 040 is een ontmoetingsplek voor de freeruncommunity in Eindhoven. Aan de Professor Horowitzstraat organiseert Commit lessen, proeflessen, workshops en trainingen voor volwassenen.',
        'Commit 040 is a meeting place for Eindhoven’s freerun community. On Professor Horowitzstraat, Commit offers classes, trial lessons, workshops and adult training.',
        ['lessons', 'workshops', 'parties'],
        'https://commitfreerun.nl/'
    ),
    'Area 51 Skatepark': profile(
        'area-51-eindhoven',
        'Eindhoven',
        'In Area 51 op Strijp-S heeft Commit een indoor freerunlocatie met verplaatsbare materialen. De opstelling kan veranderen, waardoor je steeds andere runs en sprongen kunt oefenen.',
        'Commit has an indoor freerun space at Area 51 on Strijp-S. Moveable equipment allows the layout to change, offering different runs and jumps to practise.',
        ['lessons', 'modular'],
        'https://www.area51eindhoven.nl/',
        { sources: ['https://commitfreerun.nl/area51/', 'https://www.area51eindhoven.nl/'] }
    ),
    'Adaptive Movement': profile(
        'adaptive-movement-elst',
        'Elst',
        'Adaptive Movement’s freerunhal in Elst heeft een vaste opstelling, modulaire obstakels en een Big Airbag. De hal wordt gebruikt voor lessen, workshops, cursussen en jams.',
        'Adaptive Movement’s Elst gym has fixed obstacles, modular equipment and a Big Airbag. It hosts classes, workshops, courses and jams.',
        ['lessons', 'airbag', 'modular', 'workshops'],
        'https://www.adaptivemovement.nl/'
    ),
    VROG: profile(
        'vrog-amsterdam',
        'Amsterdam',
        'Onder het Mr. Visserplein ligt VROG: een voormalige tunnel met een freerunpark, trampolines en een dansstudio. Het aanbod omvat trainingen voor kinderen en volwassenen, feestjes en events.',
        'VROG sits beneath Mr. Visserplein in a converted tunnel with a freerun park, trampolines and a dance studio. It offers training for children and adults, parties and events.',
        ['lessons', 'trampolines', 'parties'],
        'https://vrog.nl/'
    ),
    Flexbeweging: profile(
        'flexbeweging-veendam',
        'Veendam',
        'Flexbeweging’s gymzaal in Veendam is ingericht om te klimmen, springen, rollen en trucs te oefenen. Zachte materialen ondersteunen de landingen; de locatie biedt begeleide freerunlessen.',
        'Flexbeweging’s Veendam gym is set up for climbing, jumping, rolling and practising tricks. Soft landing equipment supports coached freerunning classes.',
        ['lessons'],
        'https://www.flexbeweging.nl/veendam/'
    ),
    'Rush World Rotterdam West': profile(
        'rush-world-rotterdam-west',
        'Rotterdam',
        'RUSH World aan de Schiehaven biedt freerunning in Rotterdam-West. Via de officiële website vind je informatie over lessen, proeflessen, vrij trainen en activiteiten.',
        'RUSH World on Schiehaven offers freerunning in Rotterdam-West. Its official website provides information about classes, trial lessons, free training and activities.',
        ['lessons', 'openGym', 'parties'],
        'https://www.rushworld.nl/gratis-proefles',
        { address: 'Schiehaven 15b, 3024 EC Rotterdam' }
    ),
    'Rush World Rotterdam Zuid': profile(
        'rush-world-rotterdam-zuid',
        'Rotterdam',
        'RUSH World Koepels is een indoor sporthal in Rotterdam-Zuid voor freerunning, calisthenics, tricking en dans. Naast lessen zijn er begeleide momenten om vrij te trainen.',
        'RUSH World Koepels is an indoor sports hall in Rotterdam-Zuid for freerunning, calisthenics, tricking and dance. It offers classes and supervised free training.',
        ['lessons', 'openGym', 'calisthenics'],
        'https://www.rushworld.nl/kopie-van-rotterdam-west-2'
    ),
    'Rush World Barendrecht': profile(
        'rush-world-barendrecht',
        'Barendrecht',
        'De RUSH World-hal achter station Barendrecht biedt freerunning en andere urban sports. Verplaatsbare obstakels, airtracks, matten en een foampit ondersteunen lessen en vrije trainingen.',
        'RUSH World’s hall behind Barendrecht station offers freerunning and other urban sports. Moveable obstacles, airtracks, mats and a foam pit support classes and free training.',
        ['lessons', 'openGym', 'foamPit', 'airtrack'],
        'https://www.rushworld.nl/kopie-van-rotterdam-zuid'
    ),
    'Rooftop Kingdom': profile(
        'rooftop-kingdom-hoogvliet',
        'Hoogvliet Rotterdam',
        'Rooftop Kings’ locatie aan de Nederhage in Hoogvliet combineert freerunning met Chase Tag. Het officiële rooster bevat freerunlessen, open gyms en open-quadtrainingen.',
        'Rooftop Kings’ location on Nederhage in Hoogvliet combines freerunning with Chase Tag. Its official schedule includes freerunning classes, open gyms and open quad training.',
        ['lessons', 'openGym', 'chaseTag'],
        'https://rooftopkings.nl/rotterdam-hoogvliet/'
    ),
    'Gymworld Freerun Academy': profile(
        'gymworld-freerun-academy-zoetermeer',
        'Zoetermeer',
        'Parkour Disciplines’ indoor locatie in Gymworld aan de Amerikaweg. Het rooster omvat lessen voor verschillende leeftijden, waaronder volwassenen, ouder-kindtraining en 65+.',
        'Parkour Disciplines’ indoor location inside Gymworld on Amerikaweg offers classes for different ages, including adults, parent-and-child training and sessions for people aged 65+.',
        ['lessons', 'parties', 'workshops'],
        'https://parkourdisciplines.com/locatie/gymworld/'
    ),
    'Roots Underground Academy': profile(
        'roots-underground-academy-zoetermeer',
        'Zoetermeer',
        'Deze pagina bewaart de Roots Underground-locatie uit onze Gym Finder. Parkour Disciplines noemt de huidige Roots Academy een outdoor trainingslocatie in Zoetermeer.',
        'This page retains the Roots Underground location from our Gym Finder. Parkour Disciplines describes the current Roots Academy as an outdoor training location in Zoetermeer.',
        [],
        'https://parkourdisciplines.com/locatie/roots-academy/',
        {
            locationUnconfirmed: true,
            note: {
                nl: 'De officiële website noemt nu De Warande als buitenlocatie. Onderlangs 25 is het eerdere adres in onze lijst; de huidige beschikbaarheid van deze indoorlocatie is niet bevestigd. Neem eerst contact op met Parkour Disciplines.',
                en: 'The official website now lists De Warande as an outdoor location. Onderlangs 25 is the earlier address in our list; current access to this indoor location is unconfirmed. Contact Parkour Disciplines before visiting.'
            }
        }
    ),
    'Play Freerun Academy': profile(
        'play-freerun-academy-leiden',
        'Leiden',
        'Play Freerun Academy ligt bij het centrum van Leiden. Verplaatsbare obstakels zorgen voor wisselende opstellingen en nieuwe uitdagingen. Parkour Disciplines verzorgt hier lessen, proeflessen en workshops.',
        'Play Freerun Academy is near Leiden’s centre. Moveable obstacles create changing layouts and fresh challenges. Parkour Disciplines offers classes, trial lessons and workshops here.',
        ['lessons', 'modular', 'workshops'],
        'https://parkourdisciplines.com/locatie/playfun-freerun-academy/',
        { address: 'Lopsenstraat 2, 2312 ZZ Leiden' }
    ),
    'Hero Freerun Academy': profile(
        'hero-freerun-academy-alphen-aan-den-rijn',
        'Alphen aan den Rijn',
        'Hero Academy aan de Kalkovenweg is een indoor locatie van Parkour Disciplines. Het aanbod omvat parkour- en freerunlessen voor verschillende leeftijden, proeflessen, kinderfeestjes en workshops.',
        'Hero Academy on Kalkovenweg is an indoor Parkour Disciplines location. It offers parkour and freerunning classes for different ages, trial lessons, birthday parties and workshops.',
        ['lessons', 'parties', 'workshops'],
        'https://parkourdisciplines.com/locatie/hero-academy/'
    ),
    TheSpot: profile(
        'thespot-groningen',
        'Groningen',
        'TheSpot is een parkour- en freerunhal van Achieve Body Control, met verplaatsbare obstakels en een foampit. Er zijn lessen, vrije trainingen en communitysessies; vooraf aanmelden is nodig.',
        'TheSpot is an Achieve Body Control parkour and freerun gym with moveable obstacles and a foam pit. It offers classes, free training and community sessions; advance registration is required.',
        ['lessons', 'openGym', 'foamPit', 'modular'],
        'https://thespotgroningen.nl/'
    ),
    'Progression Academy Purmerend': profile(
        'progression-academy-purmerend',
        'Purmerend',
        'Progression Academy biedt parkour en freerunning in Purmerend. Je kunt vaste lessen volgen, een proefles boeken en onder toezicht van coaches vrij trainen. Schrijf je vooraf in.',
        'Progression Academy offers parkour and freerunning in Purmerend. Take regular classes, book a trial lesson or train independently under coach supervision. Register before attending.',
        ['lessons', 'openGym', 'parties'],
        'https://progression-academy.nl/'
    ),
    'Minded Motion': profile(
        'minded-motion-venlo',
        'Venlo',
        'Minded Motion’s City Park aan de Garnizoenweg biedt freerunlessen voor kinderen, jongeren en volwassenen. Er zijn proeflessen en open trainingen, met aandacht voor techniek en creativiteit.',
        'Minded Motion’s City Park on Garnizoenweg offers freerunning classes for children, teens and adults, with trial lessons and open training focused on technique and creativity.',
        ['lessons', 'openGym', 'parties'],
        'https://mindedmotion.com/en/school/freerunlessen/freerunning-in-venlo'
    ),
    'Elevation Freerun': profile(
        'elevation-freerun-enschede',
        'Enschede',
        'Elevation Academy is de eigen freerunhal van Elevation Freerun in Enschede. De ruimte is speciaal ingericht voor parkour en freerunning, met lessen en workshops voor verschillende niveaus.',
        'Elevation Academy is Elevation Freerun’s own gym in Enschede. It is set up for parkour and freerunning, offering classes and workshops for different skill levels.',
        ['lessons', 'workshops'],
        'https://www.elevationfreerun.com/'
    )
};
