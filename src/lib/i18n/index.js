import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';

const defaultLocale = 'nl';

register('en', () => import('./locales/en.json'));
register('nl', () => import('./locales/nl.json'));

function detectLocale() {
	if (browser) {
		// Check localStorage first for saved preference
		const savedLocale = localStorage.getItem('locale');
		if (savedLocale && ['en', 'nl'].includes(savedLocale)) {
			return savedLocale;
		}

		// Check cookie set by server
		const cookieLocale = document.cookie
			.split('; ')
			.find(row => row.startsWith('locale='))
			?.split('=')[1];
		if (cookieLocale && ['en', 'nl'].includes(cookieLocale)) {
			return cookieLocale;
		}

		// Check browser language settings
		const browserLanguages = navigator.languages || [navigator.language];
		for (const lang of browserLanguages) {
			const langCode = lang.split('-')[0].toLowerCase();
			if (['en', 'nl'].includes(langCode)) {
				return langCode;
			}
		}
	}
	return defaultLocale;
}

init({
	fallbackLocale: defaultLocale,
	initialLocale: detectLocale(),
});
