import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Helper type used by some shadcn-svelte components to strip children-related props
export type WithoutChildrenOrChild<T> = Omit<T, 'children' | 'child'>;
