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

	if ((danger || color) && !variant) {
		switch (type) {
			case 'default':
				variant = 'outlined';
				break;
			case 'primary':
				variant = 'solid';
				break;
			case 'dashed':
				variant = 'dashed';
				break;
			case 'link':
				variant = 'link';
				break;
			case 'text':
				variant = 'text';
				break;
		}
	}
</script>

<button
	{onclick}
	{disabled}
	type={htmlType}
	class={[
		'tokens',
		`type-${type}`,
		`${color ? `color-${color}` : undefined}`,
		`${danger ? 'danger' : undefined}`,
		`${ghost ? 'ghost' : undefined}`,
		`${disabled ? 'disabled' : undefined}`,
		`${variant ? `variant-${variant}` : undefined}`,
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

<style>
	.tokens {
		/* Component tokens */
		/* Typography */
		--cbtn-content-font-size: 14px;
		--cbtn-content-font-size-sm: 14px;
		--cbtn-content-font-size-lg: 16px;
		--cbtn-content-line-height: 1.5714285714285714;
		--cbtn-content-line-height-sm: 1.5;
		--cbtn-content-line-height-lg: 1.5714285714285714;
		--cbtn-font-weight: 400;
		/* Spacing */
		--cbtn-padding-block: 4px;
		--cbtn-padding-block-sm: 0px;
		--cbtn-padding-block-lg: 7px;
		--cbtn-padding-inline: 15px;
		--cbtn-padding-inline-sm: 7px;
		--cbtn-padding-inline-lg: 15px;
		/* Icon sizing */
		--cbtn-only-icon-size: inherit;
		--cbtn-only-icon-size-sm: inherit;
		--cbtn-only-icon-size-lg: inherit;
		/* Colors */
	}

	.tokens {
		/* Rendered tokens */
		--btn-width: fit-content;
		--btn-font-size: var(--cbtn-content-font-size);
		--btn-line-height: var(--cbtn-content-line-height);
		--btn-font-weigth: var(--cbtn-font-weight);
		--btn-icon-gap: 8px;

		--btn-padding-block: var(--cbtn-padding-block);
		--btn-padding-inline: var(--cbtn-padding-inline);

		--btn-line-width-focus: var(--svant-line-width-focus);
		--btn-line-color-focus: var(--svant-line-color-focus);

		--btn-text-color: var(--svant-text-color-default);
		--btn-text-color-hover: var(--svant-text-color-default-hover);
		--btn-text-color-active: var(--svant-text-color-default-active);

		--btn-bg-color: var(--svant-bg-color-general);
		--btn-bg-color-hover: var(--svant-bg-color-general);
		--btn-bg-color-active: var(--svant-bg-color-general);

		--btn-border-color: var(--svant-border-color-default);
		--btn-border-color-hover: var(--svant-border-color-default-hover);
		--btn-border-color-active: var(--svant-border-color-default-active);

		--btn-border-width: var(--svant-line-width);
		--btn-border-style: solid;
		--btn-border-radius: var(--svant-border-radius);

		--btn-wave-color: var(--svant-wave-color-default);

		--btn-shadow-direction: 0 2px 0;
		--btn-shadow-color: var(--svant-shadow-color-default);
		--btn-shadow-color-hover: var(--svant-shadow-color-default-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-default-active);

		--btn-opacity: 1;
	}

	/* Type layer */
	.type-primary {
		--btn-text-color: var(--svant-text-color-general-white);
		--btn-text-color-hover: var(--svant-text-color-general-white);
		--btn-text-color-active: var(--svant-text-color-general-white);

		--btn-bg-color: var(--svant-text-color-primary);
		--btn-bg-color-hover: var(--svant-text-color-primary-hover);
		--btn-bg-color-active: var(--svant-text-color-primary-active);

		--btn-border-color: var(--svant-text-color-primary);
		--btn-border-color-hover: var(--svant-text-color-primary-hover);
		--btn-border-color-active: var(--svant-text-color-primary-active);

		--btn-shadow-color: var(--svant-shadow-color-primary);
		--btn-shadow-color-hover: var(--svant-shadow-color-primary-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-primary-active);

		--btn-wave-color: var(--svant-wave-color-primary);
	}

	.type-default {
		--btn-text-color: var(--svant-text-color-default);
		--btn-text-color-hover: var(--svant-text-color-default-hover);
		--btn-text-color-active: var(--svant-text-color-default-active);

		--btn-bg-color: var(--svant-bg-color-general);
		--btn-bg-color-hover: var(--svant-bg-color-general);
		--btn-bg-color-active: var(--svant-bg-color-general);

		--btn-border-color: var(--svant-border-color-default);
		--btn-border-color-hover: var(--svant-border-color-default-hover);
		--btn-border-color-active: var(--svant-border-color-default-active);

		--btn-shadow-color: var(--svant-shadow-color-default);
		--btn-shadow-color-hover: var(--svant-shadow-color-default-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-default-active);

		--btn-wave-color: var(--svant-wave-color-default);
	}

	.type-dashed {
		--btn-text-color: var(--svant-text-color-default);
		--btn-text-color-hover: var(--svant-text-color-default-hover);
		--btn-text-color-active: var(--svant-text-color-default-active);

		--btn-bg-color: var(--svant-bg-color-general);
		--btn-bg-color-hover: var(--svant-bg-color-general);
		--btn-bg-color-active: var(--svant-bg-color-general);

		--btn-border-color: var(--svant-border-color-default);
		--btn-border-color-hover: var(--svant-border-color-default-hover);
		--btn-border-color-active: var(--svant-border-color-default-active);

		--btn-shadow-color: var(--svant-shadow-color-default);
		--btn-shadow-color-hover: var(--svant-shadow-color-default-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-default-active);

		--btn-wave-color: var(--svant-wave-color-default);

		--btn-border-style: dashed;
	}

	.type-text {
		--btn-text-color: var(--svant-text-color-general-theme);
		--btn-text-color-hover: var(--svant-text-color-general-theme);
		--btn-text-color-active: var(--svant-text-color-general-theme);

		--btn-bg-color: transparent;
		--btn-bg-color-hover: var(--svant-bg-color-default);
		--btn-bg-color-active: var(--svant-bg-color-default-hover);

		--btn-border-color: transparent;
		--btn-border-color-hover: transparent;
		--btn-border-color-active: transparent;

		--btn-shadow-color: transparent;
		--btn-shadow-color-hover: transparent;
		--btn-shadow-color-active: transparent;

		--btn-wave-color: transparent;
	}

	.type-link {
		--btn-text-color: var(--svant-text-color-primary);
		--btn-text-color-hover: var(--svant-text-color-primary-hover);
		--btn-text-color-active: var(--svant-text-color-primary-active);

		--btn-bg-color: transparent;
		--btn-bg-color-hover: transparent;
		--btn-bg-color-active: transparent;

		--btn-border-color: transparent;
		--btn-border-color-hover: transparent;
		--btn-border-color-active: transparent;

		--btn-shadow-color: transparent;
		--btn-shadow-color-hover: transparent;
		--btn-shadow-color-active: transparent;

		--btn-wave-color: transparent;
	}

	/* - Color layer */
	.color-default {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-default);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-default-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-default-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-default);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-default-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-default-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-default);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-default-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-default-active);

		--btn-variant-filled-text-color: var(--svant-text-color-general-black);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-general-black-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-general-black-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-default);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-default-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-default-active);

		--btn-shadow-color: var(--svant-shadow-color-default);
		--btn-shadow-color-hover: var(--svant-shadow-color-default-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-default-active);

		--btn-wave-color: var(--svant-wave-color-default);
	}

	.color-primary {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-primary);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-primary-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-primary-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-primary);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-primary-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-primary-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-primary);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-primary-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-primary-active);

		--btn-variant-filled-text-color: var(--svant-text-color-primary);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-primary-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-primary-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-primary);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-primary-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-primary-active);

		--btn-shadow-color: var(--svant-shadow-color-primary);
		--btn-shadow-color-hover: var(--svant-shadow-color-primary-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-primary-active);

		--btn-wave-color: var(--svant-wave-color-primary);
	}

	.color-danger,
	.danger {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-danger);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-danger-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-danger-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-danger);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-danger-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-danger-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-danger);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-danger-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-danger-active);

		--btn-variant-filled-text-color: var(--svant-text-color-danger);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-danger-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-danger-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-danger);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-danger-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-danger-active);

		--btn-shadow-color: var(--svant-shadow-color-danger);
		--btn-shadow-color-hover: var(--svant-shadow-color-danger-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-danger-active);

		--btn-wave-color: var(--svant-wave-color-danger);
	}

	.color-blue {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-blue);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-blue-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-blue-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-blue);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-blue-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-blue-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-blue);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-blue-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-blue-active);

		--btn-variant-filled-text-color: var(--svant-text-color-blue);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-blue-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-blue-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-blue);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-blue-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-blue-active);

		--btn-shadow-color: var(--svant-shadow-color-blue);
		--btn-shadow-color-hover: var(--svant-shadow-color-blue-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-blue-active);

		--btn-wave-color: var(--svant-wave-color-blue);
	}

	.color-pink,
	.color-magenta {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-magenta);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-magenta-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-magenta-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-magenta);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-magenta-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-magenta-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-magenta);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-magenta-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-magenta-active);

		--btn-variant-filled-text-color: var(--svant-text-color-magenta);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-magenta-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-magenta-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-magenta);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-magenta-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-magenta-active);

		--btn-shadow-color: var(--svant-shadow-color-magenta);
		--btn-shadow-color-hover: var(--svant-shadow-color-magenta-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-magenta-active);

		--btn-wave-color: var(--svant-wave-color-magenta);
	}

	.color-purple {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-purple);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-purple-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-purple-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-purple);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-purple-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-purple-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-purple);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-purple-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-purple-active);

		--btn-variant-filled-text-color: var(--svant-text-color-purple);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-purple-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-purple-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-purple);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-purple-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-purple-active);

		--btn-shadow-color: var(--svant-shadow-color-purple);
		--btn-shadow-color-hover: var(--svant-shadow-color-purple-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-purple-active);

		--btn-wave-color: var(--svant-wave-color-purple);
	}

	.color-cyan {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-cyan);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-cyan-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-cyan-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-cyan);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-cyan-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-cyan-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-cyan);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-cyan-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-cyan-active);

		--btn-variant-filled-text-color: var(--svant-text-color-cyan);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-cyan-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-cyan-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-cyan);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-cyan-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-cyan-active);

		--btn-shadow-color: var(--svant-shadow-color-cyan);
		--btn-shadow-color-hover: var(--svant-shadow-color-cyan-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-cyan-active);

		--btn-wave-color: var(--svant-wave-color-cyan);
	}

	.color-green {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-green);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-green-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-green-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-green);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-green-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-green-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-green);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-green-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-green-active);

		--btn-variant-filled-text-color: var(--svant-text-color-green);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-green-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-green-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-green);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-green-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-green-active);

		--btn-shadow-color: var(--svant-shadow-color-green);
		--btn-shadow-color-hover: var(--svant-shadow-color-green-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-green-active);

		--btn-wave-color: var(--svant-wave-color-green);
	}

	.color-red {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-red);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-red-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-red-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-red);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-red-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-red-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-red);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-red-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-red-active);

		--btn-variant-filled-text-color: var(--svant-text-color-red);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-red-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-red-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-red);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-red-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-red-active);

		--btn-shadow-color: var(--svant-shadow-color-red);
		--btn-shadow-color-hover: var(--svant-shadow-color-red-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-red-active);

		--btn-wave-color: var(--svant-wave-color-red);
	}

	.color-orange {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-orange);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-orange-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-orange-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-orange);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-orange-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-orange-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-orange);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-orange-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-orange-active);

		--btn-variant-filled-text-color: var(--svant-text-color-orange);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-orange-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-orange-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-orange);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-orange-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-orange-active);

		--btn-shadow-color: var(--svant-shadow-color-orange);
		--btn-shadow-color-hover: var(--svant-shadow-color-orange-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-orange-active);

		--btn-wave-color: var(--svant-wave-color-orange);
	}

	.color-yellow {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-yellow);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-yellow-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-yellow-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-yellow);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-yellow-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-yellow-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-yellow);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-yellow-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-yellow-active);

		--btn-variant-filled-text-color: var(--svant-text-color-yellow);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-yellow-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-yellow-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-yellow);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-yellow-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-yellow-active);

		--btn-shadow-color: var(--svant-shadow-color-yellow);
		--btn-shadow-color-hover: var(--svant-shadow-color-yellow-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-yellow-active);

		--btn-wave-color: var(--svant-wave-color-yellow);
	}

	.color-volcano {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-volcano);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-volcano-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-volcano-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-volcano);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-volcano-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-volcano-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-volcano);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-volcano-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-volcano-active);

		--btn-variant-filled-text-color: var(--svant-text-color-volcano);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-volcano-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-volcano-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-volcano);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-volcano-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-volcano-active);

		--btn-shadow-color: var(--svant-shadow-color-volcano);
		--btn-shadow-color-hover: var(--svant-shadow-color-volcano-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-volcano-active);

		--btn-wave-color: var(--svant-wave-color-volcano);
	}

	.color-geekblue {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-geekblue);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-geekblue-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-geekblue-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-geekblue);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-geekblue-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-geekblue-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-geekblue);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-geekblue-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-geekblue-active);

		--btn-variant-filled-text-color: var(--svant-text-color-geekblue);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-geekblue-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-geekblue-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-geekblue);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-geekblue-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-geekblue-active);

		--btn-shadow-color: var(--svant-shadow-color-geekblue);
		--btn-shadow-color-hover: var(--svant-shadow-color-geekblue-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-geekblue-active);

		--btn-wave-color: var(--svant-wave-color-geekblue);
	}

	.color-lime {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-lime);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-lime-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-lime-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-lime);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-lime-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-lime-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-lime);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-lime-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-lime-active);

		--btn-variant-filled-text-color: var(--svant-text-color-lime);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-lime-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-lime-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-lime);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-lime-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-lime-active);

		--btn-shadow-color: var(--svant-shadow-color-lime);
		--btn-shadow-color-hover: var(--svant-shadow-color-lime-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-lime-active);

		--btn-wave-color: var(--svant-wave-color-lime);
	}

	.color-gold {
		--btn-variant-solid-text-color: var(--svant-text-color-general-white);
		--btn-variant-solid-text-color-hover: var(--svant-text-color-general-white-hover);
		--btn-variant-solid-text-color-active: var(--svant-text-color-general-white-active);
		--btn-variant-solid-bg-color: var(--svant-solid-bg-color-gold);
		--btn-variant-solid-bg-color-hover: var(--svant-solid-bg-color-gold-hover);
		--btn-variant-solid-bg-color-active: var(--svant-solid-bg-color-gold-active);

		--btn-variant-outlined-text-color: var(--svant-text-color-gold);
		--btn-variant-outlined-text-color-hover: var(--svant-text-color-gold-hover);
		--btn-variant-outlined-text-color-active: var(--svant-text-color-gold-active);
		--btn-variant-outlined-border-color: var(--svant-text-color-gold);
		--btn-variant-outlined-border-color-hover: var(--svant-text-color-gold-hover);
		--btn-variant-outlined-border-color-active: var(--svant-text-color-gold-active);

		--btn-variant-filled-text-color: var(--svant-text-color-gold);
		--btn-variant-filled-text-color-hover: var(--svant-text-color-gold-hover);
		--btn-variant-filled-text-color-active: var(--svant-text-color-gold-active);
		--btn-variant-filled-bg-color: var(--svant-bg-color-gold);
		--btn-variant-filled-bg-color-hover: var(--svant-bg-color-gold-hover);
		--btn-variant-filled-bg-color-active: var(--svant-bg-color-gold-active);

		--btn-shadow-color: var(--svant-shadow-color-gold);
		--btn-shadow-color-hover: var(--svant-shadow-color-gold-hover);
		--btn-shadow-color-active: var(--svant-shadow-color-gold-active);

		--btn-wave-color: var(--svant-wave-color-gold);
	}

	/* Disabled layer */
	.disabled {
		--btn-variant-solid-text-color: var();
		--btn-variant-solid-text-color-hover: var();
		--btn-variant-solid-text-color-active: var();
		--btn-variant-solid-bg-color: var();
		--btn-variant-solid-bg-color-hover: var();
		--btn-variant-solid-bg-color-active: var();

		--btn-variant-outlined-text-color: var();
		--btn-variant-outlined-text-color-hover: var();
		--btn-variant-outlined-text-color-active: var();
		--btn-variant-outlined-border-color: var();
		--btn-variant-outlined-border-color-hover: var();
		--btn-variant-outlined-border-color-active: var();

		--btn-variant-filled-text-color: var();
		--btn-variant-filled-text-color-hover: var();
		--btn-variant-filled-text-color-active: var();
		--btn-variant-filled-bg-color: var();
		--btn-variant-filled-bg-color-hover: var();
		--btn-variant-filled-bg-color-active: var();

		--btn-shadow-color: var();
		--btn-shadow-color-hover: var();
		--btn-shadow-color-active: var();

		--btn-wave-color: var();
	}

	/* - Variant layer */
	.variant-solid {
		--btn-text-color: var(--btn-variant-solid-text-color);
		--btn-text-color-hover: var(--btn-variant-solid-text-color-hover);
		--btn-text-color-active: var(--btn-variant-solid-text-color-active);

		--btn-bg-color: var(--btn-variant-solid-bg-color);
		--btn-bg-color-hover: var(--btn-variant-solid-bg-color-hover);
		--btn-bg-color-active: var(--btn-variant-solid-bg-color-active);

		--btn-border-color: var(--btn-variant-solid-bg-color);
		--btn-border-color-hover: var(--btn-variant-solid-bg-color-hover);
		--btn-border-color-active: var(--btn-variant-solid-bg-color-active);
	}

	.variant-outlined,
	.variant-dashed,
	.variant-link {
		--btn-text-color: var(--btn-variant-outlined-text-color);
		--btn-text-color-hover: var(--btn-variant-outlined-text-color-hover);
		--btn-text-color-active: var(--btn-variant-outlined-text-color-active);

		--btn-border-color: var(--btn-variant-outlined-border-color);
		--btn-border-color-hover: var(--btn-variant-outlined-border-color-hover);
		--btn-border-color-active: var(--btn-variant-outlined-border-color-active);
	}

	.variant-dashed {
		--btn-border-style: dashed;
	}

	.variant-link {
		--btn-bg-color: transparent;
		--btn-bg-color-hover: transparent;
		--btn-bg-color-active: transparent;

		--btn-border-color: transparent;
		--btn-border-color-hover: transparent;
		--btn-border-color-active: transparent;

		--btn-shadow-color: transparent;
		--btn-shadow-color-hover: transparent;
		--btn-shadow-color-active: transparent;

		--btn-wave-color: transparent;
	}

	.variant-filled,
	.variant-text {
		--btn-text-color: var(--btn-variant-filled-text-color);
		--btn-text-color-hover: var(--btn-variant-filled-text-color-hover);
		--btn-text-color-active: var(--btn-variant-filled-text-color-active);

		--btn-bg-color: var(--btn-variant-filled-bg-color);
		--btn-bg-color-hover: var(--btn-variant-filled-bg-color-hover);
		--btn-bg-color-active: var(--btn-variant-filled-bg-color-active);

		--btn-border-color: var(--btn-variant-filled-bg-color);
		--btn-border-color-hover: var(--btn-variant-filled-bg-color-hover);
		--btn-border-color-active: var(--btn-variant-filled-bg-color-active);
	}

	.variant-filled.color-default {
		--btn-border-color: transparent;
		--btn-border-color-hover: transparent;
		--btn-border-color-active: transparent;
	}

	.variant-text {
		--btn-bg-color: transparent;

		--btn-border-color: transparent;
		--btn-border-color-hover: transparent;
		--btn-border-color-active: transparent;

		--btn-shadow-color: transparent;
		--btn-shadow-color-hover: transparent;
		--btn-shadow-color-active: transparent;

		--btn-wave-color: transparent;
	}

	/* Ghost layer */
	.ghost:not(.type-text) {
		--btn-bg-color: transparent;
		--btn-bg-color-hover: transparent;
		--btn-bg-color-active: transparent;
	}

	.ghost.type-primary {
		--btn-text-color: var(--svant-text-color-primary);
		--btn-text-color-hover: var(--svant-text-color-primary-hover);
		--btn-text-color-active: var(--svant-text-color-primary-active);
	}

	/* Size layer */
	.size-medium {
		--btn-font-size: var(--cbtn-content-font-size);
		--btn-line-height: var(--cbtn-content-line-height);
		--btn-padding-block: var(--cbtn-padding-block);
		--btn-padding-inline: var(--cbtn-padding-inline);
		--btn-border-radius: var(--svant-border-radius);
	}

	.size-small {
		--btn-font-size: var(--cbtn-content-font-size-sm);
		--btn-line-height: var(--cbtn-content-line-height-sm);
		--btn-padding-block: var(--cbtn-padding-block-sm);
		--btn-padding-inline: var(--cbtn-padding-inline-sm);
		--btn-border-radius: var(--svant-border-radius-sm);
	}

	.size-large {
		--btn-font-size: var(--cbtn-content-font-size-lg);
		--btn-line-height: var(--cbtn-content-line-height-lg);
		--btn-padding-block: var(--cbtn-padding-block-lg);
		--btn-padding-inline: var(--cbtn-padding-inline-lg);
		--btn-border-radius: var(--svant-border-radius-lg);
	}

	/* Shape layer */
	.shape-circle {
		--btn-border-radius: 9999px;
	}

	/* Loading layer */
	.loading {
		--btn-opacity: var(--svant-opacity-loading);
	}

	/* Block layer */
	.block {
		--btn-width: 100%;
	}

	/* - Root layer */
	.root {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;

		height: fit-content;
		width: var(--btn-width);
		padding: var(--btn-padding-block) var(--btn-padding-inline);

		font-size: var(--btn-font-size);
		font-family: var(--svant-font-family-base);
		line-height: var(--btn-line-height);
		font-weight: var(--btn-font-weigth);

		background-color: var(--btn-bg-color);
		color: var(--btn-text-color);
		border: var(--btn-border-width) var(--btn-border-style) var(--btn-border-color);

		border-radius: var(--btn-border-radius);
		box-shadow: var(--btn-shadow-direction) var(--btn-shadow-color);
		opacity: var(--btn-opacity);

		transition: all var(--svant-motion-duration-mid) var(--svant-motion-ease-in-out);
	}

	.root:hover {
		background-color: var(--btn-bg-color-hover);
		color: var(--btn-text-color-hover);
		border: var(--btn-border-width) var(--btn-border-style) var(--btn-border-color-hover);
		box-shadow: var(--btn-shadow-direction) var(--btn-shadow-color-hover);
	}

	.root:active {
		background-color: var(--btn-bg-color-active);
		color: var(--btn-text-color-active);
		border: var(--btn-border-width) var(--btn-border-style) var(--btn-border-color-active);
		box-shadow: var(--btn-shadow-direction) var(--btn-shadow-color-active);
	}

	.root:focus-visible {
		outline: unset;
	}

	.root:focus-visible::after {
		content: '';
		position: absolute;
		display: block;
		width: var(--svant-after-width-focus);
		height: var(--svant-after-height-focus);
		border-width: var(--btn-line-width-focus);
		border-color: var(--btn-line-color-focus);
		border-style: solid;
		border-radius: calc(var(--btn-border-radius) + var(--btn-padding-block) - 1px);
	}

	.root:disabled {
		cursor: not-allowed;
	}

	.root::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: var(--btn-border-radius);

		box-shadow: 0 0 0 6px var(--btn-wave-color);
		opacity: 0;
		transition:
			box-shadow 0.3s var(--svant-motion-ease-in-out),
			opacity 1s var(--svant-motion-ease-in-out);
	}

	.root:hover.type-link,
	.root:hover.variant-link {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.root:active::before {
		box-shadow: 0 0 0 0 var(--btn-wave-color);
		opacity: 0.15;
		transition: 0s;
	}
</style>
