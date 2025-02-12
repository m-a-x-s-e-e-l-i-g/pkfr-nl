<script lang="ts">
	import { cn } from "$lib/utils.js.ts.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { alertVariants, type Variant } from "./index.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
	};

	interface Props {
		class?: $$Props["class"];
		variant?: $$Props["variant"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, variant = "default", children, ...rest }: Props = $props();
	
</script>

<div class={cn(alertVariants({ variant }), className)} {...rest} role="alert">
	{@render children?.()}
</div>
