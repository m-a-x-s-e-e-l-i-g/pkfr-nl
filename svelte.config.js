import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
    extensions: ['.svelte', '.md'],

    preprocess: [
        preprocess({
            scss: {
                // Ensures Sass variables are always available inside component <style> blocks as vars.$variableDefinedInFile
                prependData: `@use 'src/lib/assets/scss/vars';`
            }
        }),
        mdsvex({
            // The default mdsvex extension is .svx; this overrides that.
            extensions: ['.md'],

            // Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
        }),
        vitePreprocess({})
    ],

    kit: {
        alias: {
            $lib: 'src/lib'
        },
        adapter: adapter(),
        prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                // ignore 404 errors for images using Netlify CDN
                if (path.startsWith('/.netlify/images')) {
                    return;
                }

                // otherwise fail the build
                throw new Error(`Failed to prerender ${path} from ${referrer}: ${message}`);
            }
        }
    }
};

export default config;
