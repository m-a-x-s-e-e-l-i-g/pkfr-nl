<script>
	import { titlePostfix } from '$lib/config';
</script>

<svelte:head>
	<title>Spots {titlePostfix}</title>
</svelte:head>
<h1>Spots</h1>
<p>Parkour spots vinden kan tijd kosten, behalve als je al weet waar ze zijn! Je vind hier apps, kaarten en lijsten die goed zijn voor spots in Nederland. Zoek je liever iets binnen, probeer dan de <a href="/gym-finder">Gym Finder</a>.</p>
<div class="wrapper">
	<header><h2>CityLegends</h2></header>
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
	<header><h2>Max zijn spot map</h2></header>
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
	<header><h2>Google Maps Placelists van freerunners</h2></header>
	<article class="main">
		<p>
			De volgende spot maps zijn fantastisch! Heb jij er ook een van jouw omgeving die je wil delen? 
		</p>
		<ul>
                        <li><a href="https://maps.app.goo.gl/RPoC8Hwed7iDC7229" target="_blank" rel="noreferrer">Parkour Spots - by @parkoendama</a></li>
			<li><a href="https://goo.gl/maps/9iFURfmBfMFrMLBD7" target="_blank" rel="noreferrer">FRRN Spots Arnhem - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/CGsQZCD8nGYh3cRV6" target="_blank" rel="noreferrer">Parkour Spots Deventer - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/TwaUDmqmbbH9FEnk8" target="_blank" rel="noreferrer">Parkour Spots Utrecht - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/dRLEhwWfAVRhPvhe6" target="_blank" rel="noreferrer">Parkour Spots Nijmegen - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/oTGv3nYKfbD8XPbYA" target="_blank" rel="noreferrer">Parkour spots Zutphen - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/AbnzZDiUjxiy1YDK7" target="_blank" rel="noreferrer">Favorites (350+ places) - by Johan Vereijken</a></li>
			<li><a href="https://goo.gl/maps/khFcMNSZaQBrBuLx5" target="_blank" rel="noreferrer">Parkour spots (380+ places) - by Olivier Koster</a></li>
			<li><a href="https://maps.app.goo.gl/UKweDgNVvEpJQakSA" target="_blank" rel="noreferrer">Amsterdam is Dead non-spot tour 2024</a></li>
			<li><a href="https://maps.app.goo.gl/5WcDufx7Nsk9Z4in7" target="_blank" rel="noreferrer">Spots to Hit in Amsterdam (230+) - by Safier Elzinga</a></li>
<li><a href="https://www.google.com/maps/d/edit?mid=17skoWhjed0NLu3-d92pRL7BbWL-lLG8" target="_blank" rel="noreferrer">Adapt 2024 Twente University challenges - by Lars Damink</a></li>
		</ul>
	</article>
</div>
<div class="wrapper">
	<header><h2>Indoor spots</h2></header>
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
