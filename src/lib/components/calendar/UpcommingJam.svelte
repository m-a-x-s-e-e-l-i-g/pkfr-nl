<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import { sliceEvents, createPlugin } from '@fullcalendar/core';
	import { getWeatherData }  from '$lib/assets/js/weather.js';
	
	let weatherIconUrl = '';
	let weatherIconAlt = '';
	let weatherText = '';
	let weatherHtml = '';

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


		const startTimestamp = (firstSeg?.instance.range.start.getTime() / 1000) ?? 0;
		const endTime = firstSeg?.instance.range.end.toLocaleTimeString('nl', {
				timeZone: 'UTC',
				hour: '2-digit',
				minute: '2-digit'
			});
        const location = firstSeg?.def.extendedProps.location ?? '';
        const description = firstSeg?.def.extendedProps.description ?? '';
		const url = firstSeg?.def.url ?? '';
		
		getWeatherData(location, startTimestamp).then(weatherData => {
			if (!weatherData || !weatherData.data || weatherData.data.length == 0) {
				return;
			}
			weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.data[0].weather[0].icon}.png`;
			weatherIconAlt = weatherData.data[0].weather[0].description;
			weatherText = weatherData.data[0].weather[0].description + ' met een temperatuur van ' + Math.round(weatherData.data[0].temp) + '°C.';
			weatherHtml = `
				<div class="grid-item text-center"><img src="${weatherIconUrl}" alt="${weatherIconAlt}" title="${weatherIconAlt}" /></div>
				<div class="grid-item">
					${weatherText}
				</div>
			`;
		});
		
        let html = `
            <h2>📆 ${title}</h2>
            <p>Op ${date} is de eerstvolgende jam: <b>${title}</b>.
				<div class="grid-container">
					<div class="grid-item text-center">⌚</div>
					<div class="grid-item">Van ${startTime} tot ${endTime}.</div>
					<div class="grid-item text-center">📍</div>
					<div class="grid-item"><a href="http://maps.google.com/maps?q=${location}" target="_blank" rel="noreferrer">${location}</a></div>
					${weatherHtml}
					<div class="grid-item text-center">📝</div>
					<div class="grid-item description">${description}</div>
				</div>
				<a href="${url}" target="_blank" rel="noreferrer" class="button">Plaats in mijn agenda</a>
				<a href="/jams" target="_blank" rel="noreferrer" class="button ml-4">Bekijk alle jams</a>
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
		}
		.grid-item:nth-child(odd){
			padding-right: 0.5em;
		}
		.grid-item{
			margin-top: 0.2em;
		}
		.grid-item::first-letter {
			text-transform: capitalize;
		}
	</style>
</svelte:head>

<FullCalendar {options} />
