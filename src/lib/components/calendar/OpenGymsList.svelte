<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import ListPlugin from '@fullcalendar/list';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import nlLocale from '@fullcalendar/core/locales/nl';

  let options: CalendarOptions = {
		locale: nlLocale,
		initialView: 'list',
		views: {
			list: {
				duration: { days: 7 },
				listDayFormat: { day: 'numeric', month: 'long' },
				listDaySideFormat: { weekday: 'long' },
			}
		},
		headerToolbar: {
			left: 'title',
			right: 'today prev,next'
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
		plugins: [ListPlugin, googleCalendarPlugin],
		googleCalendarApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		events: {
			googleCalendarId: import.meta.env.VITE_OPEN_GYM_CALENDAR_ID
		}
	};
</script>

<style>
	/* FullCalendar Dark Mode Overrides - Component Level */
	:global(.dark .fc-list-event:hover) {
		background: var(--darker) !important;
		border-color: var(--accent) !important;
	}
	
	:global(.dark .fc-list-event:hover .fc-list-event-title),
	:global(.dark .fc-list-event:hover .fc-list-event-time) {
		color: var(--paper) !important;
	}

	/* Fix header toolbar for dark mode */
	:global(.dark .fc-toolbar-title) {
		color: var(--paper) !important;
		padding-left: 20px;
	}

	:global(.fc-media-screen, .fc-header-toolbar.fc-toolbar) {
		border-radius: 15px;
	}

	:global(.dark .fc-button) {
		background: var(--darker) !important;
		border-color: var(--border) !important;
		color: var(--paper) !important;
	}

	:global(.dark .fc-button:hover) {
		background: var(--accent) !important;
		border-color: var(--accent) !important;
	}

	/* Make header background dark in dark theme */
	:global(.dark .fc-toolbar) {
		background: var(--darker) !important;
	}
</style>

<FullCalendar {options} />
