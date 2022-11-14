<script>
	import { siteTitle, titlePostfix } from '$lib/config';
	// export let data;
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

<!-- This is the README.md file in the root of the repo. It serves double duty as the homepage's content. If you'd rather use your own HTML and/or Svelte, you can delete/modify everything in this file. -->
<!-- <svelte:component this={data.ReadMe} /> -->

<h1>Freerunning Informatie</h1>
<p>Freerunning Informatie is gemaakt om overzicht te geven aan freerunners.</p>