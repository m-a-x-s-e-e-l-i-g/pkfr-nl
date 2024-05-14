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
			CityLegends is de fijnste app om spots te vinden, ook kun je bij de spots clips bekijken of
			plaatsen. Je kunt met je clips battlen tegen anderen, soms ook prijzen verdienen! <br />
			<a href="https://www.citylegends.io/about-the-app">Lees hier meer over de app.</a>
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
		<a href="https://citylegends.io/download-app" class="button">Download App</a>
	</footer>
</div>
<div class="wrapper">
	<header><h2>URBN Jumpers</h2></header>
	<article class="main">
		<p>
			Deze app is erg buggy, maar beschikt over meer spots dan CityLegends. Het toffe aan deze app
			is dat je jams kan aanmaken en actieve mensen in de buurt kan vinden.
		</p>
	</article>
	<aside class="aside aside-right">
		<picture>
			<source srcset="./images/urbn-jumpers-app-animated.png" type="image/apng" />
			<img
				src="./images/urbn-jumpers-app-animated.gif"
				alt="URBN Jumpers app animated"
				style="width:250px"
			/>
		</picture>
	</aside>
	<footer>
		<a href="https://apps.apple.com/ca/app/urbn-jumpers/id1230325474" class="button"
			>Download voor iOS</a
		>
		<a
			href="https://play.google.com/store/apps/details?id=com.urbandimension.URBNJumpers"
			class="button">Download voor Android</a
		>
	</footer>
</div>
<div class="wrapper">
	<header><h2>Max zijn Oude kaart</h2></header>
	<article class="main">
		<p>
			Super uitgebreide kaart, met vele spots. Helaas is deze kaart niet meer up-to-date, maar wellicht kun je er nog wat aan hebben.
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
			class="button">Kaart openen</a
		>
	</footer>
</div>
<div class="wrapper">
	<header><h2>Google Maps Placelists van freerunners</h2></header>
	<article class="main">
		<p>
			Google Maps heeft een functie waarbij je lijsten kunt maken. Echter zijn deze lijsten niet vindbaar via Google. Je kunt ze gebruiken via de volgende links:
		</p>
		<ul>
			<li><a href="https://goo.gl/maps/9iFURfmBfMFrMLBD7" target="_blank" rel="noreferrer">FRRN Spots Arnhem - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/CGsQZCD8nGYh3cRV6" target="_blank" rel="noreferrer">Parkour Spots Deventer - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/TwaUDmqmbbH9FEnk8" target="_blank" rel="noreferrer">Parkour Spots Utrecht - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/dRLEhwWfAVRhPvhe6" target="_blank" rel="noreferrer">Parkour Spots Nijmegen - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/oTGv3nYKfbD8XPbYA" target="_blank" rel="noreferrer">Parkour spots Zutphen - by Grip Freerunning</a></li>
			<li><a href="https://goo.gl/maps/AbnzZDiUjxiy1YDK7" target="_blank" rel="noreferrer">Favorites (350+ places) - by Johan Vereijken</a></li>
			<li><a href="https://goo.gl/maps/khFcMNSZaQBrBuLx5" target="_blank" rel="noreferrer">Parkour spots (380+ places) - by Olivier Koster</a></li>
			<li><a href="https://maps.app.goo.gl/UKweDgNVvEpJQakSA" target="_blank" rel="noreferrer">Amsterdam is Dead non-spot tour 2024</a></li>
		</ul>
	</article>
</div>
<div class="wrapper">
	<header><h2>Kaarten vinden op Google</h2></header>
	<article class="main">
		<p>
			Ga je een reizen? En zie je weinig spots op de bovenstaande twee apps? Dan kan de volgende
			search query je helpen. Zet er bijvoorbeeld een land of stad achter.
		</p>
	</article>
	<footer>
		<a
			href="https://www.google.com/search?q=site:https://www.google.com/maps/d/viewer%20parkour%20spots"
			rel="noreferrer"
			target="_blank"
			class="button">Zoek kaarten op Google</a
		>
	</footer>
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
