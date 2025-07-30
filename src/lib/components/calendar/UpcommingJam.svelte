<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import { sliceEvents, createPlugin } from '@fullcalendar/core';
	
const CustomViewConfig = {
	classNames: ['upcomming'],

	content: function (props) {
		let segs = sliceEvents(props, true);
		segs.sort((a, b) => a.range.start.valueOf() - b.range.start.valueOf());

		const firstSeg = segs[0];
        const title = firstSeg?.def.title ?? '';
        const date = firstSeg?.range.start.toLocaleString('nl', { day: 'numeric', month: 'long' });
		const startTime = firstSeg?.instance.range.start.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			});
		const endTime = firstSeg?.instance.range.end.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			});
        const location = firstSeg?.def.extendedProps.location ?? '';
        const description = firstSeg?.def.extendedProps.description ?? '';
		const url = firstSeg?.def.url ?? '';;

		let startEndTimes = '';
		if (startTime !== '00:00' || endTime !== '00:00') {
			startEndTimes = `
				<div class="grid-item">⌚</div>
				<div class="grid-item">Van ${startTime} tot ${endTime}.</div>
			`;
		}
		
		let html = `
			<h2>📆 ${title}</h2>
			<p>Op ${date} is het eerstvolgende event: <b>${title}</b>.
				<div class="grid-container">
					${startEndTimes}
					<div class="grid-item">📍</div>
					<div class="grid-item"><a href="http://maps.google.com/maps?q=${location}" target="_blank" rel="noreferrer">${location}</a></div>
					<div class="grid-item">📝</div>
					<div class="grid-item description">${description}</div>
				</div>
				<a href="${url}" target="_blank" rel="noreferrer" class="button">Plaats in mijn agenda</a>
				<a href="/jams" class="button ml-4">Bekijk alle events</a>
			</p>
		`;
		return { html: html };
	}
};

  const CustomViewPlugin = createPlugin({
    views: {
      custom: CustomViewConfig
    }
  })

  let options: CalendarOptions = {
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
	};
</script>

<svelte:head>
	<style>
		@use './vars';
		.grid-container{
			display:grid;
			grid-template-columns: 50px auto;
		}
		.description{
			font-size: 0.8em;
			word-break: break-word;
		}
		.grid-item:nth-child(odd){
			padding-right: 0.5em;
		}
		.grid-item{
			margin-top: 0.2em;
		}
	</style>
</svelte:head>

<FullCalendar {options} />
