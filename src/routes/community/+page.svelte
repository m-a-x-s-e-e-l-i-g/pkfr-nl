<script>
	import { titlePostfix } from '$lib/config';
	import Icon from 'svelte-awesome';
	import whatsapp from 'svelte-awesome/icons/whatsapp';
	import comment from 'svelte-awesome/icons/comment';
	import instagram from 'svelte-awesome/icons/instagram';

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
	<title>Community {titlePostfix}</title>
</svelte:head>


<h1>Community</h1>
<ul>
	<!-- whatsapp icon -->
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/EHWnnlZSOhAHskePl4eCIq" rel="noreferrer" target="_blank">Groepschat voor traingingen</a></li>
	<li><span><Icon data={whatsapp}/></span><a href="https://chat.whatsapp.com/IN54zbsYPwQKAyXedO9xJB" rel="noreferrer" target="_blank">Groepschat om te kletsen</a></li>
	<li><span><Icon data={comment}/></span><a href="https://discord.com/invite/FeECDvG" rel="noreferrer" target="_blank">Discord om te chillen</a></li>
	<li><span><Icon data={instagram}/></span><a href="https://www.instagram.com/parkour_culture_NL/" rel="noreferrer" target="_blank">Parkour Culture Instagram</a></li>

</ul>