<script>
	import { titlePostfix } from '$lib/config';
	import EuropeJamsList from '$lib/components/calendar/EuropeJamsList.svelte';
	import { t } from 'svelte-i18n';

	const heroPhoto = '/images/gyms/rush-world/rush-world-rotterdam-west-2.jpg';
	const sourceUrl = 'https://www.matttma.de/en/parkourjamcalendar';
</script>

<svelte:head>
	<title>{$t('jamsEurope.pageTitle')} {titlePostfix}</title>
</svelte:head>

<section class="page-hero" style={`--hero-photo: url("${heroPhoto}")`}>
	<div class="hero-content">
		<span class="hero-badge">🌍 International</span>
		<h1>{$t('jamsEurope.heading')}</h1>
		<p class="hero-description">{$t('jamsEurope.intro')}</p>
	</div>
</section>

<section class="content-section">
	<div class="section-card">
		<h2>{$t('jamsEurope.calendarTitle')}</h2>
		<p class="section-subtitle">{$t('jamsEurope.calendarIntro')}</p>
		<EuropeJamsList />
	</div>
</section>

<section class="content-section">
	<div class="section-card">
		<h2>{$t('jamsEurope.sourceTitle')}</h2>
		<p>{$t('jamsEurope.sourceDescription')}</p>
		<div class="actions">
			<a href={sourceUrl} rel="noreferrer" target="_blank" class="button">
				{$t('jamsEurope.sourceButton')}
			</a>
			<a href="/jams" class="button-secondary">{$t('jamsEurope.backButton')}</a>
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
		max-width: 32rem;
		margin: 0 auto;
	}

	.content-section {
		margin-bottom: 2rem;
	}

	.section-card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		padding: 2rem;
	}

	.section-card h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-foreground);
		margin: 0 0 0.5rem 0;
	}

	.section-subtitle,
	.section-card p {
		color: var(--color-muted-foreground);
		line-height: 1.7;
		margin: 0 0 1.5rem 0;
	}

	.actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.actions :global(.button),
	.actions :global(.button-secondary) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		padding: 0 1.25rem;
		font-size: 1rem;
		line-height: 1;
		white-space: nowrap;
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.page-hero {
			padding: 3rem 1rem;
		}

		.page-hero h1 {
			font-size: 2rem;
		}

		.actions {
			flex-direction: column;
		}

		.actions :global(.button),
		.actions :global(.button-secondary) {
			width: 100%;
			justify-content: center;
		}
	}
</style>
