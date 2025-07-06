import type { Button as ButtonPrimitive } from 'bits-ui';
import { tv, type VariantProps } from 'tailwind-variants';
import Root from './button.svelte';

const buttonVariants = tv({
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
            destructive:
                'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            outline:
                'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-11 px-4 py-2 sm:h-9 sm:px-4 sm:py-2',
            sm: 'h-10 px-3 text-sm sm:h-8 sm:px-3 sm:text-xs',
            lg: 'h-12 px-6 sm:h-10 sm:px-8',
            icon: 'h-11 w-11 sm:h-9 sm:w-9'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Size = VariantProps<typeof buttonVariants>['size'];

type Props = ButtonPrimitive.Props & {
    variant?: Variant;
    size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
    Root,
    type Props,
    type Events,
    //
    Root as Button,
    type Props as ButtonProps,
    type Events as ButtonEvents,
    buttonVariants
};
