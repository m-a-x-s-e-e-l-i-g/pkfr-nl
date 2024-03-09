<script>
	import { onMount } from 'svelte';
	import { titlePostfix } from '$lib/config';
	import { getGyms } from '$lib/assets/js/gyms.js';

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
<p>Hier vind je gyms!</p>
<ul>
	{#each getGyms(latitude, longitude) as gym}
		<li>{gym.name}</li>
	{/each}
</ul>