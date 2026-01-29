<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
	import OpenGymsList from '$lib/components/calendar/OpenGymsList.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';
	import CalendarAddSVG from '$lib/components/svg/CalendarAddSVG.svelte';
	import DownloadSVG from '$lib/components/svg/DownloadSVG.svelte';
	import ExternalLinkSVG from '$lib/components/svg/ExternalLinkSVG.svelte';
	import { t } from 'svelte-i18n';
</script>


<svelte:head>
	<title>{$t('openGyms.pageTitle')} {titlePostfix}</title>
</svelte:head>

<section class="page-hero">
	<div class="hero-content">
		<span class="hero-badge">🏋️ Training</span>
		<h1>{$t('openGyms.heading')}</h1>
		<p class="hero-description">{@html $t('openGyms.intro')}</p>
	</div>
</section>

<section class="content-section">
	<div class="grid gap-6">
		<ToolCard
			href="/tools/gym-finder"
			name={$t('tools.gymFinder.name')}
			description={$t('openGyms.finder')}
			emoji="📍"
			color="green"
		/>

		<div class="section-card">
			<OpenGymsList />

			<div class="calendar-actions">
				<a
					href="https://calendar.google.com/calendar/?cid=MmY0OWI4ZDM0Njk2ZTI3YWE1MDhhNGM2NjllNDUzM2M3NGMxMWFlNGU1ZmZjOWRjNDhjZDVjMDZkMGEwM2NiM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
					rel="noreferrer"
					target="_blank"
					class="button-secondary action-btn">
					<CalendarAddSVG />
					<span class="btn-text">{$t('openGyms.addToCalendar')}</span>
					<span class="btn-text-mobile">{$t('openGyms.addToCalendarShort')}</span>
				</a>

				<a
					href="https://calendar.google.com/calendar/ical/2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com/public/basic.ics"
					rel="noreferrer"
					target="_blank"
					class="button-secondary action-btn">
					<DownloadSVG />
					<span class="btn-text">{$t('openGyms.downloadICal')}</span>
					<span class="btn-text-mobile">{$t('openGyms.downloadShort')}</span>
				</a>

				<a
					href="https://calendar.google.com/calendar/embed?src=2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com&ctz=Europe%2FAmsterdam"
					rel="noreferrer"
					target="_blank"
					class="button-secondary action-btn">
					<ExternalLinkSVG />
					<span class="btn-text">{$t('openGyms.openCalendar')}</span>
					<span class="btn-text-mobile">{$t('openGyms.openShort')}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<section class="content-section">
	<div class="section-card">
		<h2>{$t('openGyms.submitTitle')}</h2>
		<InputCollector pagePath={$page.url.pathname}/>
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
		margin: 0 0 1rem 0;
	}

	.calendar-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: fit-content;
		justify-content: center;
	}

	.btn-text-mobile {
		display: none;
	}

	@media (max-width: 768px) {
		.page-hero {
			padding: 3rem 1rem;
		}

		.page-hero h1 {
			font-size: 2rem;
		}

		.calendar-actions {
			flex-direction: column;
			gap: 0.75rem;
		}

		.action-btn {
			padding: 0.75rem 1rem;
			font-size: 0.9rem;
			min-width: auto;
		}

		.btn-text {
			display: none;
		}

		.btn-text-mobile {
			display: inline;
		}

		:global(.button-secondary) {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.calendar-actions {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 0.5rem;
		}

		.action-btn {
			flex-direction: column;
			padding: 0.75rem 0.5rem;
			font-size: 0.8rem;
			gap: 0.25rem;
			text-align: center;
		}

		.btn-text-mobile {
			font-size: 0.75rem;
			line-height: 1.2;
		}
	}
</style>