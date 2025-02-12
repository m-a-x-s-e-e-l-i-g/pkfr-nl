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
		<div class="bg-white shadow-md relative p-0 mt-10">
			<div class="p-6">
				<h2 class="text-2xl font-bold text-black my-0 mb-4 mt-2">
					{gym.name}
				</h2>
				{#if latitude && longitude}
					<small class="absolute top-2 right-4 font-bold">
						{gym.distance.toFixed(1)} km
					</small>			
				{/if}
				<p>📍 <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`} target="_blank" rel="noopener noreferrer">{gym.address}</a></p>
				<p>🌐 <a href={gym.website} class="text-blue-500" target="_blank" rel="noopener noreferrer">{gym.website}</a></p>
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
								cdn="netlify"
							/>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>
		</div>
	{/each}
</div>