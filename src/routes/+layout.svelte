<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script lang="ts">
	import { run } from 'svelte/legacy';

	import '../app.pcss';
	import '$lib/assets/scss/global.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { currentPage, isMenuOpen } from '$lib/assets/js/store';
	import { ModeWatcher } from "mode-watcher";
	import { navItems } from '$lib/config';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let { data, children } = $props();

	const transitionIn = { delay: 150, duration: 150 };
	const transitionOut = { duration: 100 };

	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	run(() => {
		currentPage.set(data.path);
	});
</script>

<!-- 
	The below markup is used on every page in the site. The <slot> is where the page's
	actual contents will show up.
-->
<ModeWatcher />
<div class="layout" class:open={$isMenuOpen}>
	<Header></Header>
	{#key data.path}
		<main id="main" tabindex="-1" in:fade|global={transitionIn} out:fade|global={transitionOut} class:full-size={data.path === '/tv'}>
			{@render children?.()}
		</main>
	{/key}
	<Footer></Footer>
	<Toaster />
</div>
