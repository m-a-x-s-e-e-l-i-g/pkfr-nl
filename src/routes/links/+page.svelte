<script>
	import { titlePostfix } from '$lib/config';
	import Icon from 'svelte-awesome';
	import whatsapp from 'svelte-awesome/icons/whatsapp';
	import instagram from 'svelte-awesome/icons/instagram';
	import spotify from 'svelte-awesome/icons/spotify';
	import externalLink from 'svelte-awesome/icons/externalLink';
	import youtube from 'svelte-awesome/icons/youtube';
	import { t } from 'svelte-i18n';

</script>

<style>
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin-bottom: 1.25rem;
		padding: 1rem;
		background: var(--paper);
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		transition: all 0.2s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}
	li:hover {
		background: var(--background);
		border-color: var(--accent);
		transform: translateY(-1px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	li span {
		margin-right: 0.75rem;
		color: var(--accent);
	}
	a {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--ink);
		text-decoration: none;
		line-height: 1.5;
		vertical-align: middle;
		transition: color 0.2s ease;
	}
	a:hover {
		color: var(--accent);
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		li {
			padding: 0.875rem;
			margin-bottom: 1rem;
		}
		a {
			font-size: 1rem;
		}
	}
</style>

<svelte:head>
	<title>{$t('links.pageTitle')} {titlePostfix}</title>
</svelte:head>


<h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{$t('links.heading')}</h1>
<ul>
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8" rel="noreferrer" target="_blank">{$t('links.whatsappCommunity')}</a></li>
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/HVzvFn54TUBJfBzmAAcTba" rel="noreferrer" target="_blank">{$t('links.whatsappTraining')}</a></li>
	<li><span><Icon data={instagram}/></span><a href="https://www.instagram.com/parkour_culture_NL/" rel="noreferrer" target="_blank">{$t('links.instagram')}</a></li>
	<li><span><Icon data={spotify}/></span><a href="https://spoti.fi/3OazXTm" rel="noreferrer" target="_blank">{$t('links.spotifyPlaylist')}</a></li>
	<li><span><Icon data={externalLink}/></span><a href="https://parkourculture.nl/" rel="noreferrer" target="_blank">{$t('links.parkourcultureWebsite')}</a></li>
</ul>