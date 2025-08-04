<style>
  .filters.spot-filters {
	margin: 1.5rem 0 2rem 0;
	display: flex;
	gap: 1.5rem;
	flex-wrap: wrap;
	align-items: flex-end;
	border-radius: 0.75rem;
	padding: 1.25rem 1.5rem;
	border: 1px solid #e2e8f0;
	background: #fafbfc;
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
	color: #1e293b;
	margin-bottom: 0.1rem;
  }

  .spot-filter-input,
  .spot-filter-select {
	height: 44px;
	padding: 0 0.9rem;
	border: 1.5px solid #cbd5e1;
	border-radius: 0.5rem;
	font-size: 1.05rem;
	background: #fff;
	color: #1e293b;
	transition: border-color 0.2s;
	box-shadow: 0 1px 2px 0 rgba(30,41,59,0.03);
	box-sizing: border-box;
  }

  .spot-filter-input:focus,
  .spot-filter-select:focus {
	outline: none;
	border-color: #2563eb;
	box-shadow: 0 0 0 2px #2563eb22;
  }

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
	.spot-filter-input,
	.spot-filter-select {
	  width: 100%;
	  font-size: 1rem;
	  height: 48px;
	  padding: 0 1rem;
	}
  }

  @media all and (max-width: 480px) {
	.filters.spot-filters {
	  padding: 1rem 0.75rem;
	  margin: 0.75rem 0 1.25rem 0;
	  border-radius: 0.5rem;
	}
	.spot-filter-input,
	.spot-filter-select {
	  height: 44px;
	  padding: 0 0.875rem;
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
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	box-shadow: 0 2px 8px 0 rgba(30,41,59,0.03);
	max-height: 400px;
	overflow-y: auto;
  }

  .results-count {
	margin: 0 0 1rem 0;
	font-size: 0.95rem;
	color: #475569;
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
	border-top: 1px solid #e2e8f0;
  }

  .placelist-item {
	padding: 0;
	margin:0;
  }

  .placelist-link {
	display: flex;
	align-items: center;
	padding: 1.25rem 1.5rem;
	color: #1e293b;
	text-decoration: none;
	font-size: 1.08rem;
	font-weight: 500;
	transition: background 0.15s, color 0.15s;
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

  .placelist-link:hover, .placelist-link:focus {
	background: #e0e7ef;
	color: var(--accent);
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
	color: #64748b;
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
	background-color: #e2e8f0;
	color: #475569;
	padding: 0.25rem 0.625rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 500;
	margin-left: 0.75rem;
	white-space: nowrap;
	flex-shrink: 0;
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
	color: #666;
	padding: 2rem 1.5rem;
	background: #f8fafc;
	border-radius: 0.75rem;
	text-align: center;
  }
</style>
<script>
  // Props
  // Placelists data with metadata for filtering
  export let placelists = [
	{ name: "Parkour Spots NL (400+)", url: "https://www.google.com/maps/d/u/0/viewer?mid=1F8PHbPAtHhj4RaCQzbsw6Ko6FE0&hl=en&ll=52.13281486226002%2C5.623986124992371&z=7", country: "Netherlands", author: "Max Seelig" },
	{ name: "Parkour Spots", url: "https://maps.app.goo.gl/RPoC8Hwed7iDC7229", country: "Netherlands", author: "Koen Bangert" },
	{ name: "Arnhem", url: "https://goo.gl/maps/9iFURfmBfMFrMLBD7", country: "Netherlands", author: "Grip Freerunning" },
	{ name: "Deventer", url: "https://goo.gl/maps/CGsQZCD8nGYh3cRV6", country: "Netherlands", author: "Grip Freerunning" },
	{ name: "Utrecht", url: "https://goo.gl/maps/TwaUDmqmbbH9FEnk8", country: "Netherlands", author: "Grip Freerunning" },
	{ name: "Nijmegen", url: "https://goo.gl/maps/dRLEhwWfAVRhPvhe6", country: "Netherlands", author: "Grip Freerunning" },
	{ name: "Zutphen", url: "https://goo.gl/maps/oTGv3nYKfbD8XPbYA", country: "Netherlands", author: "Grip Freerunning" },
	{ name: "Favorites (350+)", url: "https://goo.gl/maps/AbnzZDiUjxiy1YDK7", country: "Netherlands", author: "Johan Vereijken" },
	{ name: "Parkour spots (380+)", url: "https://goo.gl/maps/khFcMNSZaQBrBuLx5", country: "Netherlands", author: "Olivier Koster" },
	{ name: "Amsterdam is Dead non-spot tour 2024", url: "https://maps.app.goo.gl/UKweDgNVvEpJQakSA", country: "Netherlands", author: "Fé" },
	{ name: "Spots to Hit in Amsterdam (230+)", url: "https://maps.app.goo.gl/5WcDufx7Nsk9Z4in7", country: "Netherlands", author: "Safier Elzinga" },
	{ name: "Adapt 2024 Twente University challenges", url: "https://www.google.com/maps/d/edit?mid=17skoWhjed0NLu3-d92pRL7BbWL-lLG8", country: "Netherlands", author: "Lars Damink" },
	{ name: "Prague", url: "https://maps.app.goo.gl/EvSmPa2pHQXKt66n6?g_st=ac", country: "Czech Republic", author: "Grip Freerunning" },
	{ name: "Prague + Czech", url: "https://goo.gl/maps/6X3EarLxnqF9nZnv6?g_st=ac", country: "Czech Republic", author: "Mikeš Kořínek" },
	{ name: "ADAPT 2025 Enschede", url: "https://goo.gl/maps/5Ft1ryaDztp4T1NL8?g_st=ac", country: "Netherlands", author: "Lars Damink" },
	{ name: "Berlin", url: "https://goo.gl/maps/Kan5NujQb1EcJL3z9?g_st=ac", country: "Germany", author: "parkourberlin.de" },
	{ name: "Malta", url: "https://www.google.com/maps/d/u/0/viewer?mid=179s3NuwEe8lVkM1N-3AhXErusF4WLts2", country: "Malta", author: "Cool guy" },
	{ name: "Lisbon", url: "https://maps.app.goo.gl/Z2NQNCNXQDSCPo8A6?g_st=i", country: "Portugal", author: "Max Condon" },
	{ name: "Wuppertal", url: "https://www.google.com/maps/d/u/0/viewer?mid=1exoRlXCqp_tDsnALO579V0wC_EcEKso", country: "Germany", author: "Hans Schmidt" }
  ];

  // Sort by name for better UX
  placelists.sort((a, b) => a.name.localeCompare(b.name));

  // Get unique countries for filter dropdown
  const countries = [...new Set(placelists.map(p => p.country))].sort();

  // Reactive state for filters
  let searchQuery = '';
  let selectedCountry = '';

  // Filtered placelists based on search and country
  $: filteredPlacelists = placelists.filter(placelist => {
	const matchesSearch = searchQuery === '' || 
	  placelist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
	  placelist.author.toLowerCase().includes(searchQuery.toLowerCase());
	const matchesCountry = selectedCountry === '' || placelist.country === selectedCountry;
	return matchesSearch && matchesCountry;
  });
</script>

<div class="filters spot-filters">
	<div class="filter-group spot-filter-group">
		<label for="search">Zoek op naam:</label>
		<input type="text" id="search" bind:value={searchQuery} placeholder="Zoek kaart..." class="spot-filter-input" />
	</div>
	<div class="filter-group spot-filter-group">
		<label for="country">Filter op land:</label>
		<select id="country" bind:value={selectedCountry} class="spot-filter-select">
			<option value="">Alle landen</option>
			{#each countries as country}
				<option value={country}>{country}</option>
			{/each}
		</select>
	</div>
</div>

<div class="results-count">
	{filteredPlacelists.length} {filteredPlacelists.length === 1 ? 'kaart' : 'kaarten'} gevonden
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
		<li class="no-results">Geen kaarten gevonden die voldoen aan je zoekcriteria.</li>
	{/if}
</ul>
