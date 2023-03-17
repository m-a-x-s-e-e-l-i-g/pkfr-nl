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
				duration: { days: 365 },
				listDayAltFormat: 'dddd'
			}
		},
		plugins: [ListPlugin, googleCalendarPlugin],
		googleCalendarApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		events: {
			googleCalendarId: import.meta.env.VITE_JAM_CALENDAR_ID
		}
	};
</script>

<FullCalendar {options} />
