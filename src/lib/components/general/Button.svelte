<script module>
	import { onMount, type Component, type Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	type Type = 'primary' | 'default' | 'dashed' | 'text' | 'link';
	type Variant = 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
	type Size = 'large' | 'medium' | 'small';
	type Shape = 'circle' | 'rounded';
	type Color =
		| 'default'
		| 'primary'
		| 'danger'
		| 'blue'
		| 'pink'
		| 'purple'
		| 'cyan'
		| 'green'
		| 'magenta'
		| 'red'
		| 'orange'
		| 'yellow'
		| 'volcano'
		| 'geekblue'
		| 'lime'
		| 'gold';
	type ButtonHTMLType = 'submit' | 'reset' | 'button';
	type IconPlacement = 'start' | 'end';
	export type ButtonProps = {
		// Functional props
		children?: Snippet;
		ref?: HTMLButtonElement;
		autoInsertSpace?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		href?: string;
		htmlType?: ButtonHTMLType;
		target?: string;
		loading?: boolean | { delay: number; icon: Component };
		// Style props
		icon?: Component;
		iconPlacement?: IconPlacement;
		block?: boolean;
		shape?: Shape;
		size?: Size;
		disabled?: boolean;
		ghost?: boolean;
		danger?: boolean;
		variant?: Variant;
		color?: Color;
		type?: Type;
	};

	export const CHINESE_REGEX = /^[\u4e00-\u9fff]{2}$/;
	export function autoInsertChineseSpace(text: string) {
		return CHINESE_REGEX.test(text) ? `${text[0]} ${text[1]}` : text;
	}
</script>

<script lang="ts">
	let {
		// Functional props
		children = undefined,
		ref = $bindable(),
		autoInsertSpace = true,
		onclick = undefined,
		href = undefined,
		htmlType = 'button',
		target = undefined,
		// Style props
		icon = undefined,
		iconPlacement = 'start',
		block = false,
		shape = 'rounded',
		size = 'medium',
		loading = false,
		type = 'default',
		color = undefined,
		variant = undefined,
		danger = false,
		ghost = false,
		disabled = undefined,
	}: ButtonProps = $props();

	let root: HTMLButtonElement | undefined = $state(undefined);

	onMount(() => {
		ref = root;
	});
</script>

<button
	{onclick}
	{disabled}
	type={htmlType}
	class={[
		'tokens',
		`type-${type}`,
		`${color ? `colored color-${color}` : undefined}`,
		`${danger ? 'colored danger' : undefined}`,
		`${ghost ? 'ghost' : undefined}`,
		`${disabled ? 'disabled' : undefined}`,
		`${variant ? `varianted variant-${variant}` : undefined}`,
		`size-${size}`,
		`shape-${shape}`,
		`${loading ? 'loading' : undefined}`,
		`${block ? 'block' : undefined}`,
		'root',
	]}
	bind:this={root}
>
	{#if children}
		{#snippet content()}
			<a {href} {target} class={['content']}>{@render children?.()}</a>
		{/snippet}
		{#if icon}
			<!-- Label + Icon -->
			{@const Icon = icon}
			{#if iconPlacement === 'end'}
				<Icon class={['icon-label']} /> {@render content()}
			{:else}
				{@render content()} <Icon class={['icon-label']} />
			{/if}
		{:else}
			<!-- Label only -->
			{@render content()}
		{/if}
	{:else if icon}
		<!-- Icon only -->
		{@const Icon = icon}
		<Icon class={['icon-only']} />
	{:else}
		<span> </span>
	{/if}
</button>
