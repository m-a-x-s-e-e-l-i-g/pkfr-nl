<script>
	import MainNav from './MainNav.svelte'
	import HamburgerMenuButton from './HamburgerMenuButton.svelte'
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import { siteTitle } from '$lib/config'
</script>


<header>

	<a href="/" class="site-title">
		{siteTitle}
	</a>
	
	<div class="header-controls">
		<LanguageSwitcher />
		<HamburgerMenuButton />
	</div>
	<MainNav />

</header>