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
<br/>
<OpenGymsList/>

<a
	href="https://calendar.google.com/calendar/ical/e8c97b051b5df998bf17a52d4d87ce82490ee2a033a40ff867ffe426214b32a9%40group.calendar.google.com/public/basic.ics"
	rel="noreferrer"
	target="_blank"
	class="button">Sync met mijn agenda</a
>

<h2>Wijziging insturen</h2>
<p>
	Ontreekt er een open gym? Of klopt iets in deze agenda niet? Laat het weten!
</p>
<InputCollector pagePath={$page.url.pathname}/>