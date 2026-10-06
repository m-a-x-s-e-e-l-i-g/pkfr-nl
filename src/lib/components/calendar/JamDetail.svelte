<script>
    import ArrowLeft from '@lucide/svelte/icons/arrow-left';
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
    import CalendarDays from '@lucide/svelte/icons/calendar-days';
    import CalendarPlus from '@lucide/svelte/icons/calendar-plus';
    import Clock from '@lucide/svelte/icons/clock';
    import MapPin from '@lucide/svelte/icons/map-pin';
    import { locale, t } from 'svelte-i18n';
    import {
        googleEventUrl,
        jamDate,
        jamDateRange,
        jamAgendaPath,
        jamTime,
        isPastJam,
        mapsUrl
    } from '$lib/jamEvents';
    export let event;
    export let now = Date.now();
    $: past = isPastJam(event, new Date(now));
    $: agendaKey =
        event.region === 'europe'
            ? 'jamsEurope'
            : event.region === 'america'
              ? 'jamsAmerica'
              : 'jams';
</script>

<a class="back-link" href={jamAgendaPath(event)}
    ><ArrowLeft size={18} aria-hidden="true" />{$t(
        event.region ? `${agendaKey}.calendarTitle` : 'jamAgenda.back'
    )}</a
>

<article class="jam-detail">
    {#if past}
        <section class="past-event" aria-labelledby="past-event-title">
            <div>
                <h2 id="past-event-title">{$t('jamAgenda.pastTitle')}</h2>
                <p>{$t('jamAgenda.pastDescription')}</p>
            </div>
            <a href={jamAgendaPath(event)}
                >{$t('jamAgenda.upcomingAction')} <ArrowUpRight size={18} aria-hidden="true" /></a
            >
        </section>
    {/if}
    <header class="event-heading">
        <time class="date-poster" datetime={event.start} aria-label={jamDateRange(event, $locale)}>
            <span>{jamDate(event, $locale, { weekday: 'long' })}</span>
            <strong>{jamDate(event, $locale, { day: '2-digit' })}</strong>
            <span>{jamDate(event, $locale, { month: 'long', year: 'numeric' })}</span>
        </time>
        <div class="heading-copy">
            <span class="eyebrow">{$t(`${agendaKey}.heading`)}</span>
            <h1>{event.title}</h1>
            <p>{jamDateRange(event, $locale)}</p>
        </div>
    </header>

    <div class="event-body">
        <section class="event-description" aria-labelledby="about-event">
            <h2 id="about-event">{$t('jamAgenda.about')}</h2>
            {#if event.descriptionText}
                <div class="description-content">{@html event.description}</div>
            {:else}
                <p class="missing-info">{$t('jamAgenda.descriptionPending')}</p>
            {/if}
        </section>

        <aside class="event-practical" aria-label={$t('jamAgenda.practical')}>
            <h2>{$t('jamAgenda.practical')}</h2>
            <dl>
                <div>
                    <dt><CalendarDays size={18} aria-hidden="true" />{$t('jamAgenda.date')}</dt>
                    <dd>{jamDateRange(event, $locale)}</dd>
                </div>
                <div>
                    <dt><Clock size={18} aria-hidden="true" />{$t('jamAgenda.time')}</dt>
                    <dd>{event.allDay ? $t('jamAgenda.allDay') : jamTime(event, $locale)}</dd>
                    {#if !event.allDay}<dd class="time-zone">
                            {event.region && event.timeZone === 'UTC'
                                ? event.sourceTimeZone || $t('jamAgenda.sourceTime')
                                : $t('jamAgenda.localTime')}
                        </dd>{/if}
                </div>
                <div>
                    <dt><MapPin size={18} aria-hidden="true" />{$t('jamAgenda.location')}</dt>
                    <dd>{event.location || $t('jamAgenda.locationPending')}</dd>
                    {#if event.location}
                        <dd>
                            <a
                                class="map-link"
                                href={mapsUrl(event.location)}
                                target="_blank"
                                rel="noreferrer"
                                >{$t('jamAgenda.openMap')}
                                <ArrowUpRight size={16} aria-hidden="true" /></a
                            >
                        </dd>
                    {/if}
                </div>
            </dl>
            {#if !past && (!event.region || event.timeZone !== 'UTC' || event.sourceTimeZone)}
                <a
                    class="calendar-button"
                    href={googleEventUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    ><CalendarPlus size={18} aria-hidden="true" />{$t('events.addToCalendar')}</a
                >
            {/if}
            {#if event.url || event.calendarUrl}
                <a
                    class="source-link"
                    href={event.url || event.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    >{$t(event.region ? 'jamAgenda.eventSource' : 'jamAgenda.calendarSource')}
                    <ArrowUpRight size={16} aria-hidden="true" /></a
                >
            {/if}
        </aside>
    </div>
</article>

<style>
    .past-event {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem 2rem;
        padding: 1.25rem 1.5rem;
        margin-bottom: 2rem;
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        background: var(--color-muted);
    }
    .past-event h2 {
        margin: 0 0 0.375rem;
        font-size: 1.125rem !important;
        color: var(--color-foreground);
    }
    .past-event p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-muted-foreground);
    }
    .past-event a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 2.75rem;
        color: var(--color-primary);
        font-size: 0.875rem;
        font-weight: 700;
        text-decoration: none;
    }
    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        color: var(--color-muted-foreground);
        font-size: 0.875rem;
        text-decoration: none;
    }
    .back-link:hover {
        color: var(--color-primary);
    }
    .jam-detail {
        margin: 0;
    }
    .event-heading {
        display: grid;
        grid-template-columns: 9rem minmax(0, 1fr);
        align-items: center;
        gap: 2rem;
        padding-bottom: 2.5rem;
        border-bottom: 1px solid var(--color-border);
    }
    .date-poster {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
        padding: 1.5rem 0.5rem;
        border-radius: 0.5rem;
        background: var(--color-primary);
        color: var(--color-primary-foreground);
        text-align: center;
        line-height: 1.2;
        font-family: var(--primaryFont);
    }
    .date-poster span {
        font-size: 0.75rem;
    }
    .date-poster strong {
        font-size: 4rem;
        letter-spacing: -0.07em;
        font-weight: 800;
        line-height: 1;
    }
    .eyebrow {
        color: var(--color-primary);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
    .heading-copy h1 {
        margin: 0.75rem 0 1rem;
        padding: 0;
        color: var(--color-foreground);
        overflow-wrap: anywhere;
        font-size: clamp(1.75rem, 4vw, 2.75rem) !important;
    }
    .heading-copy p {
        margin: 0;
        font-size: 1rem;
        color: var(--color-muted-foreground);
    }
    .event-body {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 15rem;
        align-items: start;
        gap: 2.5rem;
        padding-top: 2.5rem;
    }
    .event-body h2 {
        margin: 0 0 1.25rem;
        color: var(--color-foreground);
        font-size: 1.25rem !important;
    }
    .event-description {
        min-width: 0;
        margin: 0;
    }
    .description-content {
        white-space: pre-line;
        overflow-wrap: anywhere;
        font-size: 1rem;
        color: var(--color-foreground);
        line-height: 1.75;
    }
    .description-content :global(p) {
        margin: 0 0 1rem;
        font-size: 1rem;
    }
    .description-content :global(a) {
        color: var(--color-primary);
        text-decoration: underline;
        text-underline-offset: 3px;
    }
    .description-content :global(ul),
    .description-content :global(ol) {
        padding-left: 1.25rem;
        font-size: 1rem;
    }
    .description-content :global(blockquote) {
        border: 1px solid var(--color-border);
        padding: 1rem;
        margin: 1rem 0;
        background: var(--color-muted);
    }
    .missing-info {
        margin: 0;
        font-size: 1rem;
        color: var(--color-muted-foreground);
    }
    .event-practical {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        background: var(--color-card);
    }
    dl {
        display: grid;
        gap: 1.25rem;
        margin: 0;
    }
    dt {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-muted-foreground);
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0.375rem;
    }
    dd {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-foreground);
        line-height: 1.6;
        overflow-wrap: anywhere;
    }
    .time-zone {
        font-size: 0.6875rem;
        color: var(--color-muted-foreground);
    }
    .map-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--color-primary);
        font-size: 0.75rem;
        margin-top: 0.5rem;
    }
    .calendar-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1.75rem;
        padding: 0.875rem 0.625rem;
        border-radius: 0.375rem;
        background: var(--color-primary);
        color: var(--color-primary-foreground);
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.4;
        text-decoration: none;
    }
    .calendar-button :global(svg) {
        flex-shrink: 0;
    }
    .calendar-button:hover {
        background: color-mix(in oklch, var(--color-primary) 85%, var(--color-foreground));
    }
    .source-link {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        margin-top: 1rem;
        color: var(--color-muted-foreground);
        font-size: 0.6875rem;
        text-decoration: none;
    }
    a:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 4px;
    }
    @media (max-width: 48rem) {
        .event-heading {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: 1rem;
            padding-bottom: 1.5rem;
        }
        .date-poster {
            padding: 1rem 0.25rem;
        }
        .date-poster strong {
            font-size: 2.75rem;
        }
        .date-poster span {
            font-size: 0.625rem;
        }
        .heading-copy h1 {
            font-size: 1.5rem !important;
            margin-block: 0.5rem;
        }
        .heading-copy p {
            font-size: 0.875rem;
        }
        .event-body {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
            padding-top: 1.5rem;
        }
        .event-practical {
            grid-row: 1;
        }
    }
</style>
