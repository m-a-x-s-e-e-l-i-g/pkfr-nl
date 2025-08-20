<script>
	import { titlePostfix } from '$lib/config';
	import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
</script>

<svelte:head>
	<title>Spots {titlePostfix}</title>
</svelte:head>
<h1>Spots</h1>
<p>Parkour spots vinden kan tijd kosten, behalve als je al weet waar ze zijn! Je vind hier apps, kaarten en lijsten die goed zijn voor spots in Nederland. Zoek je liever iets binnen, probeer dan de <a href="/tools/gym-finder">Gym Finder</a>.</p>
<div class="wrapper">
	<h2>Spot kaarten van freerunners</h2>
<article class="main">
	<p>
		Uitstekende parkour spot kaarten van Nederlandse freerunners. Deze kaarten helpen je snel lokale spots te vinden en zijn ideaal voor iedereen die nieuwe trainingsplekken zoekt. Heb jij zelf een spot map van jouw regio? Deel hem gerust via de knop hieronder!
	</p>
	<PlacelistFilter />
	<a href="/tools/spot-map-finder" class="button">Deel jouw spot lijst hier!</a>
</article>
</div>
<div class="wrapper">
	<h2>Indoor spots (gyms)</h2>
	<article class="main">
		<p>
			Het is niet altijd lekker weer, en covered spots zijn schaars! Binnen trainen is dan wel heel erg fijn. Gebruik de <a href="/tools/gym-finder">Gym Finder</a> om de dichtstbijzijnde freerun gyms te vinden.
		</p>
	</article>
	<footer>
		<a
			href="/tools/gym-finder"
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

	article p {
		margin: unset;
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

	@media all and (max-width: 800px) {
		.aside-right {
			text-align: center;
		}
		.button {
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
