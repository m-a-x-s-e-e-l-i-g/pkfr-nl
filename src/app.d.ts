// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare module 'svelte-awesome';
declare module 'svelte-awesome/icons/*';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
