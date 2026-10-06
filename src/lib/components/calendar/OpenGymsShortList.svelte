<script>
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
    import MapPin from '@lucide/svelte/icons/map-pin';
    import { locale, t } from 'svelte-i18n';
    import { jamDate } from '$lib/jamEvents';
    import { openGymTime } from '$lib/openGymSchedule';

    export let days = [];
    export let unavailable = false;
</script>

{#if unavailable}
    <div class="schedule-unavailable" role="status">
        <p>{$t('openGymSchedule.unavailable')}</p>
        <a href="/open-gyms">{$t('openGymSchedule.viewCalendar')} →</a>
    </div>
{:else}
    <div class="gym-schedule">
        {#each days as day, index (day.date)}
            <section class="schedule-day" aria-labelledby={`gym-day-${day.date}`}>
                <header class="day-header">
                    <div>
                        <h3 id={`gym-day-${day.date}`}>
                            {$t(index === 0 ? 'openGymSchedule.today' : 'openGymSchedule.tomorrow')}
                        </h3>
                        <time datetime={day.date}
                            >{jamDate({ start: day.date, allDay: true }, $locale, {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}</time
                        >
                    </div>
                    {#if day.events.length}
                        <span class="session-count"
                            >{$t('openGymSchedule.sessions', {
                                values: { count: day.events.length }
                            })}</span
                        >
                    {/if}
                </header>
                {#if day.events.length}
                    <ul class="gym-sessions">
                        {#each day.events as event (event.id)}
                            <li>
                                <a
                                    class="gym-session"
                                    href={event.calendarUrl || '/open-gyms'}
                                    target={event.calendarUrl ? '_blank' : undefined}
                                    rel={event.calendarUrl ? 'noopener noreferrer' : undefined}
                                    title={$t(
                                        event.calendarUrl
                                            ? 'openGymSchedule.eventDetails'
                                            : 'openGymSchedule.viewCalendar'
                                    )}
                                >
                                    <div class="session-time">
                                        {#if event.allDay}
                                            <span>{$t('jamAgenda.allDay')}</span>
                                        {:else}
                                            <time datetime={event.start}
                                                >{openGymTime(event, $locale)}</time
                                            >
                                        {/if}
                                    </div>
                                    <div class="session-info">
                                        <h4>{event.title}</h4>
                                        <p>
                                            <MapPin
                                                size={14}
                                                aria-hidden="true"
                                            />{event.location || $t('jamAgenda.locationPending')}
                                        </p>
                                    </div>
                                    <ArrowUpRight
                                        size={17}
                                        class="session-arrow"
                                        aria-hidden="true"
                                    />
                                </a>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p class="empty-day">{$t('openGymSchedule.emptyDay')}</p>
                {/if}
            </section>
        {/each}
    </div>
    <p class="schedule-note">{$t('openGymSchedule.note')}</p>
{/if}

<style>
    .gym-schedule {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem;
        align-items: start;
    }
    .schedule-day {
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        background: var(--color-card);
        overflow: hidden;
        margin: 0;
    }
    .day-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 1rem;
        padding: 1.25rem 1.25rem 1rem;
        border-bottom: 1px solid var(--color-border);
    }
    .day-header h3 {
        margin: 0 0 0.375rem;
        font-family: var(--primaryFont);
        font-size: 1.25rem !important;
        font-weight: 700;
        color: var(--color-foreground);
    }
    .day-header time {
        font-size: 0.8125rem;
        color: var(--color-muted-foreground);
    }
    .session-count {
        padding-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--color-muted-foreground);
        white-space: nowrap;
    }
    .gym-sessions {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .gym-sessions li + li {
        border-top: 1px solid var(--color-border);
    }
    .gym-session {
        display: grid;
        grid-template-columns: 7rem minmax(0, 1fr) 1rem;
        align-items: start;
        gap: 0.875rem;
        padding: 1.125rem 1.25rem;
        color: var(--color-foreground);
        text-decoration: none;
        transition: background-color 160ms;
    }
    .gym-session:hover {
        background: color-mix(in oklch, var(--color-card) 96%, var(--color-primary));
        text-decoration: none;
    }
    .gym-session:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: -3px;
    }
    .session-time {
        padding-top: 0.125rem;
        font-size: 0.8125rem;
        font-weight: 700;
        color: var(--color-primary);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
    }
    .session-info {
        min-width: 0;
    }
    .session-info h4 {
        margin: 0;
        font-family: var(--primaryFont);
        font-size: 0.9375rem !important;
        line-height: 1.4;
        font-weight: 700;
        color: inherit;
        overflow-wrap: anywhere;
    }
    .session-info p {
        display: flex;
        align-items: start;
        gap: 0.375rem;
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        line-height: 1.5;
        color: var(--color-muted-foreground);
        overflow-wrap: anywhere;
    }
    .session-info :global(svg) {
        flex-shrink: 0;
        margin-top: 0.125rem;
    }
    .gym-session :global(.session-arrow) {
        color: var(--color-muted-foreground);
        margin-top: 0.125rem;
    }
    .empty-day {
        margin: 0;
        padding: 1.5rem 1.25rem;
        font-size: 0.875rem;
        color: var(--color-muted-foreground);
    }
    .schedule-note {
        margin: 0.875rem 0 0;
        font-size: 0.75rem;
        line-height: 1.6;
        color: var(--color-muted-foreground);
    }
    .schedule-unavailable {
        padding: 1.5rem;
        border: 1px dashed var(--color-border);
        border-radius: 0.75rem;
    }
    .schedule-unavailable p {
        margin: 0 0 0.75rem;
        color: var(--color-muted-foreground);
    }
    .schedule-unavailable a {
        color: var(--color-primary);
        font-weight: 600;
    }
    @media (max-width: 55rem) {
        .gym-schedule {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }
    @media (max-width: 30rem) {
        .day-header {
            padding: 1rem;
        }
        .gym-session {
            grid-template-columns: minmax(0, 1fr) 1rem;
            gap: 0.375rem 0.75rem;
            padding: 1rem;
        }
        .session-time {
            font-size: 0.75rem;
            grid-column: 1;
            grid-row: 1;
        }
        .session-info {
            display: contents;
        }
        .session-info h4 {
            grid-column: 1;
            grid-row: 2;
        }
        .session-info p {
            grid-column: 1 / -1;
            grid-row: 3;
            margin-top: 0.125rem;
        }
        .gym-session :global(.session-arrow) {
            grid-column: 2;
            grid-row: 1 / 3;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .gym-session {
            transition: none;
        }
    }
</style>
