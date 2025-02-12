<script lang="ts">
	import { currentPage, isMenuOpen } from '$lib/assets/js/store'

	let { href, children } = $props();

	let isCurrentPage = $derived($currentPage.startsWith(href))

	const maybeCloseMenu = () => {
		if (href != $currentPage) {
			isMenuOpen.set(false)
		}
	}
</script>


<li>
	<a
		href={href}
		onclick={maybeCloseMenu}
		class:active={isCurrentPage}
		aria-current={isCurrentPage ? 'page' : false}
	>
		{@render children?.()}
	</a>
</li>