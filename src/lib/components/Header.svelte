<script>
	import MainNav from './MainNav.svelte'
	import HamburgerMenuButton from './HamburgerMenuButton.svelte'
	import { siteTitle } from '$lib/config'
</script>


<header>

	<a href="/" class="site-title">
		{siteTitle}
	</a>
	
	<HamburgerMenuButton />
	<MainNav />

</header>