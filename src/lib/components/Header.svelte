<script>
	import MainNav from './MainNav.svelte'
	import HamburgerMenuButton from './HamburgerMenuButton.svelte'
	import LanguageSwitcher from './LanguageSwitcher.svelte'
	import { siteTitle } from '$lib/config'
</script>


<header class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<a href="/" class="flex items-center gap-3 no-underline group">
			<span class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow">
				PK
			</span>
			<span class="hidden sm:block font-bold text-foreground text-lg tracking-tight">
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