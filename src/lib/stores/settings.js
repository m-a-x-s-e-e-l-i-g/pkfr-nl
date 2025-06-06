import { writable } from 'svelte/store';

// Check if localStorage is available
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Retrieve the initial values from localStorage or default to predefined sizes
const storedMyShoeSize = isBrowser ? localStorage.getItem('myShoeSize') : null;
const storedFriendShoeSize = isBrowser ? localStorage.getItem('friendShoeSize') : null;
const initialMyShoeSize = storedMyShoeSize ? parseFloat(storedMyShoeSize) : 46;
const initialFriendShoeSize = storedFriendShoeSize ? parseFloat(storedFriendShoeSize) : 40;

export const myShoeSize = writable(initialMyShoeSize);
export const friendShoeSize = writable(initialFriendShoeSize);

// Subscribe to changes and update localStorage
if (isBrowser) {
    myShoeSize.subscribe((value) => {
        if (value == null) return;
        localStorage.setItem('myShoeSize', value.toString());
    });

    friendShoeSize.subscribe((value) => {
        if (value == null) return;
        localStorage.setItem('friendShoeSize', value.toString());
    });
}
