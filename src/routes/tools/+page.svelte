<script>
    import { titlePostfix } from '$lib/config';
    import Icon from 'svelte-awesome';
    import calculator from 'svelte-awesome/icons/calculator';
    import mapO from 'svelte-awesome/icons/mapO';
    import mapMarker from 'svelte-awesome/icons/mapMarker';


    const tools = [
        { 
            name: 'Afstand Analyser 5000™', 
            link: '/tools/distance-converter', 
            icon: calculator, 
            description: 'Maak sprongen eerlijk door schoenmaatverschillen te compenseren.' 
        },
        {
            name: 'Spot Map Finder',
            link: '/tools/spot-map-finder',
            icon: mapO,
            description: 'Vind en filter kaarten met freerun spots in Nederland en daarbuiten.'
        },
        {
            name: 'Freerun Gym Finder',
            link: '/tools/gym-finder',
            icon: mapMarker,
            description: 'Vind snel de dichtsbijzijnde indoor freerun gym in jouw buurt.'
        }
    ];
</script>

<style>
    .icon {
        margin-right: 8px;
    }
    a:hover {
        text-decoration: none!important;
    }
</style>

<svelte:head>
    <title>Tools {titlePostfix}</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-4">Tools</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each tools as tool}
        <a class="block p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105" href={tool.link}>
            <div class="flex items-center mb-2">
                <Icon class="icon" data={tool.icon} />
                <span class="ml-2 font-bold">{tool.name}</span>
            </div>
            <p class="mb-2 text-black text-base">{tool.description}</p>
        </a>
    {/each}
</div>