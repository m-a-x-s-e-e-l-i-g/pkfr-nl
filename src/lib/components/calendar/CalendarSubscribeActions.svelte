<script lang="ts">
    import CalendarAddSVG from '$lib/components/svg/CalendarAddSVG.svelte';
    import DownloadSVG from '$lib/components/svg/DownloadSVG.svelte';
    import { siteURL } from '$lib/config';
    import { t } from 'svelte-i18n';

    export let feedPath: string;

    const calendarFeedUrl = `https://www.${siteURL}${feedPath}`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarFeedUrl)}`;
</script>

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

    <a href={calendarFeedUrl} rel="noreferrer" target="_blank" class="button-secondary action-btn">
        <DownloadSVG />
        <span>{$t('calendarSubscriptions.ical')}</span>
    </a>
</div>

<style>
    .calendar-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1.5rem;
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
