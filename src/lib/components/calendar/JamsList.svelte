<script>
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
    import Clock from '@lucide/svelte/icons/clock';
    import CalendarDays from '@lucide/svelte/icons/calendar-days';
    import MapPin from '@lucide/svelte/icons/map-pin';
    import { locale, t } from 'svelte-i18n';
    import { jamDate, jamDateRange, jamMonthKey, jamPath, jamTime } from '$lib/jamEvents';
    export let events = [];
    export let calendarUnavailable = false;
    $: groups = events.reduce((months, event) => {
        const key = jamMonthKey(event);
        const last = months[months.length - 1];
        if (last?.key === key) last.events.push(event);
        else months.push({ key, events: [event] });
        return months;
    }, []);
</script>

{#if calendarUnavailable}
    <div class="agenda-state" role="status">
        <h3>{$t('jamAgenda.unavailableTitle')}</h3>
        <p>{$t('jamAgenda.unavailableDescription')}</p>
        <a href="/jams" data-sveltekit-reload>{$t('jamAgenda.retry')} →</a>
    </div>
{:else if !events.length}
    <div class="agenda-state">
        <h3>{$t('jamAgenda.emptyTitle')}</h3>
        <p>{$t('jamAgenda.emptyDescription')}</p>
        <a href="/jams#submit-jam">{$t('jams.submitTitle')} →</a>
    </div>
{:else}
    <div class="jam-agenda">
        {#each groups as group (group.key)}
            <section
                class="month-group"
                aria-label={jamDate(group.events[0], $locale, { month: 'long', year: 'numeric' })}
            >
                <h3 class="month-heading">
                    {jamDate(group.events[0], $locale, { month: 'long', year: 'numeric' })}
                </h3>
                <div class="month-events">
                    {#each group.events as event (event.id)}
                        <a
                            class="jam-entry"
                            class:next-jam={event.id === events[0].id}
                            href={jamPath(event)}
                        >
                            <time
                                class="date-stamp"
                                datetime={event.start}
                                aria-label={jamDateRange(event, $locale)}
                            >
                                <span class="date-weekday"
                                    >{jamDate(event, $locale, { weekday: 'short' })}</span
                                >
                                <span class="date-day"
                                    >{jamDate(event, $locale, { day: '2-digit' })}</span
                                >
                                <span class="date-month"
                                    >{jamDate(event, $locale, { month: 'short' })}</span
                                >
                            </time>
                            <div class="entry-content">
                                {#if event.id === events[0].id}<span class="next-label"
                                        >{$t('jamAgenda.next')}</span
                                    >{/if}
                                <h4>{event.title}</h4>
                                <div class="event-meta">
                                    {#if jamDateRange(event, $locale).includes(' – ')}
                                        <span
                                            ><CalendarDays
                                                size={16}
                                                aria-hidden="true"
                                            />{jamDateRange(event, $locale)}</span
                                        >
                                    {/if}
                                    <span
                                        ><Clock size={16} aria-hidden="true" />{event.allDay
                                            ? $t('jamAgenda.allDay')
                                            : jamTime(event, $locale)}</span
                                    >
                                    <span
                                        ><MapPin size={16} aria-hidden="true" />{event.location ||
                                            $t('jamAgenda.locationPending')}</span
                                    >
                                </div>
                                {#if event.excerpt}<p class="event-excerpt">{event.excerpt}</p>{/if}
                                <span class="detail-link"
                                    >{$t('jamAgenda.viewEvent')}
                                    <ArrowUpRight size={16} aria-hidden="true" /></span
                                >
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        {/each}
    </div>
{/if}

<style>
    .jam-agenda {
        display: grid;
        gap: 2.5rem;
    }
    .month-group {
        margin: 0;
    }
    .month-heading {
        margin: 0 0 0.875rem;
        font-family: var(--primaryFont);
        font-size: 0.875rem !important;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-muted-foreground);
    }
    .month-events {
        display: grid;
        gap: 0.75rem;
    }
    .jam-entry {
        display: grid;
        grid-template-columns: 5rem minmax(0, 1fr);
        align-items: start;
        gap: 1.5rem;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        background: var(--color-card);
        color: var(--color-foreground);
        text-decoration: none;
        transition:
            border-color 160ms,
            background-color 160ms;
    }
    .jam-entry:hover {
        text-decoration: none;
        border-color: var(--color-primary);
        background: color-mix(in oklch, var(--color-card) 97%, var(--color-primary));
    }
    .jam-entry:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 4px;
    }
    .next-jam {
        padding-block: 2rem;
        border-color: color-mix(in oklch, var(--color-primary) 35%, var(--color-border));
        background: color-mix(in oklch, var(--color-card) 96%, var(--color-primary));
    }
    .date-stamp {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.125rem;
        padding: 0.625rem 0.25rem;
        border-radius: 0.375rem;
        background: var(--color-muted);
        font-family: var(--primaryFont);
        color: var(--color-foreground);
        line-height: 1.2;
    }
    .next-jam .date-stamp {
        background: var(--color-primary);
        color: var(--color-primary-foreground);
    }
    .date-weekday,
    .date-month {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }
    .date-day {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.06em;
        font-variant-numeric: tabular-nums;
    }
    .entry-content {
        display: grid;
        gap: 0.625rem;
        min-width: 0;
    }
    .next-label {
        color: var(--color-primary);
        font-size: 0.75rem;
        font-weight: 700;
    }
    .entry-content h4 {
        margin: 0;
        font-size: 1.25rem !important;
        font-weight: 700;
        line-height: 1.3;
        color: inherit;
        overflow-wrap: anywhere;
    }
    .next-jam h4 {
        font-size: 1.5rem !important;
    }
    .event-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem 1rem;
        font-size: 0.8125rem;
        color: var(--color-muted-foreground);
    }
    .event-meta span {
        display: inline-flex;
        align-items: baseline;
        gap: 0.375rem;
        min-width: 0;
        overflow-wrap: anywhere;
    }
    .event-meta :global(svg) {
        flex-shrink: 0;
        align-self: start;
        margin-top: 0.25rem;
    }
    .event-excerpt {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--color-muted-foreground);
        overflow-wrap: anywhere;
    }
    .detail-link {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--color-primary);
        font-size: 0.8125rem;
        font-weight: 600;
        margin-top: 0.125rem;
    }
    .agenda-state {
        padding: 2rem;
        border: 1px dashed var(--color-border);
        border-radius: 0.75rem;
    }
    .agenda-state h3 {
        margin: 0 0 0.75rem;
        font-size: 1.25rem !important;
    }
    .agenda-state p {
        color: var(--color-muted-foreground);
        font-size: 1rem;
    }
    .agenda-state a {
        color: var(--color-primary);
        font-size: 1rem;
        font-weight: 600;
    }
    @media (max-width: 40rem) {
        .jam-entry {
            grid-template-columns: 3.5rem minmax(0, 1fr);
            gap: 0.875rem;
            padding: 1.125rem 0.875rem;
        }
        .date-day {
            font-size: 2rem;
        }
        .entry-content h4,
        .next-jam h4 {
            font-size: 1.125rem !important;
        }
        .event-meta {
            flex-direction: column;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .jam-entry {
            transition: none;
        }
    }
</style>
