<script>
	import { titlePostfix } from '$lib/config';
	import Icon from 'svelte-awesome';
	import whatsapp from 'svelte-awesome/icons/whatsapp';
	import instagram from 'svelte-awesome/icons/instagram';
	import spotify from 'svelte-awesome/icons/spotify';
	import externalLink from 'svelte-awesome/icons/externalLink';
	import youtube from 'svelte-awesome/icons/youtube';
	import { t } from 'svelte-i18n';

	const heroPhoto = '/images/gyms/vrog/vrog-amsterdam-4.jpg';

</script>

<svelte:head>
	<title>{$t('links.pageTitle')} {titlePostfix}</title>
</svelte:head>

<section class="page-hero" style={`--hero-photo: url("${heroPhoto}")`}>
	<div class="hero-content">
		<span class="hero-badge">🔗 {$t('nav.links')}</span>
		<h1>{$t('links.heading')}</h1>
		<p class="hero-description">{$t('links.heroDescription')}</p>
	</div>
</section>

<section class="content-section">
	<ul class="links-grid">
		<li class="link-card whatsapp">
			<span class="link-icon"><Icon data={whatsapp}/></span>
			<a href="https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8" rel="noreferrer" target="_blank">
				<span class="link-title">{$t('links.whatsappCommunity')}</span>
				<span class="link-arrow">→</span>
			</a>
		</li>
		<li class="link-card whatsapp">
			<span class="link-icon"><Icon data={whatsapp}/></span>
			<a href="https://chat.whatsapp.com/HVzvFn54TUBJfBzmAAcTba" rel="noreferrer" target="_blank">
				<span class="link-title">{$t('links.whatsappTraining')}</span>
				<span class="link-arrow">→</span>
			</a>
		</li>
		<li class="link-card instagram">
			<span class="link-icon"><Icon data={instagram}/></span>
			<a href="https://www.instagram.com/parkour_culture_NL/" rel="noreferrer" target="_blank">
				<span class="link-title">{$t('links.instagram')}</span>
				<span class="link-arrow">→</span>
			</a>
		</li>
		<li class="link-card spotify">
			<span class="link-icon"><Icon data={spotify}/></span>
			<a href="https://spoti.fi/3OazXTm" rel="noreferrer" target="_blank">
				<span class="link-title">{$t('links.spotifyPlaylist')}</span>
				<span class="link-arrow">→</span>
			</a>
		</li>
		<li class="link-card website">
			<span class="link-icon"><Icon data={externalLink}/></span>
			<a href="https://parkourculture.nl/" rel="noreferrer" target="_blank">
				<span class="link-title">{$t('links.parkourcultureWebsite')}</span>
				<span class="link-arrow">→</span>
			</a>
		</li>
		<li class="link-card website">
			<span class="link-icon"><Icon data={externalLink}/></span>
			<a href="https://www.weave-pk.nl/museum" rel="noreferrer" target="_blank">
				<span class="link-title">{$t('links.weaveMuseumTitle')}</span>
				<span class="link-arrow">→</span>
			</a>
		</li>
	</ul>
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

	.links-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.link-card {
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.2s ease;
	}

	.link-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	.link-card.whatsapp:hover {
		border-color: #25D366;
	}

	.link-card.instagram:hover {
		border-color: #E4405F;
	}

	.link-card.spotify:hover {
		border-color: #1DB954;
	}

	.link-card.website:hover {
		border-color: var(--color-primary);
	}

	.link-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 0.75rem;
		flex-shrink: 0;
	}

	.whatsapp .link-icon {
		background: rgba(37, 211, 102, 0.1);
		color: #25D366;
	}

	.instagram .link-icon {
		background: rgba(228, 64, 95, 0.1);
		color: #E4405F;
	}

	.spotify .link-icon {
		background: rgba(29, 185, 84, 0.1);
		color: #1DB954;
	}

	.website .link-icon {
		background: var(--color-muted);
		color: var(--color-primary);
	}

	.link-card a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		text-decoration: none;
		color: var(--color-foreground);
	}

	.link-title {
		font-size: 1.125rem;
		font-weight: 600;
	}

	.link-arrow {
		font-size: 1.25rem;
		color: var(--color-muted-foreground);
		transition: transform 0.2s ease;
	}

	.link-card:hover .link-arrow {
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

		.link-card {
			padding: 1rem 1.25rem;
		}

		.link-title {
			font-size: 1rem;
		}
	}
</style>