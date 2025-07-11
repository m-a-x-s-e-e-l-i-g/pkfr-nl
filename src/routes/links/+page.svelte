<script>
	import { titlePostfix } from '$lib/config';
	import Icon from 'svelte-awesome';
	import whatsapp from 'svelte-awesome/icons/whatsapp';
	import instagram from 'svelte-awesome/icons/instagram';
	import spotify from 'svelte-awesome/icons/spotify';
	import externalLink from 'svelte-awesome/icons/externalLink';
	import youtube from 'svelte-awesome/icons/youtube';

</script>

<style>
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin-bottom: 1.25rem;
		padding: 1rem;
		background: #f8fafc;
		border-radius: 0.5rem;
		border: 1px solid #e2e8f0;
		transition: background 0.2s ease;
	}
	li:hover {
		background: #f1f5f9;
	}
	li span {
		margin-right: 0.75rem;
		vertical-align: middle;
	}
	a {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--darker);
		text-decoration: none;
		line-height: 1.5;
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
	<title>Community Links {titlePostfix}</title>
</svelte:head>


<h1>Community Links</h1>
<ul>
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8" rel="noreferrer" target="_blank">WhatsApp Community NL</a></li>
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/HVzvFn54TUBJfBzmAAcTba" rel="noreferrer" target="_blank">WhatsApp Traingroep NL</a></li>
	<li><span><Icon data={instagram}/></span><a href="https://www.instagram.com/parkour_culture_NL/" rel="noreferrer" target="_blank">Instagram (Parkourculture)</a></li>
	<li><span><Icon data={spotify}/></span><a href="https://spoti.fi/3OazXTm" rel="noreferrer" target="_blank">Spotify playlist</a></li>
	<li><span><Icon data={externalLink}/></span><a href="https://parkourculture.nl/" rel="noreferrer" target="_blank">Parkourculture website (voor lessen, workshops en kinderfeesten in Utrecht en omstreken)</a></li>
	<li><span><Icon data={youtube}/></span><a href="https://youtube.com/playlist?list=PL3iwaCsp8s8P0lVvw3DkmMFmGxqBGSXnS&si=Mu8VorSdOCdnwjK6" rel="noreferrer" target="_blank">NL Parkour Pulse: Verse video's</a></li>
	<li><span><Icon data={youtube}/></span><a href="https://youtube.com/playlist?list=PLIZ9EYUk7YaYgqhOHd1MqROfTmNw79UBy&si=JZ6U0iPv_J0RuUSw" rel="noreferrer" target="_blank">Must Watch: De Ultieme Playlist</a></li>
</ul>