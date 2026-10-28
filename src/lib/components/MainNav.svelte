<script>
	import { navItems } from '$lib/config'
	import { isMenuOpen } from '$lib/assets/js/store'
	import NavItem from './NavItem.svelte'
	import HamburgerMenuButton from './HamburgerMenuButton.svelte'
	import { t } from 'svelte-i18n'

	// Create a mapping for translated nav items
	const navItemKeys = {
		'Spots': 'nav.spots',
		'Jams & Events': 'nav.jams',
		'Open Gyms': 'nav.openGyms',
		'Links': 'nav.links',
		'Tools': 'nav.tools'
	}
</script>

<!-- Contents of this file will be used in the header and the responsive hamburger menu. -->
<nav class="main-nav" class:open={$isMenuOpen}>
	<ul>
		{#each navItems as page}
		<NavItem href={page.route}>
			{$t(navItemKeys[page.title] || page.title)}
		</NavItem>
		{/each}
	</ul>
	<HamburgerMenuButton closeOnly={true} />
</nav>