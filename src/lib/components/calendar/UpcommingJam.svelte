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
			' is de eerstvolgende jam: <b>' + segs[0]?.def.title + '</b>.<br/>' +
			'⌚ Van ' + segs[0]?.instance.range.start.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			}) + ' tot ' + segs[0]?.instance.range.end.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			}) + '.<br/>' +
			'📍 <a href="http://maps.google.com/maps?q=' + segs[0]?.def.extendedProps.location + '" target="_blank" rel="noreferrer">' + segs[0]?.def.extendedProps.location + '</a><br/>' +
			'📝 ' + segs[0]?.def.extendedProps.description + '<br/>' +
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

		#event {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0;
			border-radius: 30px;
			background-color: var(--accent);
			color: var(--white);
			width:9rem;
		}
		#date{
			font-family: var(--accentFont);
			font-size: 1.3rem;
			padding: .5rem 0rem;
			margin: .2rem 1rem 0 1.3rem;
			
		}
		#title{
			padding: 1rem 1rem .6rem 1.3rem;
			font-size: 1.2rem;
			background: var(--white);
			color: var(--black);
			line-height: 1.4rem;
			border-radius: 0 0 30px 30px;
		}
		#location{
			margin-top: .7rem;
			display: block;
			font-size: .8rem;
			line-height: .8rem;
			opacity: .7;
		}
	</style>
</svelte:head>

<FullCalendar {options} />
