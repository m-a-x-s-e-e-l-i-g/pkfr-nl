<script lang="ts">
	import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
	import ListPlugin from '@fullcalendar/list';
	import nlLocale from '@fullcalendar/core/locales/nl';
	import enLocale from '@fullcalendar/core/locales/en-gb';
	import { locale } from 'svelte-i18n';

	const EUROPE_JAM_FEED_URL =
		'https://calendar.apiboomtech.com/api/published_calendar?comp_id=comp-l1qi3qyf&instance=XVRQxzlpaXQDRm9amc1mrF8cLMhCpTD1QLYdt2jqPiY.eyJpbnN0YW5jZUlkIjoiNTc4ZmY5NjctZWRjNy00MjgxLThkZTItMGY0ZTlhYzAzNDkwIiwiYXBwRGVmSWQiOiIxM2I0YTAyOC0wMGZhLTcxMzMtMjQyZi00NjI4MTA2YjhjOTEiLCJzaWduRGF0ZSI6IjIwMjYtMDctMDFUMDg6NTM6MDEuMDQ1WiIsInZlbmRvclByb2R1Y3RJZCI6IlByZW1pdW0iLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6ImY4ZGU0NzBiLTE4YTgtNGJkYy04ZWU5LTM2MDU1MTU0ODJlNyIsInNpdGVPd25lcklkIjoiMGY2ZmRjOGItMjE2My00NWVkLWE0YzAtZjJkNGM5M2U1NmRjIiwiYnMiOiJ3Q0RSMkRJTkdaY0lvckpBcUNqd09ELXA3a2txM19ON3FYOVFlcmRPRWg4Iiwic2NkIjoiMjAyMi0wNC0wOFQxMzo0MTowNy4yOTdaIn0&originCompId=&time_zone=Europe%2FAmsterdam';

	interface FeedLink {
		url?: string | null;
	}

	interface FeedVenue {
		address?: string | null;
		name?: string | null;
		website?: string | null;
		lat?: string | number | null;
		lng?: string | number | null;
		long?: string | number | null;
	}

	interface FeedOrganizer {
		website?: string | null;
	}

	interface FeedEvent {
		id?: string | number;
		title?: string | null;
		start?: string | null;
		end?: string | null;
		all_day?: boolean | number | string | null;
		link?: string | FeedLink | null;
		desc?: string | null;
		color?: string | null;
		venue?: FeedVenue | null;
		organizer?: FeedOrganizer | null;
	}

	interface FeedResponse {
		events?: FeedEvent[];
	}

	let eventCache: FeedEvent[] | null = null;
	let pendingRequest: Promise<FeedEvent[]> | null = null;

	const stripHtml = (html: string): string => html.replace(/(<([^>]+)>)/gi, ' ').replace(/\s+/g, ' ').trim();

	const formatDate = (date: Date): string => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

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

	const normalizeUrl = (value?: string | null): string | undefined => {
		if (!value) {
			return undefined;
		}

		const trimmed = value.trim();
		if (!trimmed) {
			return undefined;
		}

		if (/^https?:\/\//i.test(trimmed)) {
			return trimmed;
		}

		if (trimmed.startsWith('www.')) {
			return `https://${trimmed}`;
		}

		return undefined;
	};

	const getEventLink = (event: FeedEvent): string | undefined => {
		if (typeof event.link === 'string') {
			const directLink = normalizeUrl(event.link);
			if (directLink) {
				return directLink;
			}
		}

		if (event.link && typeof event.link === 'object') {
			const typedLink = normalizeUrl(event.link.url);
			if (typedLink) {
				return typedLink;
			}
		}

		const organizerWebsite = normalizeUrl(event.organizer?.website);
		if (organizerWebsite) {
			return organizerWebsite;
		}

		const venueWebsite = normalizeUrl(event.venue?.website);
		if (venueWebsite) {
			return venueWebsite;
		}

		const latitude = Number(event.venue?.lat);
		const longitude = Number(event.venue?.lng ?? event.venue?.long);
		if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
			return `https://maps.google.com/?q=${latitude},${longitude}`;
		}

		return undefined;
	};

	const isAllDayEvent = (value: FeedEvent['all_day']): boolean => value === true || value === 1 || value === '1';

	const getExclusiveEndDate = (endValue: string): string => {
		const dateOnlyMatch = endValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (dateOnlyMatch) {
			const year = Number(dateOnlyMatch[1]);
			const month = Number(dateOnlyMatch[2]);
			const day = Number(dateOnlyMatch[3]);
			const parsedDate = new Date(year, month - 1, day);
			parsedDate.setDate(parsedDate.getDate() + 1);
			return formatDate(parsedDate);
		}

		const parsedEnd = toDate(endValue);
		if (!parsedEnd) {
			return endValue;
		}

		parsedEnd.setDate(parsedEnd.getDate() + 1);
		return formatDate(parsedEnd);
	};

	const mapFeedEvent = (event: FeedEvent) => {
		const start = event.start?.trim();
		if (!start) {
			return null;
		}

		const allDay = isAllDayEvent(event.all_day);
		const hasEnd = !!event.end?.trim();
		let end = hasEnd ? event.end?.trim() : undefined;

		if (allDay && end) {
			end = getExclusiveEndDate(end);
		}

		const startDate = toDate(start);
		const endDate = toDate(end);
		if (allDay && startDate && endDate && endDate <= startDate) {
			const startDateString = start.split('T')[0];
			end = getExclusiveEndDate(startDateString);
		}

		const location = event.venue?.address || event.venue?.name || '';

		return {
			id: String(event.id ?? `${start}-${event.title ?? 'jam'}`),
			title: event.title?.trim() || 'Jam',
			start,
			end,
			allDay,
			url: getEventLink(event),
			backgroundColor: event.color || undefined,
			borderColor: event.color || undefined,
			extendedProps: {
				description: event.desc || '',
				location
			}
		};
	};

	const loadFeedEvents = async (): Promise<FeedEvent[]> => {
		if (eventCache) {
			return eventCache;
		}

		if (pendingRequest) {
			return pendingRequest;
		}

		pendingRequest = (async () => {
			const response = await fetch(EUROPE_JAM_FEED_URL);
			if (!response.ok) {
				throw new Error(`Failed to load European jams feed (${response.status})`);
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
			const description = info.event.extendedProps.description as string | undefined;
			const location = info.event.extendedProps.location as string | undefined;
			const tooltip = [description ? stripHtml(description) : '', location?.trim() || '']
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
					.map(mapFeedEvent)
					.filter((event): event is NonNullable<typeof event> => event !== null)
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
				console.error('Failed to load European jams calendar feed', error);
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
