import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [
        tailwindcss(),
        sveltekit({
            alias: { $lib: 'src/lib' },
            extensions: ['.svelte', '.md'],
            preprocess: [
                preprocess({
                    scss: {
                        prependData: `@use 'src/lib/assets/scss/vars';`
                    }
                }),
                mdsvex({
                    extensions: ['.md'],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
                }),
                vitePreprocess({})
            ],
            adapter: adapter(),
            prerender: {
                handleHttpError: ({ path, referrer, message }) => {
                    // Netlify transforms these images after deployment.
                    if (path.startsWith('/.netlify/images')) return;
                    throw new Error(`Failed to prerender ${path} from ${referrer}: ${message}`);
                }
            }
        })
    ],
    define: {
        __NETLIFY_DEPLOY_CONTEXT__: JSON.stringify(process.env.CONTEXT || 'local')
    },
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
