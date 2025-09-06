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

// Theme management - automatically detects system preference
function createThemeStore() {
    const { subscribe, set } = writable('light');

    return {
        subscribe,
        init: () => {
            if (!isBrowser) return;

            // Check system preference
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const systemPrefersDark = mediaQuery.matches;
            
            // Set initial theme based on system preference
            const initialTheme = systemPrefersDark ? 'dark' : 'light';
            set(initialTheme);
            
            // Apply theme to document
            if (initialTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            // Listen for system theme changes
            mediaQuery.addEventListener('change', (e) => {
                const newTheme = e.matches ? 'dark' : 'light';
                set(newTheme);
                
                // Apply theme to document
                if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });
        }
    };
}

export const theme = createThemeStore();

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
