<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import ListPlugin from '@fullcalendar/list';
	import nlLocale from '@fullcalendar/core/locales/nl';
	import enLocale from '@fullcalendar/core/locales/en-gb';
	import { locale } from 'svelte-i18n';

	interface AmericanJamEvent {
		id: string;
		title: string;
		start: string;
		end?: string;
		allDay?: boolean;
		url?: string;
		extendedProps?: {
			description?: string;
			location?: string;
		};
	}

	interface FeedResponse {
		events?: AmericanJamEvent[];
	}

	let eventCache: AmericanJamEvent[] | null = null;
	let pendingRequest: Promise<AmericanJamEvent[]> | null = null;

	const stripText = (value: string): string => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

	const toDate = (value?: string): Date | null => {
		if (!value) {
			return null;
		}

		const parsedDate = new Date(value);
		if (Number.isNaN(parsedDate.valueOf())) {
			return null;
		}

		return parsedDate;
	};

	const loadFeedEvents = async (): Promise<AmericanJamEvent[]> => {
		if (eventCache) {
			return eventCache;
		}

		if (pendingRequest) {
			return pendingRequest;
		}

		pendingRequest = (async () => {
			const response = await fetch('/api/jams/american');
			if (!response.ok) {
				throw new Error(`Failed to load American jams feed (${response.status})`);
			}

			const data: FeedResponse = await response.json();
			eventCache = Array.isArray(data.events) ? data.events : [];
			return eventCache;
		})();

		try {
			return await pendingRequest;
		} finally {
			pendingRequest = null;
		}
	};

	$: calendarLocale = $locale === 'en' ? enLocale : nlLocale;

	$: options = {
		locale: calendarLocale,
		initialView: 'list',
		headerToolbar: false,
		views: {
			list: {
				duration: { days: 3650 },
				listDayFormat: { day: 'numeric', month: 'long', year: 'numeric' },
				listDaySideFormat: { weekday: 'long' }
			}
		},
		eventMouseEnter: (info) => {
			const description =
				typeof info.event.extendedProps.description === 'string'
					? info.event.extendedProps.description
					: '';
			const location =
				typeof info.event.extendedProps.location === 'string' ? info.event.extendedProps.location : '';
			const tooltip = [description ? stripText(description) : '', location.trim()]
				.filter(Boolean)
				.join(' | ');

			if (tooltip) {
				info.el.setAttribute('title', tooltip);
			}
		},
		eventClick: (info) => {
			if (info.event.url) {
				info.jsEvent.preventDefault();
				window.open(info.event.url, '_blank');
			}
		},
		events: async (fetchInfo, successCallback, failureCallback) => {
			try {
				const sourceEvents = await loadFeedEvents();
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				const events = sourceEvents
					.filter((event) => {
						const startDate = toDate(event.start);
						if (!startDate) {
							return false;
						}

						const endDate = toDate(event.end) || startDate;
						if (endDate < today) {
							return false;
						}

						return endDate >= fetchInfo.start && startDate <= fetchInfo.end;
					})
					.sort((a, b) => new Date(a.start).valueOf() - new Date(b.start).valueOf());

				successCallback(events);
			} catch (error) {
				console.error('Failed to load American jams calendar feed', error);
				failureCallback(error as Error);
			}
		},
		plugins: [ListPlugin]
	} as CalendarOptions;
</script>

<style>
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

	:global(.dark .fc-event:hover *) {
		background: var(--color-muted) !important;
	}
</style>

<FullCalendar {options} />
