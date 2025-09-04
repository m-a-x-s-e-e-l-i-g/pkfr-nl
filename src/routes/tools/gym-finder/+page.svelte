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
		background: white;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		margin-top: 2rem;
		overflow: hidden;
	}

	.gym-content {
		padding: 1.5rem;
		position: relative;
	}

	.gym-title {
		font-size: 1.5rem;
		font-weight: bold;
		color: #000;
		margin: 0 0 1rem;
		line-height: 1.3;
	}

	.distance-badge {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		font-weight: bold;
		background: var(--accent);
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	.gym-info {
		margin-bottom: 1rem;
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.5rem;
		background: #f8f9fa;
		border-radius: 0.375rem;
		line-height: 1.5;
	}

	.gym-info-icon {
		font-size: 1.1rem;
		margin-top: 0.1rem;
		flex-shrink: 0;
	}

	.gym-info-content {
		flex: 1;
		min-width: 0;
	}

	.gym-info a {
		color: var(--accent);
		text-decoration: none;
		word-break: break-word;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.gym-info a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.gym-card {
			margin-top: 1.5rem;
		}

		.gym-content {
			padding: 1rem;
		}

		.gym-title {
			font-size: 1.25rem;
			margin-bottom: 0.75rem;
		}

		.distance-badge {
			top: 0.25rem;
			right: 0.75rem;
			font-size: 0.8rem;
			padding: 0.1875rem 0.375rem;
		}

		.gym-info {
			font-size: 0.9rem;
			margin-bottom: 0.75rem;
			gap: 0.5rem;
			padding: 0.375rem;
		}

		.gym-info-icon {
			font-size: 1rem;
		}
	}
</style>


<svelte:head>
	<title>Indoor Freerun Gym Finder {titlePostfix}</title>
</svelte:head>
<h1>Gym Finder</h1>
<p>Hier vind je de <b>{gyms.length}</b> indoor freerun <b>gyms</b> van Nederland!</p>
{#if !latitude && !longitude}
	<div transition:slide>
		<Alert.Root>
			<Icon data={locationArrow} class="h-4 w-4"/>
			<Alert.Title>Geef pkfr.nl locatierechten.</Alert.Title>
			<Alert.Description>
				Deel je locatie om de lijst te sorteren op afstand.
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}
<div>
	{#each gyms as gym}
		<div class="gym-card">
			<div class="gym-content">
				<h2 class="gym-title">
					{gym.name}
				</h2>
				{#if latitude && longitude}
					<div class="distance-badge">
						{gym.distance.toFixed(1)} km
					</div>			
				{/if}
				<div class="gym-info">
					<span class="gym-info-icon">📍</span>
					<div class="gym-info-content">
						<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`} target="_blank" rel="noopener noreferrer">{gym.address}</a>
					</div>
				</div>
				<div class="gym-info">
					<span class="gym-info-icon">🌐</span>
					<div class="gym-info-content">
						<a href={gym.website} target="_blank" rel="noopener noreferrer">Website bezoeken</a>
					</div>
				</div>
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
	{/each}
</div>