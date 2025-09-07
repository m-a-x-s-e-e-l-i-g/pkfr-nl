<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
	import OpenGymsList from '$lib/components/calendar/OpenGymsList.svelte';
	import CalendarAddSVG from '$lib/components/svg/CalendarAddSVG.svelte';
	import DownloadSVG from '$lib/components/svg/DownloadSVG.svelte';
	import ExternalLinkSVG from '$lib/components/svg/ExternalLinkSVG.svelte';
</script>


<svelte:head>
	<title>Open Gyms {titlePostfix}</title>
</svelte:head>


<h1>Open Gyms</h1>
<p>Bij een open gym kun je zonder lidmaatschap in jouw favoriete indoor freerun gym trainen. Er zijn locaties door heel het land, maar let op: je moet je soms wel even aanmelden.</p>
<p>Ben je benieuwd naar hoe een gym eruit ziet of welke er in jouw buurt zijn? Check dan de <a href="/tools/gym-finder">Gym Finder</a>.</p>
<br/>
<OpenGymsList/>

<div class="calendar-actions">
	<a
		href="https://calendar.google.com/calendar/?cid=MmY0OWI4ZDM0Njk2ZTI3YWE1MDhhNGM2NjllNDUzM2M3NGMxMWFlNGU1ZmZjOWRjNDhjZDVjMDZkMGEwM2NiM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
		rel="noreferrer"
		target="_blank"
		class="button button-with-icon">
		<CalendarAddSVG />
		<span class="button-text">Toevoegen aan agenda</span>
		<span class="button-text-mobile">Toevoegen</span>
	</a>

	<a
		href="https://calendar.google.com/calendar/ical/2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com/public/basic.ics"
		rel="noreferrer"
		target="_blank"
		class="button button-with-icon">
		<DownloadSVG />
		<span class="button-text">iCal downloaden</span>
		<span class="button-text-mobile">Download</span>
	</a>

	<a
		href="https://calendar.google.com/calendar/embed?src=2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com&ctz=Europe%2FAmsterdam"
		rel="noreferrer"
		target="_blank"
		class="button button-with-icon">
		<ExternalLinkSVG />
		<span class="button-text">Agenda openen</span>
		<span class="button-text-mobile">Openen</span>
	</a>
</div>

<h2>Wijziging insturen</h2>
<InputCollector pagePath={$page.url.pathname}/>

<style>
	.calendar-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.button-with-icon {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: fit-content;
		justify-content: center;
	}

	.button-text-mobile {
		display: none;
	}

	@media (max-width: 768px) {
		.calendar-actions {
			flex-direction: column;
			gap: 0.75rem;
		}

		.button-with-icon {
			padding: 0.75rem 1rem;
			font-size: 0.9rem;
			min-width: auto;
		}

		.button-text {
			display: none;
		}

		.button-text-mobile {
			display: inline;
		}
	}

	@media (max-width: 480px) {
		.calendar-actions {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 0.5rem;
		}

		.button-with-icon {
			flex-direction: column;
			padding: 0.75rem 0.5rem;
			font-size: 0.8rem;
			gap: 0.25rem;
			text-align: center;
		}

		.button-text-mobile {
			font-size: 0.75rem;
			line-height: 1.2;
		}
	}
</style>