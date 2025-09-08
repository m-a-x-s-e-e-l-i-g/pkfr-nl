<script lang="ts">
	import { onMount } from 'svelte';
	import { titlePostfix } from '$lib/config';
	import { getGyms } from '$lib/assets/js/gyms.js';
	import Autoplay from "embla-carousel-autoplay";
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import * as Alert from "$lib/components/ui/alert/index.js";
	import * as Button from "$lib/components/ui/button/index.js";
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
</script>

<style>
	.gym-card {
		background: var(--paper);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
		border: 1px solid var(--border);
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
		height: 320px;
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
</style>


<svelte:head>
	<title>{$t('tools.gymFinder.pageTitle')} {titlePostfix}</title>
</svelte:head>
<h1>{$t('tools.gymFinder.heading')}</h1>
<p>{@html $t('tools.gymFinder.intro').replace('{count}', gyms.length)}</p>
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
									width={800}
									height={400}
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
						on:click={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`, '_blank')}
					>
						{$t('tools.gymFinder.viewLocation')}
					</button>
					<button
						class="button"
						on:click={() => window.open(gym.website, '_blank')}
					>
						{$t('tools.gymFinder.visitWebsite')}
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>