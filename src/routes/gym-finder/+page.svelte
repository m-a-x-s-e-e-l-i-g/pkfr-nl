<script lang="ts">
	import { onMount } from 'svelte';
	import { titlePostfix } from '$lib/config';
	import { getGyms } from '$lib/assets/js/gyms.js';
	import Autoplay from "embla-carousel-autoplay";
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import * as Alert from "$lib/components/ui/alert/index.js";
	import Icon from 'svelte-awesome';
	import locationArrow from 'svelte-awesome/icons/locationArrow';

	var latitude;
	var longitude;

	onMount(() => {
		// retrieve user location
		navigator.geolocation.getCurrentPosition((position) => {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
		});
	});
</script>


<svelte:head>
	<title>Gym Finder {titlePostfix}</title>
</svelte:head>
<h1>Gym Finder</h1>
<p>Hier vind je <b>{getGyms(latitude, longitude).length}</b> indoor <b>gyms</b>!</p>
{#if !latitude && !longitude}
	<Alert.Root>
		<Icon data={locationArrow} class="h-4 w-4"/>
		<Alert.Title>Geef pkfr.nl locatierechten.</Alert.Title>
		<Alert.Description>
			Deel je locatie om de lijst te sorteren op afstand.
		</Alert.Description>
	</Alert.Root>
{/if}
<div class="flex flex-col space-y-4">
	{#each getGyms(latitude, longitude) as gym}
		<div class="p-6 bg-white rounded-xl shadow-md relative">
			<h2 class="text-2xl font-bold text-black my-0 mb-4">
				{gym.name}
			</h2>
			{#if latitude && longitude}
				<small class="absolute top-4 right-4 font-bold">
					{gym.distance.toFixed(1)} km
				</small>			
			{/if}
			<p class="text-gray-500">📍 <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`} target="_blank" rel="noopener noreferrer">{gym.address}</a></p>
			<p class="text-gray-500">🌐 <a href={gym.website} class="text-blue-500">{gym.website}</a></p>
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
							<img src={image} alt={gym.name} class="w-full object-cover mt-2 rounded" style="max-height: 400px;"/>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel.Root>
		</div>
	{/each}
</div>