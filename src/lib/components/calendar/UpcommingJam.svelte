<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import { sliceEvents, createPlugin } from '@fullcalendar/core';
	
const CustomViewConfig = {
	classNames: ['upcomming'],

	content: function (props) {
		let segs = sliceEvents(props, true);
		segs.sort((a, b) => {
			return a.range.start.valueOf() - b.range.start.valueOf();
		});
		
		let html =
		'<h2>📆 ' + segs[0]?.def.title + '</h2>' +
		'<p>Op ' +
			segs[0]?.range.start.getDate() +
			' ' +
			segs[0]?.range.start.toLocaleString('nl', { month: 'long' }) +
			' is de eerstvolgende jam: <b>' + segs[0]?.def.title + '</b>.' +
			'<div class="grid-container">' +
			'<div class="grid-item">⌚</div>' + 
			'<div class="grid-item">Van ' + segs[0]?.instance.range.start.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			}) + ' tot ' + segs[0]?.instance.range.end.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			}) + '.</div>' +
			'<div class="grid-item">📍</div><div class="grid-item"><a href="http://maps.google.com/maps?q=' + segs[0]?.def.extendedProps.location + '" target="_blank" rel="noreferrer">' + segs[0]?.def.extendedProps.location + '</a></div>' +
			'<div class="grid-item">📝</div><div class="grid-item description">' + segs[0]?.def.extendedProps.description + '</div>' +
			'</div>' +
			'<a href="' + segs[0]?.def.url + '" target="_blank" rel="noreferrer" class="button">Plaats in mijn agenda</a>' +
		'</p>'
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
			grid-template-columns: auto auto;
		}
		.description{
			font-size: 0.8em;
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
