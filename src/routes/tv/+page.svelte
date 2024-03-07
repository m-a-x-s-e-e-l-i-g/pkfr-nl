<script>
	import { titlePostfix } from '$lib/config';
	import InputCollector from '$lib/components/InputCollector.svelte';
	import { page } from '$app/stores';

	let autoplayParam = '';
	if(import.meta.env.VITE_YOUTUBE_AUTOPLAY === 'true') {
		autoplayParam = '&autoplay=1';
	}
</script>

<svelte:head>
	<title>Community TV {titlePostfix}</title>
</svelte:head>

<h1>Community TV</h1>
<p>Video's door freerunners binnen de Nederlandse community.</p>
<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/videoseries?list=PL3iwaCsp8s8P0lVvw3DkmMFmGxqBGSXnS{autoplayParam}"
	title="Parkour TV"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>
<p>
	Ontbreekt jouw nieuwe video? Stuur het in!
</p>
<InputCollector pagePath={$page.url.pathname}/>
