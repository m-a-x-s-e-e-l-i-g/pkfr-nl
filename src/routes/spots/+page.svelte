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
			CityLegends is de fijnste app om spots te vinden, ook kun bij de spots clips bekijken of
			plaatsen. <a href="https://www.citylegends.io/about-the-app">Lees hier meer over de app.</a>
		</p>
	</article>
	<aside class="aside aside-right">
		<img
			src="./images/citylegends-map.webp"
			alt="CityLegends app map"
			class="cityLegendsImage"
			style="width:200px"
		/>
	</aside>
	<footer>
		<a href="https://citylegends.io/download-app" class="button">Download App</a>
	</footer>
</div>
<div class="wrapper">
	<header><h2>URBN Jumpers</h2></header>
	<article class="main">
		<p>Deze app is erg buggy, maar beschikt over meer spots dan CityLegends.</p>
	</article>
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
	<header><h2>Oude kaart</h2></header>
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
			href="https://www.google.com/maps/d/u/0/viewer?hl=en&ll=52.104212258523816%2C5.623986124992371&z=8&mid=1F8PHbPAtHhj4RaCQzbsw6Ko6FE0"
			rel="noreferrer"
			target="_blank"
			class="button">Kaart openen</a
		>
	</footer>
</div>

<style>
	.button {
		background-color: var(--accent);
		border: none;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 10px 0;
		cursor: pointer;
	}
	.button a {
		color: white;
		font-weight: bold;
	}

	.wrapper {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
	}

	.wrapper > * {
		padding: 10px;
		flex: 1 100%;
		background: none;
	}

	footer {
		display: initial;
	}

	header,
	.main {
		display: initial;
		text-align: left;
	}

	.aside-right {
		text-align: right;
	}

	@media all and (min-width: 600px) {
		.aside {
			flex: 1 auto;
		}
	}
	@media all and (min-width: 800px) {
		.main {
			flex: 3 0px;
		}

		.aside-left {
			order: 1;
		}

		.main {
			order: 2;
		}

		.aside-right {
			order: 3;
			text-align: center;
		}
		.aside-right img {
			width: 100%;
		}

		footer {
			order: 4;
		}
	}
</style>
