<script lang="ts">
	import { onMount } from 'svelte';
	import { titlePostfix } from '$lib/config';
	import { getGyms } from '$lib/assets/js/gyms.js';
	import Autoplay from "embla-carousel-autoplay";
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import * as Alert from "$lib/components/ui/alert/index.js";
	import Icon from 'svelte-awesome';
	import locationArrow from 'svelte-awesome/icons/locationArrow';
	import { Image } from "@unpic/svelte";
	import { slide } from 'svelte/transition';
	import { t } from 'svelte-i18n';


	var latitude = $state();
	var longitude = $state();

	onMount(() => {
		// retrieve user location
		navigator.geolocation.getCurrentPosition((position) => {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
		});
	});
	let gyms = $derived(getGyms(latitude, longitude));
	const heroPhoto = '/images/gyms/jump-freerun/jump-freerun-den-haag-ninja-academy-3.jpg';
</script>

<style>
	.gym-card {
		background: var(--color-card);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		margin-top: 2rem;
		overflow: hidden;
		transition: all 0.3s ease;
		position: relative;
	}

	.gym-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 35px rgba(0, 0, 0, 0.18);
	}

	.gym-content {
		padding: 1.5rem;
		position: relative;
	}

	.carousel-container {
		position: relative;
		height: 350px;
		overflow: hidden;
	}

	.gym-name-overlay {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-weight: bold;
		z-index: 10;
		backdrop-filter: blur(4px);
	}

	.gym-name {
		font-size: 1.125rem;
		margin: 0;
	}

	.gym-distance {
		font-size: 0.75rem;
		margin-top: 0.25rem;
		opacity: 0.9;
	}

	.button-group {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.button-group button {
		margin: 0;
		cursor: pointer;
		flex: 1;
		min-width: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.gym-card {
			margin-top: 1.5rem;
			border-radius: 8px;
		}

		.gym-content {
			padding: 1rem;
		}

		.gym-name-overlay {
			top: 0.5rem;
			left: 0.5rem;
			padding: 0.375rem 0.75rem;
		}

		.gym-name {
			font-size: 1rem;
		}

		.gym-distance {
			font-size: 0.7rem;
		}

		.button-group {
			flex-direction: column;
			gap: 0.5rem;
			margin-top: 1rem;
		}

		.button-group button {
			flex: none;
			min-width: auto;
			font-size: 0.85rem;
			width: 100%;
			margin: 0;
		}
	}

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
		max-width: 56rem;
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

	.hero-actions {
		margin-top: 1.5rem;
		display: flex;
		justify-content: center;
	}
</style>


<svelte:head>
	<title>{$t('tools.gymFinder.pageTitle')} {titlePostfix}</title>
</svelte:head>

<section class="page-hero" style={`--hero-photo: url(\"${heroPhoto}\")`}>
	<div class="hero-content">
		<span class="hero-badge">📍 Tool</span>
		<h1>{$t('tools.gymFinder.heading')}</h1>
		<p class="hero-description">{@html $t('tools.gymFinder.intro').replace('{count}', `${gyms.length}`)}</p>
		<div class="hero-actions">
			<button
				class="button"
				onclick={() => window.open('https://maps.app.goo.gl/4n4oQeJ4FysKAkcy5?g_st=ac', '_blank')}
			>
				{$t('tools.gymFinder.viewAllOnMap')}
			</button>
		</div>
	</div>
</section>

{#if !latitude && !longitude}
	<div transition:slide>
		<Alert.Root>
			<Icon data={locationArrow} class="h-4 w-4"/>
			<Alert.Title>{$t('tools.gymFinder.permissionTitle')}</Alert.Title>
			<Alert.Description>
				{$t('tools.gymFinder.permissionDescription')}
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}
<div>
	{#each gyms as gym}
		<div class="gym-card">
			<div class="carousel-container">
				<div class="gym-name-overlay">
					<div class="gym-name">{gym.name}</div>
					{#if latitude && longitude}
						<div class="gym-distance">{gym.distance.toFixed(1)} km</div>
					{/if}
				</div>
				<Carousel.Root
					plugins={[
						Autoplay({
						delay: 2000,
						}),
					]}
					>
					<Carousel.Content>
						{#each gym.images as image}
							<Carousel.Item>
								<Image
									src={image}
									layout="constrained"
									width={900}
									height={900}
									alt={gym.name}
									cdn={import.meta.env.DEV ? undefined : "netlify"}
								/>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
				</Carousel.Root>
			</div>
			<div class="gym-content">
				<div class="button-group">
					<button
						class="button"
						onclick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`, '_blank')}
					>
						{$t('tools.gymFinder.viewLocation')}
					</button>
					<button
						class="button"
						onclick={() => window.open(gym.website, '_blank')}
					>
						{$t('tools.gymFinder.visitWebsite')}
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>
