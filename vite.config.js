import { vite as vidstack } from 'vidstack/plugins';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [tailwindcss(), sveltekit(), vidstack()],
    resolve: {
        dedupe: ['@fullcalendar/common']
    },
    optimizeDeps: {
        include: ['@fullcalendar/common']
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
