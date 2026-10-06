<script>
    import { page } from '$app/stores';
    import { locale } from 'svelte-i18n';
    import { pageMetadata, SITE_ORIGIN } from '$lib/seo';
    $: metadata = pageMetadata($page.url.pathname, {
        event: $page.data.event,
        now: $page.data.now,
        status: $page.status,
        language: $locale
    });
    $: noindex =
        metadata.noindex ||
        $page.data.archiveUnavailable ||
        ($page.url.pathname === '/jams/archive' && $page.url.searchParams.has('region')) ||
        ($page.url.pathname === '/open-gyms' && $page.url.searchParams.has('week'));
    $: canonical =
        metadata.canonical &&
        $page.url.pathname === '/jams/archive' &&
        $page.data.archivePage > 1 &&
        $page.data.region === 'all'
            ? `${metadata.canonical}?page=${$page.data.archivePage}`
            : metadata.canonical;
</script>

<svelte:head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    {#if canonical}
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
    {/if}
    {#if noindex}<meta name="robots" content="noindex, follow" />{/if}
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="pkfr.nl" />
    <meta property="og:locale" content={$locale === 'en' ? 'en_GB' : 'nl_NL'} />
    <meta
        property="og:image"
        content={`${SITE_ORIGIN}/images/hero-images/4c603e86-2375-4d4a-b1b6-5724029da98f_rw_1920.webp`}
    />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
