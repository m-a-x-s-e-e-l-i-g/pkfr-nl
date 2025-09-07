<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { t } from 'svelte-i18n';

	import { Confetti } from "svelte-confetti"
	import { slide } from 'svelte/transition';

	let { pagePath } = $props();

	let data = $state(''),
		messageInput = $state(''),
		jamStartDateTime = $state(''),
		jamEndDateTime = $state(''),
		jamName = $state(''),
		jamDescription = $state(''),
		jamLocation = $state(''),
		gymDay = $state(''),
		gymStartTime = $state(''),
		gymEndTime = $state(''),
		gymName = $state(''),
		gymInfo = $state(''),
		gymMessage = $state(''),
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


    function validateForm() {
        if (pagePath === '/jams') {
            return jamStartDateTime && jamEndDateTime && jamName.length >= 5 && jamDescription.length >= 10 && jamLocation.length >= 5;
        } else if (pagePath === '/open-gyms') {
            return gymName && gymDay;
        } else {
            return messageInput.length >= 15;
        }
    }
    // Validation logic
    let formValid = $derived(validateForm());
</script>

<div class="formWrapper">
	{#if data.ok}
		<div class="prompt success" transition:slide>
			<p>{$t('forms.success')}</p>
			<div style="display: flex; justify-content: center;">
				<Confetti infinite amount=50 y={[0.25, 0.5]} x={[-2, 2]}/>
			</div>
			<button class="button" onclick={resetForm}>{$t('forms.successButton')}</button>
		</div>
	{:else if data.ok === false}
		<div class="prompt error" transition:slide>
			<p>{$t('forms.error')}</p>
			<code>{data.error_code}: {data.description}</code>
		</div>
	{:else}
		{#if pagePath === '/jams'}
				<form onsubmit={preventDefault(sendMessage)} transition:slide>
					<div class="flex">
						<div class="mr-2 w-1/2">
							<label for="jamStartDateTime">{$t('forms.jam.start')}</label>
							<input type="datetime-local" id="jamStartDateTime" name="jamStartDateTime" bind:value={jamStartDateTime} />
						</div>
						<div class="ml-2 w-1/2">
						<label for="jamEndDateTime">{$t('forms.jam.end')}</label>
							<input type="datetime-local" id="jamEndDateTime" name="jamEndDateTime" bind:value={jamEndDateTime} />
						</div>
					</div>
				<label for="jamName">{$t('forms.jam.name')}</label>
					<input type="text" id="jamName" name="jamName" bind:value={jamName} />
				<label for="jamDescription">{$t('forms.jam.description')}</label>
					<input type="text" id="jamDescription" name="jamDescription" bind:value={jamDescription} />
				<label for="jamLocation">{$t('forms.jam.location')}</label>
					<input type="text" id="jamLocation" name="jamLocation" bind:value={jamLocation} />
				<button class="button" disabled={!formValid}>{$t('forms.sendButton')}</button>
				</form>
		{:else if pagePath === '/open-gyms'}
			<form onsubmit={preventDefault(sendMessage)} transition:slide>
				<label for="gymName">{$t('forms.gym.name')}</label>
				<input type=text id="gymName" name="gymName" bind:value={gymName}>
				<label for="gymDay">{$t('forms.gym.day')}</label>
				<select id="gymDay" name="gymDay" bind:value={gymDay}>
					<option value="maandag">{$t('forms.days.maandag')}</option>
					<option value="dinsdag">{$t('forms.days.dinsdag')}</option>
					<option value="woensdag">{$t('forms.days.woensdag')}</option>
					<option value="donderdag">{$t('forms.days.donderdag')}</option>
					<option value="vrijdag">{$t('forms.days.vrijdag')}</option>
					<option value="zaterdag">{$t('forms.days.zaterdag')}</option>
					<option value="zondag">{$t('forms.days.zondag')}</option>
				</select>
				<div class="flex">
					<div class="mr-2 w-1/2">
						<label for="gymStartTime">{$t('forms.gym.start')}</label>
						<input type="time" id="gymStartTime" name="gymStartTime" bind:value={gymStartTime} />
					</div>
					<div class="ml-2 w-1/2">
						<label for="gymEndTime">{$t('forms.gym.end')}</label>
						<input type="time" id="gymEndTime" name="gymEndTime" bind:value={gymEndTime}/>
					</div>
				</div>
				<label for="gymInfo">{$t('forms.jam.description')}</label>
				<textarea id="gymInfo" name="gymInfo" bind:value={gymInfo} placeholder={$t('forms.gym.infoPlaceholder')}></textarea>
				<label for="gymMessage">{$t('forms.gym.notes')}</label>
				<textarea id="gymMessage" name="gymMessage" bind:value={gymMessage} placeholder={$t('forms.gym.messagePlaceholder')}></textarea>
				<button class="button" disabled={!formValid}>{$t('forms.sendButton')}</button>
			</form>
		{:else}
			<form onsubmit={preventDefault(sendMessage)} transition:slide>
				<input type="text" name="messageInput" bind:value={messageInput} />
				<button class="button" disabled={!formValid}>{$t('forms.sendButton')}</button>
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
