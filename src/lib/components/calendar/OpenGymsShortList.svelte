<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import ListPlugin from '@fullcalendar/list';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import nlLocale from '@fullcalendar/core/locales/nl';

  let options: CalendarOptions = {
		locale: nlLocale,
		initialView: 'list',
		headerToolbar: false,
		views: {
			list: {
				duration: { hours: 72 },
				listDayFormat: { day: 'numeric', month: 'long'},
				listDaySideFormat: { weekday: 'long' },
			}
		},
		plugins: [ListPlugin, googleCalendarPlugin],
		googleCalendarApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		events: {
			googleCalendarId: import.meta.env.VITE_OPEN_GYM_CALENDAR_ID
		},
		eventMouseEnter: (info) => {
			if (info.event.extendedProps.description) {
				info.el.setAttribute('title', info.event.extendedProps.description.replace(/(<([^>]+)>)/gi, ''));
			}
		},
		eventClick: (info) => {
			if (info.event.url) {
				info.jsEvent.preventDefault();
				window.open(info.event.url, '_blank');
			}
		},
	};
</script>

<style>
</style>

<FullCalendar {options} />
