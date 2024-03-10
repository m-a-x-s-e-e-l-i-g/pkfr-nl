import { writable } from 'svelte/store'

export const currentPage = writable('')
export const isMenuOpen = writable(false)
export const gymFinderRadius = writable(100)