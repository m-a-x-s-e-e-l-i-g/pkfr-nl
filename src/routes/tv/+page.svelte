<script>
	import { titlePostfix } from '$lib/config';
</script>

<svelte:head>
	<title>Community TV {titlePostfix}</title>
</svelte:head>

<h1>Community TV</h1>
<p>Video's door freerunners binnen de Nederlandse community.</p>
<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/videoseries?list=PL3iwaCsp8s8P0lVvw3DkmMFmGxqBGSXnS&autoplay=1"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>