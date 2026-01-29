<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import nlLocale from '@fullcalendar/core/locales/nl';
	import enLocale from '@fullcalendar/core/locales/en-gb';
	import { sliceEvents, createPlugin } from '@fullcalendar/core';
	import { t, locale } from 'svelte-i18n';
	import { get } from 'svelte/store';
	
const CustomViewConfig = {
	classNames: ['upcomming'],

	content: function (props) {
		let segs = sliceEvents(props, true);
		segs.sort((a, b) => a.range.start.valueOf() - b.range.start.valueOf());

		const firstSeg = segs[0];
        const title = firstSeg?.def.title ?? '';
		const currentLocale = get(locale);
        const date = firstSeg?.range.start.toLocaleString(currentLocale, { day: 'numeric', month: 'long' });
		const startTime = firstSeg?.instance.range.start.toLocaleTimeString(currentLocale, {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			});
		const endTime = firstSeg?.instance.range.end.toLocaleTimeString(currentLocale, {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			});
        const location = firstSeg?.def.extendedProps.location ?? '';
        const description = firstSeg?.def.extendedProps.description ?? '';
		const url = firstSeg?.def.url ?? '';

		let startEndTimes = '';
		if (startTime !== '00:00' || endTime !== '00:00') {
			startEndTimes = `
				<div class="grid-item">⌚</div>
				<div class="grid-item">${get(t)('events.fromTo', { values: { startTime, endTime } })}</div>
			`;
		}
		
		let html = `
			<div class="fc-custom">
				<h2>📆 ${title}</h2>
				<p>${get(t)('events.upcomingEvent', { values: { date, title } })}
					<div class="grid-container">
						${startEndTimes}
						<div class="grid-item">📍</div>
						<div class="grid-item"><a href="http://maps.google.com/maps?q=${location}" target="_blank" rel="noreferrer">${location}</a></div>
						<div class="grid-item">📝</div>
						<div class="grid-item description">${description}</div>
					</div>
					<a href="${url}" target="_blank" rel="noreferrer" class="button">${get(t)('events.addToCalendar')}</a>
					<a href="/jams" class="button ml-4">${get(t)('events.viewAllEvents')}</a>
				</p>
			</div>
		`;
		return { html: html };
	}
};

  const CustomViewPlugin = createPlugin({
    name: 'custom-upcoming-jam',
    views: {
      custom: CustomViewConfig
    }
  })

  $: calendarLocale = $locale === 'en' ? enLocale : nlLocale;

  $: options = {
		locale: calendarLocale,
		height: 'auto',
		initialView: 'custom',
		headerToolbar: false,
		views: {
			custom: {
				duration: { days: 365 }
			}
		},
		plugins: [CustomViewPlugin, googleCalendarPlugin],
		googleCalendarApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		events: {
			googleCalendarId: import.meta.env.VITE_JAM_CALENDAR_ID
		}
	} as CalendarOptions;
</script>

<svelte:head>
	<style>
		.fc-custom {
			background-color: var(--color-card) !important;
			padding: 1rem;
		}
		.fc-custom .grid-container{
			display:grid;
			grid-template-columns: 50px auto;
		}
		.fc-custom .description{
			font-size: 0.8em;
			word-break: break-word;
		}
		.fc-custom .grid-item:nth-child(odd){
			padding-right: 0.5em;
		}
		.fc-custom .grid-item{
			margin-top: 0.2em;
		}
		.fc-custom, .fc-custom h2, .fc-custom p, .fc-custom .grid-item, .fc-custom .description {
			color: var(--color-foreground) !important;
		}
		.fc-custom a:not(.button) {
			color: var(--color-primary) !important;
		}
		.fc-custom a:not(.button):hover {
			text-decoration: underline;
		}
		
	</style>
</svelte:head>

<FullCalendar {options} />
