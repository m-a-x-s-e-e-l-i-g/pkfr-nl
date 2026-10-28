import { jamFeed } from '$lib/server/jamFeed';

export const prerender = false;
export const GET = () => jamFeed('markdown');
