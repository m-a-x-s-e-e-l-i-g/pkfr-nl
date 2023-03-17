import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		dedupe: ['@fullcalendar/common'],
	},
	optimizeDeps: {
		include: ['@fullcalendar/common'],
	},
	server: {
		fs: {
			allow: ['.']
		}
	}
};

export default config
