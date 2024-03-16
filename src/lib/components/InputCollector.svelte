<script>
	import { useForm, validators, url, pattern, minLength, required } from 'svelte-use-form';
	import { Confetti } from "svelte-confetti"
	import { slide } from 'svelte/transition';

	export let pagePath;

    const form = useForm();
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

	let data = '',
		messageInput = '',
		jamStartDateTime = '',
		jamEndDateTime = '',
		jamName = '',
		jamDescription = '',
		jamLocation = '',
		gymDay = '',
		gymStartTime = '',
		gymEndTime = '',
		gymName = '',
		gymInfo = '',
		gymMessage = '',
		message = '';

	function resetForm() {
		data = '';
		messageInput = '';
		jamStartDateTime = '';
		jamEndDateTime = '';
		jamName = '';
		jamDescription = '';
		jamLocation = '';
		gymDay = '';
		gymStartTime = '';
		gymEndTime = '';
		gymName = '';
		gymInfo = '';
		gymMessage = '';
		message = '';
	}

	const sendMessage = async () => {
		if (pagePath === '/jams') {
			message = `${pagePath}%0A%0A${jamStartDateTime}%0A${jamEndDateTime}%0A%0A${jamName}%0A${jamDescription}%0A${jamLocation}`;
		} else if (pagePath === '/open-gyms') {
			message = `${pagePath}%0A%0A${gymDay}%0A${gymStartTime}%0A${gymEndTime}%0A%0A${gymName}%0A${gymInfo}%0A${gymMessage}`;
		} else {
			message = pagePath + ' ' + messageInput;
		}

		// replace new lines with %0A
		message = message.replace(/\n/g, '%0A');

		const response = await fetch(
			`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_API_KEY}/sendMessage?chat_id=${import.meta.env.VITE_TELEGRAM_CHAT_ID}&text=` + message
		);
		data = await response.json();
	};
</script>

<div class="formWrapper">
	{#if data.ok}
		<div class="prompt success" transition:slide>
			<p>Bedankt! Je input is ontvangen.</p>
			<div class="flex justify-center">
				<Confetti infinite amount=50 y={[0.25, 0.5]} x={[-2, 2]}/>
			</div>
			<button class="button" on:click={resetForm}>Ik heb meer input</button>
		</div>
	{:else if data.ok === false}
		<div class="prompt error" transition:slide>
			<p>Er is iets misgegaan. Probeer het later nog eens.</p>
			<code>{data.error_code}: {data.description}</code>
		</div>
	{:else}
		{#if pagePath === '/tv'}
			<form use:form on:submit|preventDefault={sendMessage} transition:slide>
				<input type="text" name="messageInput" bind:value={messageInput} placeholder="YouTube URL" use:validators={[url, pattern(youtubeRegex)]}/>
				<button class="button" disabled={!$form.valid}>Versturen</button>
			</form>
		{:else if pagePath === '/jams'}
			<form use:form on:submit|preventDefault={sendMessage} transition:slide>
				<div class="flex">
					<div class="mr-2 w-1/2">
						<label for="jamStartDateTime">Begin</label>
						<input type="datetime-local" id="jamStartDateTime" name="jamStartDateTime" bind:value={jamStartDateTime} use:validators={[required]} />
					</div>
					<div class="ml-2 w-1/2">
						<label for="jamEndDateTime">Eind</label>
						<input type="datetime-local" id="jamEndDateTime" name="jamEndDateTime" bind:value={jamEndDateTime} use:validators={[required]} />
					</div>
				</div>
				<label for="jamName">Naam</label>
				<input type="text" id="jamName" name="jamName" bind:value={jamName} use:validators={[minLength(5)]}/>
				<label for="jamDescription">Omschrijving</label>
				<input type="text" id="jamDescription" name="jamDescription" bind:value={jamDescription} use:validators={[minLength(10)]}/>
				<label for="jamLocation">Startlocatie</label>
				<input type="text" id="jamLocation" name="jamLocation" bind:value={jamLocation} use:validators={[minLength(5)]}/>
				<button class="button" disabled={!$form.valid}>Versturen</button>
			</form>
		{:else if pagePath === '/open-gyms'}
			<form use:form on:submit|preventDefault={sendMessage} transition:slide>
				<label for="gymName">Gymnaam</label>
				<input type=text id="gymName" name="gymName" bind:value={gymName} use:validators={[required]}>
				<label for="gymDay">Dag</label>
				<select id="gymDay" name="gymDay" bind:value={gymDay} use:validators={[required]}>
					<option value="maandag">Maandag</option>
					<option value="dinsdag">Dinsdag</option>
					<option value="woensdag">Woensdag</option>
					<option value="donderdag">Donderdag</option>
					<option value="vrijdag">Vrijdag</option>
					<option value="zaterdag">Zaterdag</option>
					<option value="zondag">Zondag</option>
				</select>
				<div class="flex">
					<div class="mr-2 w-1/2">
						<label for="gymStartTime">Begin</label>
						<input type="time" id="gymStartTime" name="gymStartTime" bind:value={gymStartTime} />
					</div>
					<div class="ml-2 w-1/2">
						<label for="gymEndTime">Eind</label>
						<input type="time" id="gymEndTime" name="gymEndTime" bind:value={gymEndTime}/>
					</div>
				</div>
				<label for="gymInfo">Omschrijving</label>
				<textarea id="gymInfo" name="gymInfo" bind:value={gymInfo} placeholder="Voor €10 kun je 2 uur beesten op onze bakstenen binnengym. Meer informatie vind je ..."></textarea>
				<label for="gymMessage">Opmerkingen</label>
				<textarea id="gymMessage" name="gymMessage" bind:value={gymMessage} placeholder="Open gyms van maandagen gaan niet door."></textarea>
				<button class="button" disabled={!$form.valid}>Versturen</button>
			</form>
		{:else}
			<form use:form on:submit|preventDefault={sendMessage} transition:slide>
				<input type="text" name="messageInput" bind:value={messageInput} use:validators={[minLength(15)]}/>
				<button class="button" disabled={!$form.valid}>Versturen</button>
			</form>
		{/if}
	{/if}
</div>

<style>
	form {
		position: relative;
	}

	button:disabled {
		pointer-events: none;
		opacity: 0.5;
		user-select: none;
	}

	input {
		line-height: 1.5rem;
	}

	.prompt {
		padding: 1rem;
		text-align: center;
		font-size: larger;
	}
	code {
		font-size: smaller;
	}
</style>
