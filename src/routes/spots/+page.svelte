<script>
	import { titlePostfix } from '$lib/config';
	import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('spots.title')} {titlePostfix}</title>
</svelte:head>
<h1>{$t('spots.title')}</h1>
<p>{@html $t('spots.description')}</p>
<div class="wrapper">
	<h2>{$t('spots.spotMapsTitle')}</h2>
<article class="main">
	<p>
		{@html $t('spots.spotMapsDescription')}
	</p>
	<PlacelistFilter />
	<a href="/tools/spot-map-finder" class="button">{$t('spots.shareSpotList')}</a>
</article>
</div>
<div class="wrapper">
	<h2>{$t('spots.indoorSpotsTitle')}</h2>
	<article class="main">
		<p>
			{@html $t('spots.indoorSpotsDescription')}
		</p>
	</article>
	<footer>
		<a
			href="/tools/gym-finder"
			class="button">{$t('spots.findGym')}</a
		>
	</footer>
</div>
<div class="wrapper">
	<h2>{$t('spots.cityLegendsTitle')}</h2>
	<article class="main">
		<p>
			{@html $t('spots.cityLegendsDescription')}
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
			{$t('spots.downloadApp')}
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
