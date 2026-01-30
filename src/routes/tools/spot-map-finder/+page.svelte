<script>
  import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
  import { titlePostfix } from '$lib/config';
  import InputCollector from '$lib/components/InputCollector.svelte';
  import { page } from '$app/stores';
  import { t } from 'svelte-i18n';

  const heroPhoto = '/images/hero-images/bd927f92-c9c2-4b92-9a82-27be84699571_rw_1920.webp';
</script>

<svelte:head>
  <title>{$t('tools.spotMapFinder.pageTitle')} {titlePostfix}</title>
</svelte:head>

<section class="page-hero" style={`--hero-photo: url("${heroPhoto}")`}>
  <div class="hero-content">
    <span class="hero-badge">🗺️ Tool</span>
    <h1>{$t('tools.spotMapFinder.heading')}</h1>
    <p class="hero-description">{@html $t('tools.spotMapFinder.intro')}</p>
  </div>
</section>

<section class="content-section">
  <div class="tool-card">
    <div class="tool-card-content">
      <PlacelistFilter />
    </div>
  </div>
</section>

<section class="content-section">
  <div class="tool-card">
    <div class="tool-card-content">
      <h2>{$t('tools.spotMapFinder.addMapTitle')}</h2>
      <p>{$t('tools.spotMapFinder.addMapDescription')}</p>
      <InputCollector pagePath={$page.url.pathname} />
    </div>
  </div>
</section>

<style>
  .page-hero {
    position: relative;
    overflow: hidden;
    --hero-tint: rgba(255, 255, 255, 0.32);
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
      linear-gradient(var(--hero-tint), var(--hero-tint)),
      radial-gradient(
        900px 420px at 50% 0%,
        color-mix(in oklab, var(--color-primary) 26%, transparent),
        transparent 60%
      ),
      radial-gradient(
        800px 360px at 15% 15%,
        color-mix(in oklab, var(--color-accent) 18%, transparent),
        transparent 55%
      ),
      var(--hero-photo);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.65;
    pointer-events: none;
  }

  :global(.dark) .page-hero {
    --hero-tint: rgba(0, 0, 0, 0.58);
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
    max-width: 42rem;
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

  .tool-card {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .tool-card {
      padding: 1.5rem;
    }
  }

  .tool-card-content h2 {
    margin-top: 0;
  }
</style>

