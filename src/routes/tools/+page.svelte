<script>
    import { titlePostfix } from '$lib/config';
    import Icon from 'svelte-awesome';
    import calculator from 'svelte-awesome/icons/calculator';
    import mapO from 'svelte-awesome/icons/mapO';
    import mapMarker from 'svelte-awesome/icons/mapMarker';
    import television from 'svelte-awesome/icons/television';
    import { t } from 'svelte-i18n';

    $: tools = [
        {
            name: $t('tools.spotMapFinder.name'),
            link: '/tools/spot-map-finder',
            icon: mapO,
            description: $t('tools.spotMapFinder.description'),
            emoji: '🗺️',
            color: 'blue'
        },
        {
            name: $t('tools.gymFinder.name'),
            link: '/tools/gym-finder',
            icon: mapMarker,
            description: $t('tools.gymFinder.description'),
            emoji: '📍',
            color: 'green'
        },
        {
            name: $t('tools.jumpflix.name'),
            link: 'https://www.jumpflix.tv',
            icon: television,
            description: $t('tools.jumpflix.description'),
            emoji: '📺',
            color: 'purple',
            external: true
        },
        { 
            name: $t('tools.distanceConverter.name'),
            link: '/tools/distance-converter', 
            icon: calculator, 
            description: $t('tools.distanceConverter.description'),
            emoji: '🧮',
            color: 'orange'
        }
    ];
</script>

<svelte:head>
    <title>Tools {titlePostfix}</title>
</svelte:head>

<section class="page-hero">
    <div class="hero-content">
        <span class="hero-badge">🛠️ Tools</span>
        <h1>Tools</h1>
        <p class="hero-description">Handige hulpmiddelen voor de Nederlandse parkour community</p>
    </div>
</section>

<section class="content-section">
    <div class="tools-grid">
        {#each tools as tool}
            <a 
                href={tool.link} 
                class="tool-card {tool.color}"
                target={tool.external ? '_blank' : undefined}
                rel={tool.external ? 'noopener noreferrer' : undefined}
            >
                <span class="tool-emoji">{tool.emoji}</span>
                <h3 class="tool-title">{tool.name}</h3>
                <p class="tool-description">{tool.description}</p>
                <span class="tool-arrow">→</span>
            </a>
        {/each}
    </div>
</section>

<style>
    .page-hero {
        position: relative;
        overflow: hidden;
        background: linear-gradient(
            180deg,
            color-mix(in oklab, var(--color-card) 92%, var(--color-primary) 8%) 0%,
            var(--color-background) 100%
        );
        border: 1px solid var(--color-border);
        border-radius: 1rem;
        padding: 4rem 1.5rem;
        margin: 0 0 2rem 0;
        text-align: center;
        color: var(--color-foreground);
    }

    .page-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
            radial-gradient(
                900px 420px at 50% 0%,
                color-mix(in oklab, var(--color-primary) 26%, transparent),
                transparent 60%
            ),
            radial-gradient(
                800px 360px at 15% 15%,
                color-mix(in oklab, var(--color-accent) 18%, transparent),
                transparent 55%
            );
        opacity: 0.65;
        pointer-events: none;
    }

    :global(.dark) .page-hero::before {
        opacity: 0.85;
    }

    .hero-content {
        position: relative;
        z-index: 1;
        max-width: 48rem;
        margin: 0 auto;
    }

    .hero-badge {
        display: inline-block;
        background: color-mix(in oklab, var(--color-card) 80%, transparent);
        border: 1px solid color-mix(in oklab, var(--color-border) 85%, transparent);
        backdrop-filter: blur(8px);
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .page-hero h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        color: var(--color-foreground);
    }

    .hero-description {
        font-size: 1.125rem;
        opacity: 1;
        color: color-mix(in oklab, var(--color-foreground) 78%, transparent);
        max-width: 32rem;
        margin: 0 auto;
    }

    .page-hero :global(a) {
        color: inherit;
        text-decoration-color: currentColor;
        text-underline-offset: 3px;
    }

    .page-hero :global(a:hover) {
        color: inherit;
        text-decoration-thickness: 2px;
    }

    .content-section {
        margin-bottom: 2rem;
    }

    .tools-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        .tools-grid {
            grid-template-columns: 1fr;
        }
    }

    .tool-card {
        position: relative;
        background: var(--color-card);
        border: 1px solid var(--color-border);
        border-radius: 1rem;
        padding: 2rem;
        text-decoration: none;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        overflow: hidden;
    }

    .tool-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: 1rem 1rem 0 0;
        transition: height 0.3s ease;
    }

    .tool-card.blue::before { background: linear-gradient(90deg, #3b82f6, #8b5cf6); }
    .tool-card.green::before { background: linear-gradient(90deg, #22c55e, #14b8a6); }
    .tool-card.purple::before { background: linear-gradient(90deg, #8b5cf6, #ec4899); }
    .tool-card.orange::before { background: linear-gradient(90deg, #f97316, #ef4444); }

    .tool-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    }

    .tool-card:hover::before {
        height: 6px;
    }

    .tool-emoji {
        font-size: 2.5rem;
        line-height: 1;
    }

    .tool-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-foreground);
        margin: 0;
    }

    .tool-description {
        color: var(--color-muted-foreground);
        line-height: 1.6;
        flex-grow: 1;
        margin: 0;
    }

    .tool-arrow {
        font-size: 1.5rem;
        color: var(--color-muted-foreground);
        transition: all 0.3s ease;
    }

    .tool-card:hover .tool-arrow {
        transform: translateX(4px);
        color: var(--color-primary);
    }

    @media (max-width: 768px) {
        .page-hero {
            padding: 3rem 1rem;
        }

        .page-hero h1 {
            font-size: 2rem;
        }

        .tool-card {
            padding: 1.5rem;
        }
    }
</style>