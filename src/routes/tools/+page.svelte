<script>
    import { titlePostfix } from '$lib/config';
    import Icon from 'svelte-awesome';
    import calculator from 'svelte-awesome/icons/calculator';
    import mapO from 'svelte-awesome/icons/mapO';
    import mapMarker from 'svelte-awesome/icons/mapMarker';
    import { t } from 'svelte-i18n';

    $: tools = [
        { 
            name: $t('tools.distanceConverter.name'),
            link: '/tools/distance-converter', 
            icon: calculator, 
            description: $t('tools.distanceConverter.description'),
            colorStart: 'rgb(239, 68, 68)', // red-500
            colorEnd: 'rgb(249, 115, 22)', // orange-500
            bgGradient: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
            iconColor: 'text-red-600 dark:text-red-400',
            bgIconClass: 'calculator'
        },
        {
            name: $t('tools.spotMapFinder.name'),
            link: '/tools/spot-map-finder',
            icon: mapO,
            description: $t('tools.spotMapFinder.description'),
            colorStart: 'rgb(59, 130, 246)', // blue-500
            colorEnd: 'rgb(147, 51, 234)', // purple-500
            bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgIconClass: 'map'
        },
        {
            name: $t('tools.gymFinder.name'),
            link: '/tools/gym-finder',
            icon: mapMarker,
            description: $t('tools.gymFinder.description'),
            colorStart: 'rgb(34, 197, 94)', // green-500
            colorEnd: 'rgb(20, 184, 166)', // teal-500
            bgGradient: 'from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20',
            iconColor: 'text-green-600 dark:text-green-400',
            bgIconClass: 'location'
        }
    ];
</script>

<style>
    .tool-card {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tool-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .tool-card:hover::before {
        opacity: 1;
    }

    .tool-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .background-icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0.08;
        transform: rotate(15deg) scale(3) translate(10%, -10%);
        transition: all 0.4s ease;
        z-index: 1;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .background-icon::after {
        content: '🧮';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 120px;
        opacity: 0.4;
        filter: grayscale(1);
        z-index: 2;
    }

    .background-icon.calculator::after {
        content: '🧮';
    }

    .background-icon.map::after {
        content: '🗺️';
    }

    .background-icon.location::after {
        content: '📍';
    }

    .tool-card:hover .background-icon {
        opacity: 0.15;
        transform: rotate(14deg) scale(2.7) translate(10%, -10%);
    }

    .card-content {
        position: relative;
        z-index: 2;
    }

    .icon-wrapper {
        background: linear-gradient(135deg, var(--icon-bg-start), var(--icon-bg-end));
        border-radius: 12px;
        padding: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .tool-card:hover .icon-wrapper {
        transform: scale(1.1);
    }

    .tool-icon {
        width: 22px;
        height: 22px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .tool-title {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 8px;
        background: linear-gradient(135deg, var(--title-gradient-start), var(--title-gradient-end));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        transition: all 0.3s ease;
    }

    .tool-description {
        line-height: 1.6;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .tool-card:hover .tool-description {
        opacity: 1;
    }
</style>

<svelte:head>
    <title>Tools {titlePostfix}</title>
</svelte:head>

<h1 class="font-bold mb-4 text-gray-900">Tools</h1>

<div class="container mx-auto px-0 max-w-6xl">
    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {#each tools as tool}
            <a 
                href={tool.link} 
                class="tool-card group block p-6 bg-gradient-to-br {tool.bgGradient} border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                style="--icon-bg-start: {tool.colorStart}; --icon-bg-end: {tool.colorEnd}; --title-gradient-start: {tool.colorStart}; --title-gradient-end: {tool.colorEnd};"
            >
                <!-- Background Icon -->
                <div class="background-icon {tool.bgIconClass}"></div>
                
                <!-- Card Content -->
                <div class="card-content">                  
                    <!-- Content -->
                    <div>
                        <h3 class="tool-title">{tool.name}</h3>
                        <p class="tool-description text-gray-700 dark:text-gray-300">
                            {tool.description}
                        </p>
                    </div>

                    <!-- Hover indicator -->
                    <div class="mt-4 flex items-center text-sm {tool.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Ga naar tool</span>
                        <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>