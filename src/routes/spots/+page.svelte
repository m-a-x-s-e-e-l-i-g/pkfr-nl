<script>
	import { titlePostfix } from '$lib/config';

	// Placelists data with metadata for filtering
	const placelists = [
		{ name: "Parkour Spots", url: "https://maps.app.goo.gl/RPoC8Hwed7iDC7229", country: "Netherlands", author: "Koen Bangert" },
		{ name: "Arnhem", url: "https://goo.gl/maps/9iFURfmBfMFrMLBD7", country: "Netherlands", author: "Grip Freerunning" },
		{ name: "Deventer", url: "https://goo.gl/maps/CGsQZCD8nGYh3cRV6", country: "Netherlands", author: "Grip Freerunning" },
		{ name: "Utrecht", url: "https://goo.gl/maps/TwaUDmqmbbH9FEnk8", country: "Netherlands", author: "Grip Freerunning" },
		{ name: "Nijmegen", url: "https://goo.gl/maps/dRLEhwWfAVRhPvhe6", country: "Netherlands", author: "Grip Freerunning" },
		{ name: "Zutphen", url: "https://goo.gl/maps/oTGv3nYKfbD8XPbYA", country: "Netherlands", author: "Grip Freerunning" },
		{ name: "Favorites (350+ places)", url: "https://goo.gl/maps/AbnzZDiUjxiy1YDK7", country: "Netherlands", author: "Johan Vereijken" },
		{ name: "Parkour spots (380+ places)", url: "https://goo.gl/maps/khFcMNSZaQBrBuLx5", country: "Netherlands", author: "Olivier Koster" },
		{ name: "Amsterdam is Dead non-spot tour 2024", url: "https://maps.app.goo.gl/UKweDgNVvEpJQakSA", country: "Netherlands", author: "Fé" },
		{ name: "Spots to Hit in Amsterdam (230+)", url: "https://maps.app.goo.gl/5WcDufx7Nsk9Z4in7", country: "Netherlands", author: "Safier Elzinga" },
		{ name: "Adapt 2024 Twente University challenges", url: "https://www.google.com/maps/d/edit?mid=17skoWhjed0NLu3-d92pRL7BbWL-lLG8", country: "Netherlands", author: "Lars Damink" },
		{ name: "Prague", url: "https://maps.app.goo.gl/EvSmPa2pHQXKt66n6?g_st=ac", country: "Czech Republic", author: "Grip Freerunning" },
		{ name: "Prague + Czech", url: "https://goo.gl/maps/6X3EarLxnqF9nZnv6?g_st=ac", country: "Czech Republic", author: "Mikeš Kořínek" }
	];

	// Get unique countries for filter dropdown
	const countries = [...new Set(placelists.map(p => p.country))].sort();

	// Reactive state for filters
	let searchQuery = $state('');
	let selectedCountry = $state('');

	// Filtered placelists based on search and country
	const filteredPlaycelists = $derived(() => {
		return placelists.filter(placelist => {
			const matchesSearch = searchQuery === '' || 
				placelist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				placelist.author.toLowerCase().includes(searchQuery.toLowerCase());
			
			const matchesCountry = selectedCountry === '' || placelist.country === selectedCountry;
			
			return matchesSearch && matchesCountry;
		});
	});
</script>

<svelte:head>
	<title>Spots {titlePostfix}</title>
</svelte:head>
<h1>Spots</h1>
<p>Parkour spots vinden kan tijd kosten, behalve als je al weet waar ze zijn! Je vind hier apps, kaarten en lijsten die goed zijn voor spots in Nederland. Zoek je liever iets binnen, probeer dan de <a href="/gym-finder">Gym Finder</a>.</p>
<div class="wrapper">
	<h2>CityLegends</h2>
	<article class="main">
		<p>
			CityLegends is een OK app om spots te vinden. Bij de spots kun je clips bekijken of
			plaatsen. Je kunt met je clips battlen tegen anderen, soms ook prijzen verdienen! <br /> 
			<a href="https://www.citylegends.io/about-the-app" rel="noreferrer" target="_blank">Lees hier meer over de app.</a>
		</p>
	</article>
	<aside class="aside aside-right">
		<picture>
			<source srcset="./images/citylegends-app-animated.png" type="image/apng" />
			<img
				src="./images/citylegends-app-animated.gif"
				alt="CityLegends app animated"
				style="width:250px"
			/>
		</picture>
	</aside>
	<footer>
		<a 
			href="https://citylegends.io/download-app" 
			rel="noreferrer"
			target="_blank" class="button">
			Download App
		</a>
	</footer>
</div>
<div class="wrapper">
	<h2>Max zijn spot map</h2>
	<article class="main">
		<p>
			Dit is een super uitgebreide spot map welke je makkelijk in Google Maps kunt openen. Er staan veel spots, non-spots, parkjes ongecategorieerd op. <br />
			Ik kan hulp gebruiken met het categoriseren van de spots, als je wilt helpen, stuur me een berichtje ergens.
		</p>
	</article>
	<aside class="aside aside-right">
		<picture>
			<img
				src="./images/google-maps-parkour-spots-phone.webp"
				alt="Google Maps Parkour Freerun Spots Netherlands"
				style="width:250px;padding:0 25px"
			/>
		</picture>
	</aside>
	<footer>
		<a
			href="https://www.google.com/maps/d/u/0/viewer?mid=1F8PHbPAtHhj4RaCQzbsw6Ko6FE0&hl=en&ll=52.13281486226002%2C5.623986124992371&z=7"
			rel="noreferrer"
			target="_blank"
			class="button">
			Kaart openen
		</a>
	</footer>
</div>
<div class="wrapper">
	<h2>Google Maps Placelists van freerunners</h2>
	<article class="main">
		<p>
			De volgende spot maps zijn fantastisch! Heb jij er ook een van jouw omgeving die je wil delen? 
		</p>
		
		<!-- Search and filter controls -->
	   <div class="filters spot-filters">
		   <div class="filter-group spot-filter-group">
			   <label for="search">Zoek op naam:</label>
			   <input type="text" id="search" bind:value={searchQuery} placeholder="Zoek placelists..." class="spot-filter-input" />
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

	   <ul class="placelist-list">
		   {#each filteredPlaycelists() as placelist}
			   <li class="placelist-item">
				   <a href={placelist.url} target="_blank" rel="noreferrer" class="placelist-link">
					   <span class="placelist-name">{placelist.name}</span>
					   {#if placelist.country !== 'Netherlands'}
						   <span class="country-badge">{placelist.country}</span>
					   {/if}
				   </a>
			   </li>
		   {/each}
		   {#if filteredPlaycelists().length === 0}
			   <li class="no-results">Geen placelists gevonden die voldoen aan je zoekcriteria.</li>
		   {/if}
	   </ul>
	</article>
</div>
<div class="wrapper">
	<h2>Indoor spots</h2>
	<article class="main">
		<p>
			Het is niet altijd lekker weer, en covered spots zijn schaars! Binnen trainen is dan wel heel erg fijn. Gebruik de <a href="/gym-finder">Gym Finder</a> om de dichtstbijzijnde indoor spots te vinden.
		</p>
	</article>
	<footer>
		<a
			href="/gym-finder"
			class="button">Zoek een gym</a
		>
	</footer>
</div>

<style>
	picture {
		display: inline-block;
	}
	.wrapper {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
		margin-bottom: 2em;
	}

	.wrapper > * {
		flex: 1 100%;
		background: none;
	}

	header {
		margin-bottom: 40px;
	}

	article p {
		margin: unset;
	}

	header {
		display: initial;
		text-align: left;
		padding: 0;
	}

	.main {
		text-align: left;
		padding: 0;
		align-self: flex-start;
	}

	.aside {
		flex: 1 auto;
		margin-top: 2em;
	}

	.aside-right {
		text-align: right;
	}

	/* New styles for filters and country badges */
   .filters.spot-filters {
	   margin: 1.5rem 0 2rem 0;
	   display: flex;
	   gap: 2rem;
	   flex-wrap: wrap;
	   align-items: flex-end;
	   border-radius: 0.75rem;
	   padding: 1.25rem 1.5rem;
	   border: 1px solid #e2e8f0;
   }

   .spot-filter-group {
	   display: flex;
	   flex-direction: column;
	   gap: 0.5rem;
	   min-width: 220px;
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
		   gap: 1rem;
		   align-items: stretch;
		   padding: 1rem 0.5rem;
	   }
	   .spot-filter-group {
		   min-width: unset;
		   width: 100%;
	   }
	   .spot-filter-input,
	   .spot-filter-select {
		   width: 100%;
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
	   padding: 1rem 1.5rem;
	   color: #1e293b;
	   text-decoration: none;
	   font-size: 1.08rem;
	   font-weight: 500;
	   transition: background 0.15s, color 0.15s;
	   margin: 0;
   }

   .placelist-link:hover, .placelist-link:focus {
	   background: #e0e7ef;
	   color: var(--accent);
	   text-decoration: none;
   }

   .placelist-name {
	   flex: 1 1 auto;
	   word-break: break-word;
   }

   .country-badge {
	   display: inline-block;
	   background-color: #e2e8f0;
	   color: #475569;
	   padding: 0.125rem 0.5rem;
	   border-radius: 9999px;
	   font-size: 0.75rem;
	   font-weight: 500;
	   margin-left: 0.5rem;
   }

   .no-results {
	   font-style: italic;
	   color: #666;
	   padding: 1.2rem 1.5rem;
	   background: #f8fafc;
	   border-radius: 0.75rem;
	   text-align: center;
   }

	@media all and (max-width: 800px) {
		.aside-right {
			text-align: center;
		}

		.button {
			width: 100%;
		}

		.filters {
			flex-direction: column;
		}

		.filter-group input,
		.filter-group select {
			min-width: auto;
			width: 100%;
		}
	}

	@media all and (min-width: 800px) {
		.main {
			flex: 4 370px;
		}

		.aside {
			margin-top: 0;
		}

		.main {
			order: 2;
		}

		.aside-right {
			order: 3;
		}
		.aside-right img {
			width: 100%;
		}

		footer{
			order: 4;
			display: grid;
		}
	}
</style>
