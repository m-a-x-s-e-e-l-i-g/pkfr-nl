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
	Jams zijn een belangrijk onderdeel van de freerun community. Het is de plek waar je nieuwe mensen ontmoet, samen traint en van elkaar leert. Hieronder vind je een overzicht van aankomende jams en events in Nederland.
</p>
<h2>Aankomende jams & events:</h2>
<p>Jams & Events vanuit de Nederlandse Freerun Community</p>
<JamsList/>

<a
	href="https://calendar.google.com/calendar/u/1?cid=MmY0OWI4ZDM0Njk2ZTI3YWE1MDhhNGM2NjllNDUzM2M3NGMxMWFlNGU1ZmZjOWRjNDhjZDVjMDZkMGEwM2NiM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
	rel="noreferrer"
	target="_blank"
	class="button">Toevoegen aan agenda</a
>

<a
	href="https://calendar.google.com/calendar/ical/2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com/public/basic.ics"
	rel="noreferrer"
	target="_blank"
	class="button">iCal downloaden</a
>

<a
	href="https://calendar.google.com/calendar/embed?src=2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com&ctz=Europe%2FAmsterdam"
	rel="noreferrer"
	target="_blank"
	class="button">Agenda openen</a
>

<h2>Jam of event insturen</h2>
<p>Oraniseer jij een jam? Of mist er een event in de agenda? Deel deze met de rest van de community!</p>
<InputCollector pagePath={$page.url.pathname}/>

<h2>Notificaties ontvangen</h2>
<p>
	Wil je via WhatsApp op de hoogte gehouden worden van freerun jams en events binnen Nederland? <br>
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

<style>
	h1, h2 {
		margin: 4rem 0 1.5rem;
	}
</style>