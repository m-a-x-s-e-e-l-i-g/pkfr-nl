<script lang="ts">
	import { onMount } from 'svelte';
	import { titlePostfix } from '$lib/config';
	import { getGyms } from '$lib/assets/js/gyms.js';
	import Autoplay from "embla-carousel-autoplay";
	import * as Carousel from "$lib/components/ui/carousel/index.js";

	var latitude = 0;
	var longitude = 0;
	var radius = 100;

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
<p>Hier vind je gyms! Sta je locatie toe om dichtsbijzijnde gyms te zien.</p>
<div class="flex flex-col space-y-4">
	{#each getGyms(latitude, longitude) as gym}
		<div class="p-6 bg-white rounded-xl shadow-md">
			<h2 class="text-2xl font-bold text-black my-0 mb-4">{gym.name}</h2>
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