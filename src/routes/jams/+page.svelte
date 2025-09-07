<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';
	import JamsList from '$lib/components/calendar/JamsList.svelte';
	import CalendarAddSVG from '$lib/components/svg/CalendarAddSVG.svelte';
	import DownloadSVG from '$lib/components/svg/DownloadSVG.svelte';
	import ExternalLinkSVG from '$lib/components/svg/ExternalLinkSVG.svelte';
	import { t } from 'svelte-i18n';
</script>


<svelte:head>
	<title>{$t('jams.pageTitle')} {titlePostfix}</title>
</svelte:head>


<h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{$t('jams.heading')}</h1>
<p class="text-gray-700 dark:text-gray-300">
	{@html $t('jams.intro')}
</p>
<h2 class="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">{$t('jams.upcomingTitle')}</h2>
<p class="text-gray-600 dark:text-gray-400 mb-6">{$t('jams.upcomingSubtitle')}</p>
<JamsList/>

<div class="calendar-actions">
	<a
		href="https://calendar.google.com/calendar/?cid=MmY0OWI4ZDM0Njk2ZTI3YWE1MDhhNGM2NjllNDUzM2M3NGMxMWFlNGU1ZmZjOWRjNDhjZDVjMDZkMGEwM2NiM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
		rel="noreferrer"
		target="_blank"
		class="button button-with-icon">
		<CalendarAddSVG />
	<span class="button-text">{$t('jams.addToCalendar')}</span>
	<span class="button-text-mobile">{$t('jams.addToCalendarShort')}</span>
	</a>

	<a
		href="https://calendar.google.com/calendar/ical/2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com/public/basic.ics"
		rel="noreferrer"
		target="_blank"
		class="button button-with-icon">
		<DownloadSVG />
	<span class="button-text">{$t('jams.downloadICal')}</span>
	<span class="button-text-mobile">{$t('jams.downloadShort')}</span>
	</a>

	<a
		href="https://calendar.google.com/calendar/embed?src=2f49b8d34696e27aa508a4c669e4533c74c11ae4e5ffc9dc48cd5c06d0a03cb3%40group.calendar.google.com&ctz=Europe%2FAmsterdam"
		rel="noreferrer"
		target="_blank"
		class="button button-with-icon">
		<ExternalLinkSVG />
	<span class="button-text">{$t('jams.openCalendar')}</span>
	<span class="button-text-mobile">{$t('jams.openShort')}</span>
	</a>
</div>

<h2 class="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">{$t('jams.submitTitle')}</h2>
<p class="text-gray-700 dark:text-gray-300">{$t('jams.submitDescription')}</p>
<InputCollector pagePath={$page.url.pathname}/>

<h2 class="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">{$t('jams.notificationsTitle')}</h2>
<p class="text-gray-700 dark:text-gray-300">
	{@html $t('jams.notificationsDescription')} <br>
	<a href="https://chat.whatsapp.com/IhKX7dXV9Vo7duEMmyzTpO"
	rel="norefferer"
	target="_blank"
	class="button">{$t('jams.followWhatsapp')}</a>
</p>

<h2 class="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">{$t('jams.europeTitle')}</h2>
<p class="text-gray-700 dark:text-gray-300">
	{@html $t('jams.europeDescription')}
</p>
<a
	href="https://www.matttma.de/en/parkourjamcalendar"
	rel="noreferrer"
	target="_blank"
	class="button">{$t('jams.europeButton')}</a
>

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