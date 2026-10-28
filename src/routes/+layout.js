import { error } from '@sveltejs/kit';
import '$lib/i18n';
import { waitLocale } from 'svelte-i18n';

// Ensures all pages under this layout (which is all of them) are statically prerendered at build time
export const prerender = true;

// Allows client side routing. Necessary for page transitions and link prefetching; change to false if you prefer ordinary routing without JS
export const csr = true;

export const load = async ({ url, fetch }) => {
    try {
        // Dynamic jam pages must render their content on the first server request too.
        await waitLocale();
        return {
            path: url.pathname
        };
    } catch (err) {
        error(500, err);
    }
};
