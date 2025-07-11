<script>
	import OpenGymsShortList from '$lib/components/calendar/OpenGymsShortList.svelte';
	import UpcommingJam from '$lib/components/calendar/UpcommingJam.svelte';
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

		h1, h2 {
			margin: 4rem 0 1.5rem;
		}
	</style>
</svelte:head>


<h1>Dé spot voor de<br/>
Nederlandse parkour /<br/>
freerunning scene
</h1>
<p>
Alles wat je nodig hebt om deel uit te maken,
en op de hoogte te blijven van de Nederlandse
parkour en freerunning community.
</p>

<UpcommingJam />

<h2>Aankomenende Open Gyms</h2>
<OpenGymsShortList />
<a
	href="/open-gyms"
	class="button">Bekijk alle open gyms</a
>

<h2>WhatsApp Community</h2>
<p>
	De Nederlandse parkour en freerunning community is vooral actief op WhatsApp. <a href="https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8" rel="noreferrer" target="_blank">Join de community</a>, zo kun je makkelijk mensen vinden om mee te seshen.
</p>

<h2>Over {siteTitle}</h2>
<p>
	Het doel van {siteTitle} is om alle handige informatie over freerunning en parkour op één plek te hebben. Hier zijn overzichten van de <a href="/spots">beste spots</a>, <a href="/open-gyms">open gyms</a> en <a href="/links">community linkjes</a>. 
</p>