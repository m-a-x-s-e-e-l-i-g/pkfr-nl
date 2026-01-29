<script>
	import { titlePostfix } from '$lib/config';
	import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('spots.title')} {titlePostfix}</title>
</svelte:head>

<section class="page-hero">
	<div class="hero-content">
		<span class="hero-badge">📍 Spots</span>
		<h1>{$t('spots.title')}</h1>
		<p class="hero-description">{@html $t('spots.description')}</p>
	</div>
</section>

<section class="content-section">
	<div class="spot-card featured">
		<div class="spot-card-content">
			<h2>{$t('spots.parkourSpotTitle')}</h2>
			<p>{@html $t('spots.parkourSpotDescription')}</p>
			<a href="https://parkour.spot/" rel="noreferrer" target="_blank" class="button">
				{$t('spots.parkourSpotButton')} →
			</a>
		</div>
		<div class="spot-card-image">
			<img src="/images/parkour-spot-app-device-mockup.webp" alt="Parkour.Spot logo" />
		</div>
	</div>
</section>

<section class="content-section">
	<div class="spot-card">
		<div class="spot-card-content full">
			<h2>{$t('spots.spotMapsTitle')}</h2>
			<p>{@html $t('spots.spotMapsDescription')}</p>
			<PlacelistFilter />
			<a href="/tools/spot-map-finder" class="button-secondary">{$t('spots.shareSpotList')}</a>
		</div>
	</div>
</section>

<section class="content-section">
	<div class="spot-card">
		<div class="spot-card-content">
			<h2>{$t('spots.indoorSpotsTitle')}</h2>
			<p>{@html $t('spots.indoorSpotsDescription')}</p>
			<a href="/tools/gym-finder" class="button">{$t('spots.findGym')} →</a>
		</div>
	</div>
</section>

<section class="content-section">
	<div class="spot-card featured reverse">
		<div class="spot-card-content">
			<h2>{$t('spots.cityLegendsTitle')}</h2>
			<p>{@html $t('spots.cityLegendsDescription')}</p>
			<a href="https://citylegends.io/download-app" rel="noreferrer" target="_blank" class="button-accent">
				{$t('spots.downloadApp')} →
			</a>
		</div>
		<div class="spot-card-image">
			<picture>
				<source srcset="./images/citylegends-app-animated.png" type="image/apng" />
				<img src="./images/citylegends-app-animated.gif" alt="CityLegends app animated" />
			</picture>
		</div>
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

	.spot-card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.spot-card.featured {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
	}

	@media (min-width: 768px) {
		.spot-card.featured {
			grid-template-columns: 1fr 300px;
		}
		
		.spot-card.featured.reverse {
			grid-template-columns: 300px 1fr;
		}
		
		.spot-card.featured.reverse .spot-card-image {
			order: -1;
		}
	}

	.spot-card-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.spot-card-content.full {
		width: 100%;
	}

	.spot-card-content h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-foreground);
		margin: 0;
	}

	.spot-card-content p {
		color: var(--color-muted-foreground);
		line-height: 1.7;
		margin: 0;
	}

	.spot-card-image {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.spot-card-image img {
		max-width: 250px;
		width: 100%;
		height: auto;
		border-radius: 0.75rem;
	}

	:global(.button),
	:global(.button-secondary),
	:global(.button-accent) {
		width: fit-content;
	}

	@media (max-width: 768px) {
		.page-hero {
			padding: 3rem 1rem;
		}

		.page-hero h1 {
			font-size: 2rem;
		}

		:global(.button),
		:global(.button-secondary),
		:global(.button-accent) {
			width: 100%;
			justify-content: center;
		}
	}
</style>
