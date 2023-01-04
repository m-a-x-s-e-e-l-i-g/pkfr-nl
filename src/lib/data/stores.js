import { writable } from 'svelte/store';
import { getDate } from '$lib/data/functions.js';
import browser from '$app/environment';

let defaultData = JSON.stringify({
	application: {
		selectedFilters: '',
		firstActivity: getDate(),
		lastActivity: getDate(),
		sortProducts: 'Last updated'
	}
});

export let data = writable(JSON.parse(defaultData));

if (browser) {
	data = writable(JSON.parse(window.localStorage.getItem('data')) || defaultData);

	data.subscribe((storedData) => {
		storedData.application.lastActivity = getDate();
		window.localStorage.setItem('data', JSON.stringify(storedData));
	});
}
