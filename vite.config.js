import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [tailwindcss(), sveltekit()],
    resolve: {
        dedupe: ['@fullcalendar/common']
    },
    optimizeDeps: {
        include: ['@fullcalendar/common']
    },
    ssr: {
        // Netlify's function runtime cannot require the sanitizer's ESM parser.
        // Bundle the parser with the sanitizer instead of loading it at runtime.
        noExternal: ['sanitize-html', 'htmlparser2', 'is-plain-object']
    },
    server: {
        watch: {
            usePolling: true,
            interval: 50
        },
        fs: {
            allow: ['.']
        }
    }
};

export default config;
