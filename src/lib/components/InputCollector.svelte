<script>
	import { useForm, validators, url, pattern, minLength } from 'svelte-use-form';
	import { Icon } from 'svelte-awesome';
	import send from 'svelte-awesome/icons/send';

	export let pagePath;
	export let placeholder;

    const form = useForm();
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

	let data = '';
	let messageInput = '';

	const sendMessage = async () => {
		let message = pagePath + ' ' + messageInput;

		const response = await fetch(
			`https://api.telegram.org/bot${
				import.meta.env.VITE_TELEGRAM_BOT_API_KEY
			}/sendMessage?chat_id=${import.meta.env.VITE_TELEGRAM_CHAT_ID}&text=` + message
		);
		data = await response.json();
	};
</script>

<div class="formWrapper">
	{#if data.ok}
		<div class="prompt success">
			<p>Bedankt! Je bijdrage is ontvangen.</p>
		</div>
	{:else if data.ok === false}
		<div class="prompt error">
			<p>Er is iets misgegaan. Probeer het later nog eens.</p>
		</div>
	{:else}
		<form use:form on:submit|preventDefault={sendMessage}>
            {#if pagePath === '/tv'}
			    <input name="messageInput" bind:value={messageInput} {placeholder} use:validators={[url, pattern(youtubeRegex)]}/>
            {:else}
                <input name="messageInput" bind:value={messageInput} {placeholder} use:validators={[minLength(15)]}/>
            {/if}
			<button disabled={!$form.valid}><Icon data={send} /></button>
		</form>
	{/if}
</div>

<style>
	form {
		position: relative;
	}

	button {
		position: absolute;
		top: 0;
		right: 0;
		width: 50px;
		cursor: pointer;
		margin: 0;
		line-height: 1.5rem;
		border: 1px solid var(--darker);
	}

	input:focus + button {
		border: 2px solid var(--darker);
		line-height: 1.4rem;
	}

	button:disabled {
		pointer-events: none;
		background: var(--lightAccent);
	}

	input {
		padding-right: 60px;
		line-height: 1.5rem;
	}

	.prompt {
		padding: 1rem;
		text-align: center;
		font-size: larger;
		color: white;
	}

	.prompt.success {
		background: var(--green);
	}

	.prompt.error {
		background: var(--accent);
	}
</style>
