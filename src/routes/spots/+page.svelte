<script>
	import { titlePostfix } from '$lib/config';
	import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
</script>

<svelte:head>
	<title>Spots {titlePostfix}</title>
</svelte:head>
<h1>Spots</h1>
<p>Parkour spots vinden kan tijd kosten, behalve als je al weet waar ze zijn! Je vind hier apps, kaarten en lijsten die goed zijn voor spots in Nederland. Zoek je liever iets binnen, probeer dan de <a href="/gym-finder">Gym Finder</a>.</p>
<div class="wrapper">
	<h2>Spot kaarten van freerunners</h2>
<article class="main">
	<p>
		Uitstekende parkour spot kaarten van Nederlandse freerunners. Deze kaarten helpen je snel lokale spots te vinden en zijn ideaal voor iedereen die nieuwe trainingsplekken zoekt. Heb jij zelf een spot map van jouw regio? Deel hem gerust via de knop hieronder!
	</p>
	<!-- Search and filter controls -->
	<PlacelistFilter />
	<a href="/tools/spot-map-finder" class="button" style="display:inline-block;margin:0 0.5em;">Deel jouw spot lijst hier!</a>
</article>
</div>
<div class="wrapper">
	<h2>Indoor spots (gyms)</h2>
	<article class="main">
		<p>
			Het is niet altijd lekker weer, en covered spots zijn schaars! Binnen trainen is dan wel heel erg fijn. Gebruik de <a href="/gym-finder">Gym Finder</a> om de dichtstbijzijnde freerun gyms te vinden.
		</p>
	</article>
	<footer>
		<a
			href="/gym-finder"
			class="button">Zoek een gym</a
		>
	</footer>
</div>
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
