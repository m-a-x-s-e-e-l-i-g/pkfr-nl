<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { t } from 'svelte-i18n';

	import { Confetti } from "svelte-confetti"
	import { slide } from 'svelte/transition';

	let { pagePath } = $props();

	type TelegramSendMessageResponse = {
		ok: boolean;
		error_code?: number;
		description?: string;
		result?: unknown;
	};

	let data = $state<TelegramSendMessageResponse | null>(null),
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
		data = null;
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
		data = (await response.json()) as TelegramSendMessageResponse;
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
	{#if data?.ok}
		<div class="rounded-xl border border-border bg-card p-6 text-center" transition:slide>
			<p class="text-lg font-semibold text-foreground">{$t('forms.success')}</p>
			<div class="mt-3 flex justify-center">
				<Confetti infinite amount={50} y={[0.25, 0.5]} x={[-2, 2]} />
			</div>
			<div class="mt-6">
				<button class="button" type="button" onclick={resetForm}>{$t('forms.successButton')}</button>
			</div>
		</div>
	{:else if data?.ok === false}
		<div class="rounded-xl border border-destructive/40 bg-destructive/5 p-6" transition:slide>
			<p class="text-lg font-semibold text-foreground">{$t('forms.error')}</p>
			<code class="mt-2 block text-sm text-muted-foreground">{data?.error_code}: {data?.description}</code>
		</div>
	{:else}
		{#if pagePath === '/jams'}
				<form class="mt-4 space-y-4" onsubmit={preventDefault(sendMessage)} transition:slide>
					<div class="grid gap-4 md:grid-cols-2">
						<div class="form-field">
							<label class="form-label" for="jamStartDateTime">{$t('forms.jam.start')}</label>
							<input
								class="input"
								type="datetime-local"
								id="jamStartDateTime"
								name="jamStartDateTime"
								bind:value={jamStartDateTime}
							/>
						</div>
						<div class="form-field">
							<label class="form-label" for="jamEndDateTime">{$t('forms.jam.end')}</label>
							<input
								class="input"
								type="datetime-local"
								id="jamEndDateTime"
								name="jamEndDateTime"
								bind:value={jamEndDateTime}
							/>
						</div>
					</div>

					<div class="form-field">
						<label class="form-label" for="jamName">{$t('forms.jam.name')}</label>
						<input class="input" type="text" id="jamName" name="jamName" bind:value={jamName} />
					</div>

					<div class="form-field">
						<label class="form-label" for="jamDescription">{$t('forms.jam.description')}</label>
						<input class="input" type="text" id="jamDescription" name="jamDescription" bind:value={jamDescription} />
					</div>

					<div class="form-field">
						<label class="form-label" for="jamLocation">{$t('forms.jam.location')}</label>
						<input class="input" type="text" id="jamLocation" name="jamLocation" bind:value={jamLocation} />
					</div>

					<div class="pt-2">
						<button class="button" disabled={!formValid} type="submit">{$t('forms.sendButton')}</button>
					</div>
				</form>
		{:else if pagePath === '/open-gyms'}
			<form class="mt-4 space-y-4" onsubmit={preventDefault(sendMessage)} transition:slide>
				<div class="form-field">
					<label class="form-label" for="gymName">{$t('forms.gym.name')}</label>
					<input class="input" type="text" id="gymName" name="gymName" bind:value={gymName} />
				</div>

				<div class="form-field">
					<label class="form-label" for="gymDay">{$t('forms.gym.day')}</label>
					<select class="select" id="gymDay" name="gymDay" bind:value={gymDay}>
						<option value="" disabled>{$t('forms.gym.day')}</option>
						<option value="maandag">{$t('forms.days.maandag')}</option>
						<option value="dinsdag">{$t('forms.days.dinsdag')}</option>
						<option value="woensdag">{$t('forms.days.woensdag')}</option>
						<option value="donderdag">{$t('forms.days.donderdag')}</option>
						<option value="vrijdag">{$t('forms.days.vrijdag')}</option>
						<option value="zaterdag">{$t('forms.days.zaterdag')}</option>
						<option value="zondag">{$t('forms.days.zondag')}</option>
					</select>
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					<div class="form-field">
						<label class="form-label" for="gymStartTime">{$t('forms.gym.start')}</label>
						<input class="input" type="time" id="gymStartTime" name="gymStartTime" bind:value={gymStartTime} />
					</div>
					<div class="form-field">
						<label class="form-label" for="gymEndTime">{$t('forms.gym.end')}</label>
						<input class="input" type="time" id="gymEndTime" name="gymEndTime" bind:value={gymEndTime} />
					</div>
				</div>

				<div class="form-field">
					<label class="form-label" for="gymInfo">{$t('forms.jam.description')}</label>
					<textarea
						class="textarea"
						id="gymInfo"
						name="gymInfo"
						bind:value={gymInfo}
						placeholder={$t('forms.gym.infoPlaceholder')}
					></textarea>
				</div>

				<div class="form-field">
					<label class="form-label" for="gymMessage">{$t('forms.gym.notes')}</label>
					<textarea
						class="textarea"
						id="gymMessage"
						name="gymMessage"
						bind:value={gymMessage}
						placeholder={$t('forms.gym.messagePlaceholder')}
					></textarea>
				</div>

				<div class="pt-2">
					<button class="button" disabled={!formValid} type="submit">{$t('forms.sendButton')}</button>
				</div>
			</form>
		{:else}
			<form class="mt-4 space-y-4" onsubmit={preventDefault(sendMessage)} transition:slide>
				<div class="form-field">
					<input
						class="input"
						type="text"
						name="messageInput"
						bind:value={messageInput}
						placeholder={$t('forms.messagePlaceholder')}
					/>
				</div>
				<div class="pt-2">
					<button class="button" disabled={!formValid} type="submit">{$t('forms.sendButton')}</button>
				</div>
			</form>
		{/if}
	{/if}
</div>

<style>
	.formWrapper {
		max-width: 56rem;
		margin: 0 auto;
	}
</style>
