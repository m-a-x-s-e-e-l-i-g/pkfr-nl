<script>
    import { Image } from '@unpic/svelte';
    import { locale, t } from 'svelte-i18n';
    import { ArrowLeft, ArrowUpRight, MapPin, CalendarDays, ChevronRight } from '@lucide/svelte';
    import { gymPath, gymDescription, gymMapUrl } from '$lib/gymDetails';
    import { openGymTime } from '$lib/openGymSchedule';

    let { data } = $props();
    let selectedPhoto = $state(0);
    const gym = $derived(data.gym);
    $effect(() => {
        // Client navigation reuses this component for another gym.
        if (gym.slug) selectedPhoto = 0;
    });
    const language = $derived($locale === 'en' ? 'en' : 'nl');
    const dateLabel = (value) =>
        new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'nl-NL', {
            timeZone: 'Europe/Amsterdam',
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        }).format(new Date(value));
    const reviewedLabel = $derived(
        new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        }).format(new Date(`${gym.reviewedAt}T12:00:00Z`))
    );
</script>

<nav class="gym-breadcrumb" aria-label={$t('gymDetails.breadcrumb')}>
    <a href="/tools/gym-finder"><ArrowLeft size={16} /> Gym Finder</a>
    <ChevronRight size={14} aria-hidden="true" />
    <span>{gym.city}</span>
</nav>

<article class="gym-detail">
    <header class="gym-header">
        <p class="eyebrow">{$t('gymDetails.eyebrow')} · {gym.city}</p>
        <h1>{gym.name}</h1>
        <p class="gym-intro">{gymDescription(gym, language)}</p>
        <a class="address-link" href="#visit"><MapPin size={18} /> {gym.address}</a>
        <div class="hero-actions">
            <a class="button" href={gym.website} target="_blank" rel="noopener noreferrer">
                {$t('gymDetails.officialWebsite')}
                <ArrowUpRight size={18} />
            </a>
            {#if !gym.locationUnconfirmed}
                <a
                    class="direction-link"
                    href={gymMapUrl(gym)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {$t('gymDetails.directions')}
                    <ArrowUpRight size={16} />
                </a>
            {/if}
        </div>
    </header>

    <section class="gym-gallery" aria-label={$t('gymDetails.photos')}>
        <figure class="main-photo">
            <Image
                src={`/${gym.images[selectedPhoto]}`}
                width={960}
                height={720}
                layout="constrained"
                alt={`${gym.name} — ${$t('gymDetails.photo')} ${selectedPhoto + 1}`}
                priority
                cdn={import.meta.env.DEV ? undefined : 'netlify'}
            />
            <figcaption>{selectedPhoto + 1} / {gym.images.length}</figcaption>
        </figure>
        {#if gym.images.length > 1}
            <div class="photo-picker">
                {#each gym.images as photo, index}
                    <button
                        type="button"
                        aria-label={`${$t('gymDetails.showPhoto')} ${index + 1}`}
                        aria-pressed={selectedPhoto === index}
                        onclick={() => (selectedPhoto = index)}
                    >
                        <Image
                            src={`/${photo}`}
                            width={128}
                            height={96}
                            layout="constrained"
                            alt=""
                            loading="lazy"
                            cdn={import.meta.env.DEV ? undefined : 'netlify'}
                        />
                    </button>
                {/each}
            </div>
        {/if}
    </section>

    {#if gym.note}
        <aside class="source-notice">
            <strong>{$t('gymDetails.locationNotice')}</strong>
            <p>{gym.note[language]}</p>
        </aside>
    {/if}

    <div class="gym-body">
        <div class="gym-programme">
            {#if gym.features.length}
                <section class="facilities" aria-labelledby="facilities-title">
                    <h2 id="facilities-title">{$t('gymDetails.facilities')}</h2>
                    <ul class="feature-list">
                        {#each gym.features as feature}<li>
                                {$t(`gymDetails.features.${feature}`)}
                            </li>{/each}
                    </ul>
                </section>
            {/if}
            <section class="sessions" aria-labelledby="sessions-title">
                <div class="section-heading">
                    <h2 id="sessions-title">{$t('gymDetails.sessions')}</h2>
                    <CalendarDays size={22} aria-hidden="true" />
                </div>
                <p class="section-intro">{$t('gymDetails.sessionRange')}</p>
                {#if data.openGymUnavailable}
                    <p class="empty-sessions" role="status">{$t('gymDetails.unavailable')}</p>
                {:else if data.sessions.length}
                    <ul class="session-list">
                        {#each data.sessions as session}
                            <li>
                                <div class="session-date">
                                    <time datetime={session.start}>{dateLabel(session.start)}</time>
                                    <span>{openGymTime(session, language)}</span>
                                </div>
                                <div class="session-name">
                                    <strong>{session.title}</strong>
                                    {#if session.calendarUrl}
                                        <a
                                            href={session.calendarUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {$t('gymDetails.sessionDetails')}
                                            <ArrowUpRight size={14} />
                                        </a>
                                    {/if}
                                </div>
                            </li>
                        {/each}
                    </ul>
                    <p class="booking-note">{$t('gymDetails.registration')}</p>
                {:else}
                    <p class="empty-sessions">{$t('gymDetails.noSessions')}</p>
                {/if}
                <a class="text-link" href="/open-gyms"
                    >{$t('gymDetails.allSessions')} <ChevronRight size={16} /></a
                >
            </section>
        </div>

        <aside class="visit" id="visit" aria-labelledby="visit-title">
            <h2 id="visit-title">{$t('gymDetails.planVisit')}</h2>
            <p class="visit-address"><MapPin size={20} /><span>{gym.address}</span></p>
            {#if gym.locationUnconfirmed}<p class="small-note">
                    {$t('gymDetails.addressUnconfirmed')}
                </p>{/if}
            <a class="visit-link" href={gym.website} target="_blank" rel="noopener noreferrer">
                {$t('gymDetails.schedulePrices')}
                <ArrowUpRight size={16} />
            </a>
            {#if !gym.locationUnconfirmed}
                <a
                    class="visit-link"
                    href={gymMapUrl(gym)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {$t('gymDetails.directions')}
                    <ArrowUpRight size={16} />
                </a>
            {/if}
            <p class="small-note">{$t('gymDetails.checkBeforeVisit')}</p>
            <div class="sources">
                <h3>{$t('gymDetails.sources')}</h3>
                <ul>
                    {#each gym.sources as source}
                        <li>
                            <a href={source} target="_blank" rel="noopener noreferrer"
                                >{new URL(source).hostname.replace(/^www\./, '')}{new URL(source)
                                    .pathname === '/'
                                    ? ''
                                    : new URL(source).pathname}
                                <ArrowUpRight size={12} /></a
                            >
                        </li>
                    {/each}
                </ul>
                <p>
                    {$t('gymDetails.reviewed')}
                    <time datetime={gym.reviewedAt}>{reviewedLabel}</time>
                </p>
            </div>
        </aside>
    </div>

    <section class="nearby" aria-labelledby="nearby-title">
        <div class="section-heading">
            <h2 id="nearby-title">{$t('gymDetails.nearby')}</h2>
            <a href="/tools/gym-finder">{$t('gymDetails.allGyms')}</a>
        </div>
        <ul>
            {#each data.nearbyGyms as other}
                <li>
                    <a href={gymPath(other)}>
                        <div>
                            <strong>{other.name}</strong><span
                                >{other.city} · {other.distance.toFixed(1)} km {$t(
                                    'gymDetails.straightLine'
                                )}</span
                            >
                        </div>
                        <ChevronRight size={20} />
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</article>

<style>
    .gym-breadcrumb {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.625rem;
        margin-bottom: 2rem;
        font-size: 0.875rem;
        color: var(--color-muted-foreground);
    }
    .gym-breadcrumb a,
    .address-link,
    .hero-actions a,
    .text-link,
    .visit-link,
    .session-name a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    .gym-detail {
        color: var(--color-foreground);
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 2.5rem;
        align-items: start;
    }
    .gym-header {
        align-self: center;
    }
    .source-notice,
    .gym-body,
    .nearby {
        grid-column: 1 / -1;
    }
    .eyebrow {
        color: var(--color-muted-foreground);
        margin: 0 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
    }
    .gym-header h1 {
        color: var(--color-foreground);
        padding: 0;
        margin: 0 0 1rem;
        line-height: 1.12;
    }
    .gym-intro {
        max-width: 62ch;
        margin: 0 0 1.25rem;
        font-size: 1.125rem;
        line-height: 1.7;
    }
    .address-link {
        font-size: 0.9375rem;
    }
    .hero-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem 1.5rem;
        margin-top: 1.5rem;
    }
    .hero-actions .button {
        margin: 0;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        box-shadow: none;
    }
    .direction-link {
        font-weight: 600;
    }
    .main-photo {
        position: relative;
        display: grid;
        place-items: center;
        margin: 0;
        background: var(--color-muted);
        border: 1px solid var(--color-border);
        border-radius: 0.875rem;
        overflow: hidden;
        aspect-ratio: 4/3;
    }
    .main-photo :global(img) {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    figcaption {
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;
        background: var(--color-card);
        color: var(--color-foreground);
        padding: 0.25rem 0.75rem;
        border-radius: 2rem;
        font-size: 0.8125rem;
        font-variant-numeric: tabular-nums;
    }
    .photo-picker {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding: 0.75rem 0.125rem;
    }
    .photo-picker button {
        flex: 0 0 5rem;
        border: 2px solid transparent;
        background: var(--color-muted);
        padding: 0;
        border-radius: 0.5rem;
        overflow: hidden;
        cursor: pointer;
    }
    .photo-picker button[aria-pressed='true'] {
        border-color: var(--color-primary);
    }
    .photo-picker :global(img) {
        aspect-ratio: 4/3;
        width: 100%;
        object-fit: cover;
    }
    a:focus-visible,
    button:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 4px;
    }
    .source-notice {
        padding: 1rem 1.25rem;
        border: 1px solid var(--color-border);
        background: var(--color-muted);
        border-radius: 0.75rem;
    }
    .source-notice p {
        margin: 0.375rem 0 0;
        font-size: 0.9375rem;
    }
    .gym-body {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 0.75fr);
        gap: 2.5rem;
        align-items: start;
    }
    h2 {
        color: var(--color-foreground);
        margin: 0 0 1rem;
        font-size: 1.375rem !important;
    }
    .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .feature-list li {
        border: 1px solid var(--color-border);
        border-radius: 2rem;
        padding: 0.25rem 0.75rem;
        font-size: 0.8125rem;
    }
    .sessions {
        margin-top: 2.5rem;
    }
    .section-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    .section-heading h2 {
        margin: 0;
    }
    .section-intro,
    .booking-note,
    .empty-sessions {
        color: var(--color-muted-foreground);
        font-size: 0.875rem;
    }
    .section-intro {
        margin: 0.5rem 0 1rem;
    }
    .session-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .session-list li {
        display: grid;
        grid-template-columns: 7rem minmax(0, 1fr);
        gap: 1rem;
        padding: 1rem 0;
        border-top: 1px solid var(--color-border);
    }
    .session-date,
    .session-name {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .session-date time {
        font-weight: 700;
        font-size: 0.875rem;
    }
    .session-date span,
    .session-name a {
        font-size: 0.8125rem;
    }
    .session-date span {
        font-variant-numeric: tabular-nums;
        color: var(--color-muted-foreground);
    }
    .session-name strong {
        font-size: 0.875rem;
    }
    .text-link {
        font-weight: 600;
        font-size: 0.875rem;
        margin-top: 0.75rem;
    }
    .visit {
        padding: 1.5rem;
        background: var(--color-card);
        border: 1px solid var(--color-border);
        border-radius: 0.875rem;
        scroll-margin-top: 6rem;
    }
    .visit-address {
        display: flex;
        align-items: start;
        gap: 0.625rem;
        margin: 0 0 1.25rem;
    }
    .visit-address :global(svg) {
        flex-shrink: 0;
        margin-top: 0.25rem;
    }
    .visit-link {
        width: 100%;
        justify-content: space-between;
        padding: 0.625rem 0;
        font-weight: 600;
        font-size: 0.875rem;
    }
    .small-note {
        margin: 1rem 0 0;
        font-size: 0.8125rem;
        color: var(--color-muted-foreground);
    }
    .sources {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-border);
    }
    .sources h3 {
        font-size: 0.8125rem !important;
        margin: 0 0 0.5rem;
        color: var(--color-foreground);
    }
    .sources ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .sources a {
        font-size: 0.75rem;
        overflow-wrap: anywhere;
    }
    .sources :global(svg) {
        display: inline;
    }
    .sources p {
        font-size: 0.75rem;
        color: var(--color-muted-foreground);
        margin: 0.75rem 0 0;
    }
    .nearby {
        padding-top: 2rem;
        border-top: 1px solid var(--color-border);
    }
    .nearby .section-heading > a {
        font-size: 0.8125rem;
    }
    .nearby ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
    }
    .nearby li + li {
        border-top: 1px solid var(--color-border);
    }
    .nearby li a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 0;
        color: var(--color-foreground);
    }
    .nearby li div {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .nearby li span {
        font-size: 0.8125rem;
        color: var(--color-muted-foreground);
    }
    @media (max-width: 900px) {
        .gym-detail {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
        }
    }
    @media (max-width: 640px) {
        .gym-body {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
        }
        .gym-intro {
            font-size: 1rem;
        }
        .gym-header h1 {
            font-size: clamp(1.875rem, 8vw, 2.5rem) !important;
        }
        .hero-actions {
            align-items: stretch;
            gap: 1rem;
        }
        .hero-actions .button {
            justify-content: center;
            width: 100%;
        }
        .direction-link {
            padding: 0.5rem 0;
        }
        .gym-breadcrumb {
            margin-bottom: 1.5rem;
        }
        .visit {
            padding: 1.25rem;
        }
        .nearby .section-heading {
            align-items: start;
            flex-wrap: wrap;
        }
    }
</style>
