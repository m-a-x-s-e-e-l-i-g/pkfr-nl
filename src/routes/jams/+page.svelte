<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
</script>


<svelte:head>
	<title>Jams {titlePostfix}</title>
</svelte:head>


<h1>Jams</h1>
<iframe src="https://calendar.google.com/calendar/embed?src=2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com&ctz=Europe%2FAmsterdam" title="Jams NL"  style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

<a
	href="https://calendar.google.com/calendar/ical/2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com/public/basic.ics"
	rel="noreferrer"
	target="_blank"
	class="button">Toevoegen aan agenda</a
>

<p>
	Organiseer je een jam? Of mist er een jam in de agenda? Stuur dan een berichtje!
</p>
<InputCollector pagePath={$page.url.pathname} placeholder="Jouw suggestie.."/>