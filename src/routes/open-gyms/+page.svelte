<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
</script>


<svelte:head>
	<title>Open Gyms {titlePostfix}</title>
</svelte:head>


<h1>Open Gyms</h1>
<p>Bij een open gym kun je zonder lidmaatschap in jouw favoriete indoor freerun gym trainen. Er zijn locaties door heel het land, maar let op: je moet je soms wel even aanmelden.</p>
<iframe src="https://calendar.google.com/calendar/embed?src=e8c97b051b5df998bf17a52d4d87ce82490ee2a033a40ff867ffe426214b32a9%40group.calendar.google.com&ctz=Europe%2FAmsterdam" title="Open Gyms NL" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

<a
	href="https://calendar.google.com/calendar/ical/e8c97b051b5df998bf17a52d4d87ce82490ee2a033a40ff867ffe426214b32a9%40group.calendar.google.com/public/basic.ics"
	rel="noreferrer"
	target="_blank"
	class="button">Zet in mijn agenda</a
>

<p>
	Mist er een open gym? Of moet er iets gewijzigd worden in deze agenda? Stuur dan een berichtje!
</p>
<InputCollector pagePath={$page.url.pathname} placeholder="Jouw suggestie.."/>