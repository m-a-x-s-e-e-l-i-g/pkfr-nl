<script>
	import MainNav from './MainNav.svelte'
	import { siteAuthor, siteLink } from '$lib/config'
	import Icon from 'svelte-awesome';
	import github from 'svelte-awesome/icons/github';
</script>

<footer>
	<MainNav />

	<nav>
		<ul>
			<li>
				<a href="/api/rss.xml" rel="external">RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="{siteLink}" target="_blank" rel="noreferrer">Bijdragen</a>
			</li>
		</ul>
	</nav>

	<p>
		&copy;{new Date().getFullYear()} {@html siteAuthor} <br/><br/>
		<a href="{siteLink}" target="_blank" rel="noreferrer"><Icon data={github}/></a>
	</p>
</footer>