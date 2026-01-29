<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import ListPlugin from '@fullcalendar/list';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import nlLocale from '@fullcalendar/core/locales/nl';
	import enLocale from '@fullcalendar/core/locales/en-gb';
	import { locale } from 'svelte-i18n';

  $: calendarLocale = $locale === 'en' ? enLocale : nlLocale;

  $: options = {
		locale: calendarLocale,
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
	} as CalendarOptions;
</script>

<style>
	/* FullCalendar Dark Mode Overrides - Component Level */
	:global(.dark .fc-list-event:hover) {
		background: var(--color-muted) !important;
		border-color: var(--color-primary) !important;
	}
	
	:global(.dark .fc-list-event:hover .fc-list-event-title),
	:global(.dark .fc-list-event:hover .fc-list-event-time) {
		color: var(--color-foreground) !important;
	}

	:global(.fc-media-screen, .fc-header-toolbar.fc-toolbar) {
		border-radius: 15px;
	}

	:global(.dark .fc-button) {
		background: var(--color-card) !important;
		border-color: var(--color-border) !important;
		color: var(--color-foreground) !important;
	}

	:global(.fc .fc-list-day > *) {
		background-color: var(--color-card) !important;
	}
	:global(.dark .fc-event:hover *)  {
		background: var(--color-muted) !important;
	}
</style>

<FullCalendar {options} />
