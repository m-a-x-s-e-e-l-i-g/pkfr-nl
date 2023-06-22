<script>
	import OpenGymsShortList from '$lib/components/calendar/OpenGymsShortList.svelte';
	import { siteTitle, titlePostfix } from '$lib/config';
</script>

<svelte:head>
	<title>{siteTitle} {titlePostfix}</title>
	<style>
		#pagesOverView {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: 0 1rem;
			list-style: none;
		}

		#pagesOverView li {
			margin: 1rem 0;
		}
	</style>
</svelte:head>


<h1>{siteTitle}</h1>
<p>
{siteTitle} is dé online hub voor de Nederlandse parkour en freerunning community. Hier vind je alles wat nodig is om deel uit te maken van deze fantastische community en op de hoogte te blijven van wat er gebeurt.
</p>

<h2>Aankomenende Open Gyms</h2>
<OpenGymsShortList />
<a
	href="/open-gyms"
	class="button">Bekijk alle open gyms</a
>

<h2>Over {siteTitle}</h2>
<p>
	Het doel van {siteTitle} is om alle handige informatie over freerunning en parkour op één plek te hebben. Hier zijn overzichten van de <a href="/spots">beste spots</a>, <a href="/open-gyms">open gyms</a>, <a href="/links">community linkjes</a> en een <a href="/tv">playlist met Nederlandse freerun videos</a>. Daarnaast is er een <a href="/blog">blog</a> waar nieuwtjes binnen de Nederlandse parkour en freerunning community worden gedeeld.
</p>