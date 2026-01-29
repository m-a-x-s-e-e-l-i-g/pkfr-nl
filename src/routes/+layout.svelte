<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script lang="ts">
	import { run } from 'svelte/legacy';

	import '../app.pcss';
	import '$lib/assets/scss/global.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { currentPage, isMenuOpen } from '$lib/assets/js/store';
	import { theme } from '$lib/stores/settings.js';
	import { navItems } from '$lib/config';
	import { siteTitle } from '$lib/config';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import '$lib/i18n';
	import { isLoading } from 'svelte-i18n';
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

	// Initialize theme detection on mount
	onMount(() => {
		theme.init();
	});
</script>

<!-- 
	The below markup is used on every page in the site. The <slot> is where the page's
	actual contents will show up.
-->
{#if !$isLoading}
<div class="page-wrapper" class:open={$isMenuOpen}>
	<Header></Header>
	{#key data.path}
		<main id="main" tabindex="-1" class="main-content" in:fade|global={transitionIn} out:fade|global={transitionOut}>
			{@render children?.()}
		</main>
	{/key}
	<Footer></Footer>
</div>
{:else}
<div class="min-h-screen flex items-center justify-center bg-background">
	<div class="flex flex-col items-center gap-4">
		<div class="font-black text-xl text-foreground lowercase">{siteTitle}</div>
		<span class="text-muted-foreground">Loading...</span>
	</div>
</div>
{/if}
