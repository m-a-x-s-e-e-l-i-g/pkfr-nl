<script>
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

<h2>Over {siteTitle}</h2>
<p>
	Het doel van {siteTitle} is om alle handige informatie over freerunning en parkour op één plek te hebben. Hier zijn overzichten van de <a href="/spots">beste spots</a>, <a href="/open-gyms">open gyms</a>, <a href="/community">community linkjes</a> en een <a href="/tv">playlist met Nederlandse freerun videos</a>. Daarnaast is er een <a href="/blog">blog</a> waar nieuwtjes binnen de Nederlandse parkour en freerunning community worden gedeeld.
</p>

<h2>Missie</h2>
<p>
	{siteTitle} gelooft dat parkour en freerunning voor iedereen toegankelijk moet zijn. Of je nu een beginnende of ervaren freerunner bent, {siteTitle} helpt om deel uit te maken van de Nederlandse parkour en freerunning community. De website is een handige tool voor iedereen die op de hoogte wil blijven van wat er gebeurt binnen de Nederlandse parkour en freerunning community.
</p>