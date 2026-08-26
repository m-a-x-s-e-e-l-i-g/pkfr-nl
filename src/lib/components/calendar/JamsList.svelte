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
		headerToolbar: false,
		views: {
			list: {
				duration: { days: 365 },
				listDayFormat: { day: 'numeric', month: 'long', year: 'numeric'},
				listDaySideFormat: { weekday: 'long' },
			}
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
			googleCalendarId: import.meta.env.VITE_JAM_CALENDAR_ID
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

	/* Fix day text color in dark mode */
	:global(.dark .fc-list-day-text, .dark .fc-list-day-side-text) {
		color: var(--color-foreground) !important;
	}
	:global(.fc .fc-list-day > *) {
		background-color: var(--color-card) !important;
	}
	:global(.dark .fc-event:hover *)  {
		background: var(--color-muted) !important;
	}

	@media (max-width: 40rem) {
		:global(.fc) {
			height: clamp(30rem, 70svh, 40rem) !important;
		}

		:global(.fc .fc-view-harness) {
			flex: 1 1 auto;
			min-height: 0;
			height: auto !important;
			padding-bottom: 0 !important;
		}

		:global(.fc .fc-list-day-cushion) {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 0.375rem;
			padding: 0.625rem 0.5rem;
		}

		:global(.fc .fc-list-day-cushion::after) {
			display: none;
		}

		:global(.fc .fc-list-day-text) {
			min-width: 0;
		}

		:global(.fc .fc-list-day-side-text) {
			flex: 0 0 auto;
		}

		:global(.fc .fc-list-table) {
			display: block;
			table-layout: fixed;
		}

		:global(.fc .fc-list-table tbody),
		:global(.fc .fc-list-day),
		:global(.fc .fc-list-day > th) {
			display: block;
			width: 100%;
		}

		:global(.fc .fc-list-event) {
			display: grid;
			grid-template-columns: 1rem minmax(0, 1fr);
			column-gap: 0.625rem;
			width: 100%;
			min-height: 5.5rem;
			padding: 0.75rem;
			border-bottom: 1px solid var(--fc-border-color);
		}

		:global(.fc .fc-list-event > td) {
			width: auto;
			padding: 0;
			border: 0;
		}

		:global(.fc .fc-list-event-time) {
			grid-column: 1 / -1;
			padding-bottom: 0.5rem;
		}

		:global(.fc .fc-list-event-graphic) {
			grid-column: 1;
			padding-top: 0.35rem;
		}

		:global(.fc .fc-list-event-title) {
			grid-column: 2;
			min-width: 0;
			line-height: 1.45;
		}
	}
</style>

<FullCalendar {options} />
