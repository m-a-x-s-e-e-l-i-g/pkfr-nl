<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
	import OpenGymsList from '$lib/components/calendar/OpenGymsList.svelte';
</script>


<svelte:head>
	<title>Open Gyms {titlePostfix}</title>
</svelte:head>


<h1>Open Gyms</h1>
<p>Bij een open gym kun je zonder lidmaatschap in jouw favoriete indoor freerun gym trainen. Er zijn locaties door heel het land, maar let op: je moet je soms wel even aanmelden.</p>
<p>Ben je benieuwd naar hoe een gym eruit ziet of welke er in jouw buurt zijn? Check dan de <a href="/tools/gym-finder">Gym Finder</a>.</p>
<br/>
<OpenGymsList/>

<a
	href="https://calendar.google.com/calendar/u/1?cid=MmY0OWI4ZDM0Njk2ZTI3YWE1MDhhNGM2NjllNDUzM2M3NGMxMWFlNGU1ZmZjOWRjNDhjZDVjMDZkMGEwM2NiM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
	rel="noreferrer"
	target="_blank"
	class="button">Toevoegen aan agenda</a
>

<h2>Wijziging insturen</h2>
<InputCollector pagePath={$page.url.pathname}/>

<style>
</style>