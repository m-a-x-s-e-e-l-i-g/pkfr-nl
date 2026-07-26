<script lang="ts">
    import CalendarAddSVG from '$lib/components/svg/CalendarAddSVG.svelte';
    import { siteURL } from '$lib/config';
    import { t } from 'svelte-i18n';

    export let feedPath: string;

    const calendarFeedUrl = `https://www.${siteURL}${feedPath}`;
    const webcalFeedUrl = calendarFeedUrl.replace(/^https:/, 'webcal:');
    const googleCalendarUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcalFeedUrl)}`;
</script>

<p class="subscription-note">{$t('calendarSubscriptions.description')}</p>

<div class="calendar-actions" aria-label={$t('calendarSubscriptions.label')}>
    <a
        href={googleCalendarUrl}
        rel="noreferrer"
        target="_blank"
        class="button-secondary action-btn"
    >
        <CalendarAddSVG />
        <span>{$t('calendarSubscriptions.google')}</span>
    </a>

    <a href={webcalFeedUrl} class="button-secondary action-btn">
        <CalendarAddSVG />
        <span>{$t('calendarSubscriptions.ical')}</span>
    </a>
</div>

<style>
    .subscription-note {
        margin: 1.5rem 0 0;
        color: var(--color-muted-foreground);
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .calendar-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 0.75rem;
    }

    .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-height: 3rem;
        padding: 0 1.25rem;
        font-size: 1rem;
        line-height: 1;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        .calendar-actions {
            flex-direction: column;
            gap: 0.75rem;
        }

        .action-btn {
            width: 100%;
        }
    }
</style>
