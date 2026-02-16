<script>
    import { t } from 'svelte-i18n';

    // Props
    // Placelists data with metadata for filtering
    export let placelists = [
        {
            name: 'Parkour Spots NL (400+)',
            url: 'https://www.google.com/maps/d/u/0/viewer?mid=1F8PHbPAtHhj4RaCQzbsw6Ko6FE0&hl=en&ll=52.13281486226002%2C5.623986124992371&z=7',
            country: 'Netherlands',
            author: 'Max Seelig'
        },
        {
            name: 'Parkour Spots',
            url: 'https://maps.app.goo.gl/RPoC8Hwed7iDC7229',
            country: 'Netherlands',
            author: 'Koen Bangert'
        },
        {
            name: 'Arnhem',
            url: 'https://goo.gl/maps/9iFURfmBfMFrMLBD7',
            country: 'Netherlands',
            author: 'Grip Freerunning'
        },
        {
            name: 'Deventer',
            url: 'https://goo.gl/maps/CGsQZCD8nGYh3cRV6',
            country: 'Netherlands',
            author: 'Grip Freerunning'
        },
        {
            name: 'Utrecht',
            url: 'https://goo.gl/maps/TwaUDmqmbbH9FEnk8',
            country: 'Netherlands',
            author: 'Grip Freerunning'
        },
        {
            name: 'Nijmegen',
            url: 'https://goo.gl/maps/dRLEhwWfAVRhPvhe6',
            country: 'Netherlands',
            author: 'Grip Freerunning'
        },
        {
            name: 'Zutphen',
            url: 'https://goo.gl/maps/oTGv3nYKfbD8XPbYA',
            country: 'Netherlands',
            author: 'Grip Freerunning'
        },
        {
            name: 'Favorites (350+)',
            url: 'https://goo.gl/maps/AbnzZDiUjxiy1YDK7',
            country: 'Netherlands',
            author: 'Johan Vereijken'
        },
        {
            name: 'Parkour spots (380+)',
            url: 'https://goo.gl/maps/khFcMNSZaQBrBuLx5',
            country: 'Netherlands',
            author: 'Olivier Koster'
        },
        {
            name: 'Amsterdam is Dead non-spot tour 2024',
            url: 'https://maps.app.goo.gl/UKweDgNVvEpJQakSA',
            country: 'Netherlands',
            author: 'Fé'
        },
        {
            name: 'Spots to Hit in Amsterdam (230+)',
            url: 'https://maps.app.goo.gl/5WcDufx7Nsk9Z4in7',
            country: 'Netherlands',
            author: 'Safier Elzinga'
        },
        {
            name: 'Adapt 2024 Twente University challenges',
            url: 'https://www.google.com/maps/d/edit?mid=17skoWhjed0NLu3-d92pRL7BbWL-lLG8',
            country: 'Netherlands',
            author: 'Lars Damink'
        },
        {
            name: 'Prague',
            url: 'https://maps.app.goo.gl/EvSmPa2pHQXKt66n6?g_st=ac',
            country: 'Czech Republic',
            author: 'Grip Freerunning'
        },
        {
            name: 'Prague + Czech',
            url: 'https://goo.gl/maps/6X3EarLxnqF9nZnv6?g_st=ac',
            country: 'Czech Republic',
            author: 'Mikeš Kořínek'
        },
        {
            name: 'ADAPT 2025 Enschede',
            url: 'https://goo.gl/maps/5Ft1ryaDztp4T1NL8?g_st=ac',
            country: 'Netherlands',
            author: 'Lars Damink'
        },
        {
            name: 'Berlin',
            url: 'https://goo.gl/maps/Kan5NujQb1EcJL3z9?g_st=ac',
            country: 'Germany',
            author: 'parkourberlin.de'
        },
        {
            name: 'Malta',
            url: 'https://www.google.com/maps/d/u/0/viewer?mid=179s3NuwEe8lVkM1N-3AhXErusF4WLts2',
            country: 'Malta',
            author: 'Cool guy'
        },
        {
            name: 'Lisbon',
            url: 'https://maps.app.goo.gl/Z2NQNCNXQDSCPo8A6?g_st=i',
            country: 'Portugal',
            author: 'Max Condon'
        },
        {
            name: 'Lisbon (Portugal) Lite Spot map',
            url: 'https://www.google.com/maps/d/u/0/edit?mid=1yEHlogSERAvJt30LtIoLQdrFi0GRfMo',
            country: 'Portugal',
            author: 'Jair Almeda'
        },
        {
            name: 'Spots de Portugal',
            url: 'https://goo.gl/maps/Gya76BBcVWKNgsfb7',
            country: 'Portugal',
            author: 'parkour.pt'
        },
        {
            name: 'Wuppertal',
            url: 'https://www.google.com/maps/d/u/0/viewer?mid=1exoRlXCqp_tDsnALO579V0wC_EcEKso',
            country: 'Germany',
            author: 'Hans Schmidt'
        },
        {
            name: 'FRBodensee Festival',
            url: 'https://maps.app.goo.gl/1a8aCea1s2rN6Z5H8?g_st=ac',
            country: 'Germany',
            author: 'Jonas Metzger'
        },
        {
            name: 'FreeGrunn Veendam',
            url: 'https://maps.app.goo.gl/hxiQqciZGPzAY5Lb7?g_st=ic',
            country: 'Netherlands',
            author: 'Flexbeweging'
        },
        {
            name: 'FreeGrunn Groningen',
            url: 'https://www.google.com/maps/d/edit?mid=1r00q3rS8Bta2sn_90vZsL-j8sO7MD9c&usp=share_link',
            country: 'Netherlands',
            author: 'Lennard Koops'
        },
        {
            name: 'Göttingen Z Campus Mini Spots',
            url: 'https://maps.app.goo.gl/M5HRYycDGK6tZM3G8',
            country: 'Germany',
            author: 'Lennart Jakob'
        },
        {
            name: 'Göttingen, Kassel, Hannover, Hamburg',
            url: 'https://maps.app.goo.gl/Jh4271PCrVZCbqvp6?g_st=iw',
            country: 'Germany',
            author: 'Lennart Jakob'
        },
        {
            name: 'Freerun Gyms NL',
            url: 'https://maps.app.goo.gl/4n4oQeJ4FysKAkcy5?g_st=ac',
            country: 'Netherlands',
            author: 'Max Seelig'
        },
        {
            name: 'New York City',
            url: 'https://goo.gl/maps/e5UiPtg2zARyNCDHA?g_st=ac',
            country: 'United States',
            author: 'PKNYC'
        },
        {
            name: 'American Parkour Hotspots',
            url: 'https://goo.gl/maps/RjtAs2N6n48Fn8B4A?g_st=ac',
            country: 'United States',
            author: 'American Parkour'
        },
        {
            name: 'London',
            url: 'https://goo.gl/maps/QRJdc6q7hHQAZqhB9?g_st=ac',
            country: 'United Kingdom',
            author: 'London Community'
        },
        {
            name: 'Hamburg 🍔',
            url: 'https://maps.app.goo.gl/ko4oZmU5gfX4WDuo8',
            country: 'Germany',
            author: 'Koen Bangert'
        },
        {
            name: 'Mannheim 🚀',
            url: 'https://maps.app.goo.gl/YwNT31RvpDWJNgAa7',
            country: 'Germany',
            author: 'Koen Bangert'
        },
        {
            name: 'Berlin 🛡️',
            url: 'https://maps.app.goo.gl/wPfw2Ts3kpv96buMA',
            country: 'Germany',
            author: 'Koen Bangert'
        },
        {
            name: 'Frankfurt ⚠️',
            url: 'https://maps.app.goo.gl/vVeipA6v6KCVxRXG8',
            country: 'Germany',
            author: 'Koen Bangert'
        }
    ];

    // Sort by name for better UX
    placelists.sort((a, b) => a.name.localeCompare(b.name));

    // Get unique countries for filter dropdown
    const countries = [...new Set(placelists.map((p) => p.country))].sort();

    // Reactive state for filters
    let searchQuery = '';
    let selectedCountry = '';

    // Filtered placelists based on search and country
    $: filteredPlacelists = placelists.filter((placelist) => {
        const matchesSearch =
            searchQuery === '' ||
            placelist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            placelist.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCountry = selectedCountry === '' || placelist.country === selectedCountry;
        return matchesSearch && matchesCountry;
    });
</script>

<div class="filters spot-filters">
    <div class="filter-group spot-filter-group">
        <label for="search">{$t('filter.searchByName')}</label>
        <input
            type="text"
            id="search"
            bind:value={searchQuery}
            placeholder={$t('filter.searchPlaceholder')}
            class="input"
        />
    </div>
    <div class="filter-group spot-filter-group">
        <label for="country">{$t('filter.filterByCountry')}</label>
        <select id="country" bind:value={selectedCountry} class="select">
            <option value="">{$t('filter.allCountries')}</option>
            {#each countries as country}
                <option value={country}>{country}</option>
            {/each}
        </select>
    </div>
</div>

<div class="results-count">
    {filteredPlacelists.length}
    {filteredPlacelists.length === 1 ? $t('filter.mapSingular') : $t('filter.mapPlural')}
    {$t('filter.found')}
</div>

<ul class="placelist-list">
    {#each filteredPlacelists as placelist}
        <li class="placelist-item">
            <a href={placelist.url} target="_blank" rel="noreferrer" class="placelist-link">
                <div class="placelist-name">
                    <span class="placelist-title">{placelist.name}</span>
                    <span class="placelist-author">{placelist.author}</span>
                </div>
                {#if placelist.country !== 'Netherlands'}
                    <span class="country-badge">{placelist.country}</span>
                {/if}
            </a>
        </li>
    {/each}
    {#if filteredPlacelists.length === 0}
        <li class="no-results">{$t('filter.noResultsFound')}</li>
    {/if}
</ul>

<style>
    .filters.spot-filters {
        margin: 1.5rem 0 2rem 0;
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        align-items: flex-end;
        border-radius: 0.75rem;
        padding: 1.25rem 1.5rem;
        border: 1px solid var(--color-border);
        background: var(--color-card);
        transition: all 0.2s ease;
    }

    .spot-filter-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-width: 200px;
        flex: 1;
    }

    .spot-filter-group label {
        font-weight: 600;
        font-size: 1rem;
        color: var(--color-foreground);
        margin-bottom: 0.1rem;
    }

    /* Input/select visuals come from global .input/.select styles (src/app.pcss). */

    @media all and (max-width: 800px) {
        .filters.spot-filters {
            flex-direction: column;
            gap: 1.25rem;
            align-items: stretch;
            padding: 1.25rem 1rem;
            margin: 1rem 0 1.5rem 0;
        }
        .spot-filter-group {
            min-width: unset;
            width: 100%;
            flex: none;
        }
        .filters.spot-filters :global(.input),
        .filters.spot-filters :global(.select) {
            width: 100%;
            font-size: 1rem;
            min-height: 48px;
        }
    }

    @media all and (max-width: 480px) {
        .filters.spot-filters {
            padding: 1rem 0.75rem;
            margin: 0.75rem 0 1.25rem 0;
            border-radius: 0.5rem;
        }
        .filters.spot-filters :global(.input),
        .filters.spot-filters :global(.select) {
            min-height: 44px;
        }
        .spot-filter-group label {
            font-size: 0.95rem;
        }
    }

    .placelist-list {
        list-style: none;
        margin: 0 0 1.5rem 0;
        padding: 0;
        border-radius: 0.75rem;
        background: var(--color-card);
        border: 1px solid var(--color-border);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
        max-height: 400px;
        overflow-y: auto;
        transition: all 0.2s ease;
    }

    .results-count {
        margin: 0 0 1rem 0;
        font-size: 0.95rem;
        color: var(--color-muted-foreground);
        font-weight: 500;
    }

    @media all and (max-width: 480px) {
        .placelist-list {
            max-height: 350px;
        }
        .results-count {
            font-size: 0.9rem;
            margin: 0 0 0.75rem 0;
        }
    }

    .placelist-item + .placelist-item {
        border-top: 1px solid var(--color-border);
    }

    .placelist-item {
        padding: 0;
        margin: 0;
    }

    .placelist-link {
        display: flex;
        align-items: center;
        padding: 1.25rem 1.5rem;
        color: var(--color-foreground);
        text-decoration: none;
        font-size: 1.08rem;
        font-weight: 500;
        transition:
            background 0.15s,
            color 0.15s;
        margin: 0;
        min-height: 60px;
    }

    @media all and (max-width: 480px) {
        .placelist-link {
            padding: 1rem;
            font-size: 1rem;
            min-height: 56px;
        }
    }

    .placelist-link:hover,
    .placelist-link:focus {
        background: color-mix(in oklch, var(--color-primary) 10%, var(--color-card));
        color: var(--color-primary);
        text-decoration: none;
    }

    .placelist-name {
        flex: 1 1 auto;
        word-break: break-word;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .placelist-title {
        font-weight: 500;
        line-height: 1.4;
    }

    .placelist-author {
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--color-muted-foreground);
        margin: 0;
    }

    @media all and (max-width: 480px) {
        .placelist-name {
            gap: 0.125rem;
        }
        .placelist-author {
            font-size: 0.75rem;
        }
    }

    .country-badge {
        display: inline-block;
        background-color: var(--color-muted);
        color: var(--color-muted-foreground);
        padding: 0.25rem 0.625rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        margin-left: 0.75rem;
        white-space: nowrap;
        flex-shrink: 0;
        transition: all 0.2s ease;
    }

    @media all and (max-width: 480px) {
        .country-badge {
            padding: 0.1875rem 0.5rem;
            font-size: 0.7rem;
            margin-left: 0.5rem;
        }
    }

    .no-results {
        font-style: italic;
        color: var(--color-muted-foreground);
        padding: 2rem 1.5rem;
        background: var(--color-card);
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        text-align: center;
        transition: all 0.2s ease;
    }
</style>
