import { locale } from 'svelte-i18n';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Extract language preference from Accept-Language header
	const acceptLanguage = event.request.headers.get('accept-language');
	let detectedLocale = 'nl'; // default

	if (acceptLanguage) {
		// Parse Accept-Language header
		const languages = acceptLanguage
			.split(',')
			.map(lang => lang.split(';')[0].trim().toLowerCase())
			.map(lang => lang.split('-')[0]); // Get language code only

		// Find first supported language
		for (const lang of languages) {
			if (['en', 'nl'].includes(lang)) {
				detectedLocale = lang;
				break;
			}
		}
	}

	// Set locale cookie if not already set
	const localeCookie = event.cookies.get('locale');
	if (!localeCookie) {
		event.cookies.set('locale', detectedLocale, { 
			path: '/', 
			maxAge: 60 * 60 * 24 * 365, // 1 year
			sameSite: 'lax'
		});
	}

	// Add locale to event.locals for use in load functions
	event.locals.locale = localeCookie || detectedLocale;

	const response = await resolve(event);
	return response;
}
