<script lang="ts">
	import { currentPage, isMenuOpen } from '$lib/assets/js/store'

	let { href, children } = $props();
	const isExternal = href?.startsWith('http');

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
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
	>
		{@render children?.()}
	</a>
</li>