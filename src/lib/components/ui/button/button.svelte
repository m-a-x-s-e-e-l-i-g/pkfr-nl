<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js.ts.js";
	import { buttonVariants, type Props, type Events } from "./index.js";

	type $$Props = Props;
	type $$Events = Events;

	interface Props_1 {
		class?: $$Props["class"];
		variant?: $$Props["variant"];
		size?: $$Props["size"];
		builders?: $$Props["builders"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		variant = "default",
		size = "default",
		builders = [],
		children,
		...rest
	}: Props_1 = $props();
	
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...rest}
	on:click
	on:keydown
>
	{@render children?.()}
</ButtonPrimitive.Root>
