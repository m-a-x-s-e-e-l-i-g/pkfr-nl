<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
	import JamsList from '$lib/components/calendar/JamsList.svelte';
</script>


<svelte:head>
	<title>Jams & Events {titlePostfix}</title>
</svelte:head>


<h1>Jams & events</h1>
<p>
	In deze agenda vind je de heerlijkste jams, gemaakt van verse en natuurlijke ingrediënten. De jams worden met veel liefde en zorg bereid, en dat proef je terug bij je aanwezigheid! Of je nu houdt van klassieke city jam of juist van vernieuwende smaken als shopping jam, hier vind je voor ieder wat wils. Smeer de jams automatisch in je eigen agenda door op die rode knop te drukken.
</p>
<h2>Aankomende jams & events:</h2>
<p>Jams & Events vanuit de Nederlandse Freerun Community</p>
<JamsList/>

<a
	href="https://calendar.google.com/calendar/ical/2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com/public/basic.ics"
	rel="noreferrer"
	target="_blank"
	class="button">Sync met mijn agenda</a
>

<p>
	Organiseer je een jam of event? Of mist er iets in de agenda? Stuur dan een berichtje!
</p>
<InputCollector pagePath={$page.url.pathname} placeholder="Jouw suggestie.."/>

<h2>Jam notificaties</h2>
<p>
	Wil je via WhatsApp op de hoogte gehouden worden van freerun jams en events binnen Nederland?
	<a href="https://chat.whatsapp.com/IhKX7dXV9Vo7duEMmyzTpO"
	rel="norefferer"
	target="_blank"
	class="button">Volg de Parkour Culture WhatsApp channel</a>
</p>

<h2>Jams in Europa</h2>
<p>
	Wat fijn dat je betrokken wil zijn bij de internationale community! Bekijk deze kalender die beheerd wordt door MATTTMA, met jams in heel Europa.
</p>
<a
	href="https://www.matttma.de/en/parkourjamcalendar"
	rel="noreferrer"
	target="_blank"
	class="button">Freerun jams in Europa</a
>