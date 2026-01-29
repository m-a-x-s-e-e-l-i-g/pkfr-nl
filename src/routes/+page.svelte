<script>
	import OpenGymsShortList from '$lib/components/calendar/OpenGymsShortList.svelte';
	import UpcommingJam from '$lib/components/calendar/UpcommingJam.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';
	import { siteTitle, titlePostfix } from '$lib/config';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{siteTitle} {titlePostfix}</title>
</svelte:head>

<!-- Hero Section -->
<section class="home-hero mb-12">
	<div class="home-hero-inner">
		<div class="grid gap-8 md:grid-cols-12 md:items-center">
			<div class="md:col-span-7">
				<span class="badge mb-4">Parkour & Freerunning</span>
				<h1 class="home-hero-title mb-4">{$t('home.title')}</h1>
				<p class="home-hero-subtitle max-w-2xl">{$t('home.subtitle')}</p>
			</div>

			<div class="md:col-span-5">
				<div class="home-hero-panel">
					<div class="flex items-center justify-between">
						<h2 class="text-base font-semibold">{$t('home.quickNavTitle')}</h2>
					</div>
					<div class="mt-4 grid gap-3">
						<a href="/spots" class="home-hero-link">
							<span class="home-hero-link-icon">📍</span>
							<span class="home-hero-link-text">
								<span class="home-hero-link-title">{$t('nav.spots')}</span>
								<span class="home-hero-link-desc">{$t('home.quickNav.spotsDescription')}</span>
							</span>
							<span class="home-hero-link-arrow">→</span>
						</a>
						<a href="/jams" class="home-hero-link">
							<span class="home-hero-link-icon">🎉</span>
							<span class="home-hero-link-text">
								<span class="home-hero-link-title">{$t('nav.jams')}</span>
								<span class="home-hero-link-desc">{$t('home.quickNav.jamsDescription')}</span>
							</span>
							<span class="home-hero-link-arrow">→</span>
						</a>
						<a href="/open-gyms" class="home-hero-link">
							<span class="home-hero-link-icon">🏋️</span>
							<span class="home-hero-link-text">
								<span class="home-hero-link-title">{$t('nav.openGyms')}</span>
								<span class="home-hero-link-desc">{$t('home.quickNav.openGymsDescription')}</span>
							</span>
							<span class="home-hero-link-arrow">→</span>
						</a>
						<a href="/tools" class="home-hero-link">
							<span class="home-hero-link-icon">🛠️</span>
							<span class="home-hero-link-text">
								<span class="home-hero-link-title">{$t('nav.tools')}</span>
								<span class="home-hero-link-desc">{$t('home.quickNav.toolsDescription')}</span>
							</span>
							<span class="home-hero-link-arrow">→</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Events Section -->
<section class="section">
	<div class="section-header">
		<h2>{$t('jams.upcomingTitle')}</h2>
		<a href="/jams" class="text-sm font-medium text-primary hover:text-primary/80">{$t('common.viewAll')} →</a>
	</div>
	<div class="card">
		<div class="p-6">
			<UpcommingJam />
		</div>
	</div>
</section>

<!-- Open Gyms Section -->
<section class="section">
	<div class="section-header">
		<h2>{$t('home.upcomingOpenGyms')}</h2>
		<a href="/open-gyms" class="text-sm font-medium text-primary hover:text-primary/80">{$t('common.viewAll')} →</a>
	</div>
	<div class="card">
		<div class="p-6">
			<OpenGymsShortList />
		</div>
	</div>
</section>

<!-- Community Section -->
<section class="section">
	<div class="grid md:grid-cols-2 gap-6">
		<div class="card p-6 border-l-4 border-l-accent">
			<h3 class="mb-3">{$t('home.whatsappCommunity')}</h3>
			<p class="text-muted-foreground mb-4">{@html $t('home.whatsappDescription')}</p>
			<a href="https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8" target="_blank" rel="noreferrer" class="button">
				{$t('common.joinWhatsapp')} →
			</a>
		</div>
		<div class="card p-6">
			<h3 class="mb-3">{$t('home.aboutTitle')}</h3>
			<p class="text-muted-foreground">{@html $t('home.aboutDescription')}</p>
		</div>
	</div>
</section>

<!-- Highlights -->
<section class="section">
	<div class="grid md:grid-cols-3 gap-6">
		<div class="card p-6">
			<div class="text-2xl mb-4">📣</div>
			<h3 class="mb-2">{$t('home.highlights.stayUpdatedTitle')}</h3>
			<p class="text-muted-foreground">{$t('home.highlights.stayUpdatedDescription')}</p>
		</div>
		<div class="card p-6">
			<div class="text-2xl mb-4">🤝</div>
			<h3 class="mb-2">{$t('home.highlights.trainTogetherTitle')}</h3>
			<p class="text-muted-foreground">{$t('home.highlights.trainTogetherDescription')}</p>
		</div>
		<div class="card p-6">
			<div class="text-2xl mb-4">🧭</div>
			<h3 class="mb-2">{$t('home.highlights.spotFastTitle')}</h3>
			<p class="text-muted-foreground">{$t('home.highlights.spotFastDescription')}</p>
		</div>
	</div>
</section>

<!-- Featured Tools -->
<section class="section">
	<div class="section-header">
		<h2>{$t('home.featuredToolsTitle')}</h2>
		<a href="/tools" class="text-sm font-medium text-primary hover:text-primary/80">{$t('common.viewTools')} →</a>
	</div>
	<div class="grid md:grid-cols-2 gap-6">
		<ToolCard
			href="/tools/spot-map-finder"
			name={$t('tools.spotMapFinder.name')}
			description={$t('tools.spotMapFinder.description')}
			emoji="🗺️"
			color="blue"
		/>
		<ToolCard
			href="/tools/gym-finder"
			name={$t('tools.gymFinder.name')}
			description={$t('tools.gymFinder.description')}
			emoji="📍"
			color="green"
		/>
	</div>
</section>

<style>
	.home-hero {
		position: relative;
		overflow: hidden;
		border-radius: 1.5rem;
		border: 1px solid var(--color-border);
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--color-card) 92%, var(--color-primary) 8%) 0%,
			var(--color-background) 100%
		);
	}

	.home-hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				900px 480px at 0% 0%,
				color-mix(in oklab, var(--color-primary) 22%, transparent),
				transparent 60%
			),
			radial-gradient(
				900px 520px at 100% 15%,
				color-mix(in oklab, var(--color-accent) 16%, transparent),
				transparent 55%
			);
		opacity: 0.75;
		pointer-events: none;
	}

	:global(.dark) .home-hero::before {
		opacity: 0.95;
	}

	.home-hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				90deg,
				color-mix(in oklab, var(--color-border) 35%, transparent) 1px,
				transparent 1px
			)
			0 0 / 48px 48px,
			linear-gradient(
				0deg,
				color-mix(in oklab, var(--color-border) 22%, transparent) 1px,
				transparent 1px
			)
			0 0 / 48px 48px;
		opacity: 0.25;
		mask-image: radial-gradient(closest-side at 50% 35%, #000 0%, transparent 72%);
		pointer-events: none;
	}

	.home-hero-inner {
		position: relative;
		z-index: 1;
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.home-hero-inner {
			padding: 3rem;
		}
	}

	.home-hero-title {
		color: var(--color-foreground);
		font-size: 2.5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	@media (min-width: 640px) {
		.home-hero-title {
			font-size: 3rem;
		}
	}

	.home-hero-subtitle {
		color: color-mix(in oklab, var(--color-foreground) 78%, transparent);
		font-size: 1.125rem;
		line-height: 1.7;
	}

	.home-hero-panel {
		border-radius: 1.25rem;
		border: 1px solid var(--color-border);
		background: color-mix(in oklab, var(--color-card) 90%, transparent);
		backdrop-filter: blur(10px);
		padding: 1.25rem;
		box-shadow: 0 14px 40px rgba(0, 0, 0, 0.08);
	}

	:global(.dark) .home-hero-panel {
		box-shadow: 0 18px 56px rgba(0, 0, 0, 0.35);
	}

	.home-hero-link {
		display: grid;
		grid-template-columns: 2.25rem 1fr auto;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 0.95rem;
		border-radius: 1rem;
		border: 1px solid color-mix(in oklab, var(--color-border) 80%, transparent);
		background: color-mix(in oklab, var(--color-card) 94%, transparent);
		text-decoration: none;
		color: var(--color-foreground);
		transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
	}

	.home-hero-link:hover {
		transform: translateY(-2px);
		border-color: color-mix(in oklab, var(--color-primary) 40%, var(--color-border));
		background: color-mix(in oklab, var(--color-card) 88%, var(--color-primary) 12%);
	}

	.home-hero-link-icon {
		font-size: 1.5rem;
		line-height: 1;
	}

	.home-hero-link-text {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.home-hero-link-title {
		font-weight: 700;
		line-height: 1.2;
	}

	.home-hero-link-desc {
		font-size: 0.9rem;
		color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
		line-height: 1.2;
	}

	.home-hero-link-arrow {
		color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
		transition: transform 160ms ease, color 160ms ease;
	}

	.home-hero-link:hover .home-hero-link-arrow {
		transform: translateX(3px);
		color: var(--color-primary);
	}
</style>