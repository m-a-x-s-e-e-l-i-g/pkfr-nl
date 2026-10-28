<script>
	import MainNav from './MainNav.svelte'
	import HamburgerMenuButton from './HamburgerMenuButton.svelte'
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import { siteTitle } from '$lib/config'
</script>


<header class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<a href="/" class="flex items-center gap-3 no-underline group">
			<span class="font-bold text-foreground text-lg tracking-tight lowercase">
				{siteTitle}
			</span>
		</a>
		
		<div class="flex items-center gap-3">
			<MainNav />
			<LanguageSwitcher />
			<HamburgerMenuButton />
		</div>
	</div>
</header>