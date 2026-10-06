<script>
    import { t } from 'svelte-i18n';
    import JamsList from '$lib/components/calendar/JamsList.svelte';
    export let data;
    const regions = ['all', 'dutch', 'europe', 'america'];
    const archiveUrl = (page, region = data.region) => {
        const query = new URLSearchParams();
        if (region !== 'all') query.set('region', region);
        if (page > 1) query.set('page', page);
        return `/jams/archive${query.size ? `?${query}` : ''}`;
    };
</script>

<header class="archive-heading">
    <span class="badge">{$t('jamArchive.badge')}</span>
    <h1>{$t('jamArchive.title')}</h1>
    <p>{$t('jamArchive.description')}</p>
    <a class="button" href="/jams">{$t('jamAgenda.upcomingAction')} →</a>
</header>

<nav class="archive-filters" aria-label={$t('jamArchive.filterLabel')}>
    {#each regions as region}
        <a
            class="button-secondary"
            href={archiveUrl(1, region)}
            aria-current={data.region === region ? 'page' : undefined}
        >
            {$t(`jamArchive.regions.${region}`)}
        </a>
    {/each}
</nav>

{#if data.archiveUnavailable}
    <div class="card p-6" role="status">
        <p>{$t('jamArchive.unavailable')}</p>
        <a href={archiveUrl(data.archivePage)} data-sveltekit-reload>{$t('jamAgenda.retry')} →</a>
    </div>
{:else if !data.events.length}
    <div class="card p-6"><p>{$t('jamArchive.empty')}</p></div>
{:else}
    <JamsList events={data.events} archive />
{/if}

{#if data.pages > 1}
    <nav class="archive-pagination" aria-label={$t('jamArchive.pagination')}>
        {#if data.archivePage > 1}<a
                class="button-secondary"
                href={archiveUrl(data.archivePage - 1)}>← {$t('jamArchive.previous')}</a
            >{/if}
        <span
            >{$t('jamArchive.page', {
                values: { page: data.archivePage, pages: data.pages }
            })}</span
        >
        {#if data.archivePage < data.pages}<a
                class="button-secondary"
                href={archiveUrl(data.archivePage + 1)}>{$t('jamArchive.next')} →</a
            >{/if}
    </nav>
{/if}

<style>
    .archive-heading {
        max-width: 48rem;
        margin: 0 0 2rem;
    }
    .archive-heading h1 {
        margin: 1rem 0;
    }
    .archive-heading p {
        color: var(--color-muted-foreground);
        margin-bottom: 1.5rem;
    }
    .archive-filters,
    .archive-pagination {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        margin: 2rem 0;
    }
    .archive-filters a[aria-current='page'] {
        border-color: var(--color-primary);
        color: var(--color-primary);
        background: var(--color-muted);
    }
    .archive-pagination {
        justify-content: space-between;
    }
</style>
