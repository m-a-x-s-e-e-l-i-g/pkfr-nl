<script>
	import { locale, t } from 'svelte-i18n';

	function switchLanguage(lang) {
		$locale = lang;
		// Store the preference in localStorage and cookie
		if (typeof window !== 'undefined') {
			localStorage.setItem('locale', lang);
			// Set cookie for server-side detection
			document.cookie = `locale=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
		}
	}

	// Load saved language preference on component mount
	import { onMount } from 'svelte';
	onMount(() => {
		const savedLocale = localStorage.getItem('locale');
		if (savedLocale && savedLocale !== $locale) {
			$locale = savedLocale;
		}
	});
</script>

<div class="language-switcher">
	<button 
		class="flag-btn {$locale === 'nl' ? 'active' : ''}"
		onclick={() => switchLanguage('nl')}
		title="Nederlands"
		aria-label="Switch to Dutch"
	>
		<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="20" height="5" fill="#AE1C28"/>
			<rect y="5" width="20" height="5" fill="#FFFFFF"/>
			<rect y="10" width="20" height="5" fill="#21468B"/>
		</svg>
	</button>
	<button 
		class="flag-btn {$locale === 'en' ? 'active' : ''}"
		onclick={() => switchLanguage('en')}
		title="English"
		aria-label="Switch to English"
	>
		<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="20" height="15" fill="#012169"/>
			<path d="M0 0l20 15M20 0L0 15" stroke="#FFFFFF" stroke-width="2"/>
			<path d="M0 0l20 15M20 0L0 15" stroke="#C8102E" stroke-width="1"/>
			<path d="M10 0v15M0 7.5h20" stroke="#FFFFFF" stroke-width="3"/>
			<path d="M10 0v15M0 7.5h20" stroke="#C8102E" stroke-width="2"/>
		</svg>
	</button>
</div>

<style>
	.language-switcher {
		display: flex;
		align-items: end;
		gap: 0.25rem;
		height: 2.5rem; /* Match hamburger button height */
	}

	.flag-btn {
		background: none;
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		transition: all 0.2s ease;
		border-radius: 0.25rem;
		opacity: 0.7;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		width: 2.5rem; /* Make buttons match hamburger size */
		height: 2.5rem; /* Explicit height matching hamburger */
	}

	.flag-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
		background-color: var(--color-muted);
		border-color: var(--color-border);
	}

	.flag-btn.active {
		opacity: 1;
		background-color: color-mix(in oklch, var(--color-accent) 12%, transparent);
		border-color: color-mix(in oklch, var(--color-accent) 35%, var(--color-border));
	}

	.flag-btn svg {
		border-radius: 2px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		width: 20px;
		height: 15px;
	}

	@media (max-width: 768px) {
		.language-switcher {
			gap: 0.25rem;
			height: 2.5rem;
		}
		
		.flag-btn {
			padding: 0.25rem;
			width: 2.5rem;
			height: 2.5rem;
		}
		
		.flag-btn svg {
			width: 18px;
			height: 13px;
		}
	}
</style>
