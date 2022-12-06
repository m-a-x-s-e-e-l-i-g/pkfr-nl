<script>
	import { titlePostfix } from '$lib/config';
	import Icon from 'svelte-awesome';
	import whatsapp from 'svelte-awesome/icons/whatsapp';
	import comment from 'svelte-awesome/icons/comment';
	import instagram from 'svelte-awesome/icons/instagram';
	import youtube from 'svelte-awesome/icons/youtube';

</script>

<style>
	ul {
		list-style: none;
	}
	li {
		margin-bottom: 1rem;
	}
	li span {
		margin-right: 0.5rem;
	}
</style>

<svelte:head>
	<title>Community Links {titlePostfix}</title>
</svelte:head>


<h1>Community Links</h1>
<ul>
	<!-- whatsapp icon -->
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/GamwcVgPYnq3UbKog2H9M8" rel="noreferrer" target="_blank">Whatsapp Community (Parkour Culture)</a></li>
	<li><span><Icon data={comment}/></span><a href="https://discord.com/invite/FeECDvG" rel="noreferrer" target="_blank">Discord om te chillen</a></li>
	<li><span><Icon data={instagram}/></span><a href="https://www.instagram.com/parkour_culture_NL/" rel="noreferrer" target="_blank">Instagram (Parkour Culture)</a></li>
	<li><span><Icon data={youtube}/></span><a href="https://www.youtube.com/channel/UCqpV0z_uw6aaLVXIW6wh21g" rel="noreferrer" target="_blank">YouTube (Parkour Culture)</a></li>

</ul>