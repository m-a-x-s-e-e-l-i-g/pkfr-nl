<script>
	import { titlePostfix } from '$lib/config';
</script>

<svelte:head>
	<title>Spots {titlePostfix}</title>
</svelte:head>
<h1>Spots</h1>
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
			Deze kaart word sinds 2018 niet meer onderhouden, er staan dus spots op die niet meer bestaan.
		</p>
		<iframe
			src="https://www.google.com/maps/d/embed?mid=1F8PHbPAtHhj4RaCQzbsw6Ko6FE0&hl=en&ehbc=2E312F"
			title="Parkour Spots NL"
			rel="noreferrer"
			width="640"
			height="480"
		/>
	</article>
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
		</ul>
	</article>
</div>
<div class="wrapper">
	<header><h2>Kaarten vinden op Google</h2></header>
	<article class="main">
		<p>
			Ga je een reizen? En zie je weinig spots op de bovenstaande twee apps? Dan kan de volgende
			search query je helpen. Zet er bijvoorbeeld een land of stad achter, en je krijgt uitgebreide
			kaarten zoals de bovenstaande.
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

<style>
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

		.aside-left {
			order: 1;
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
