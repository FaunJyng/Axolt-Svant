<script lang="ts">
	import Button from '$lib/components/general/Button.svelte';
	import '$lib/styles/index.css';
	let { children } = $props();
	let mode = $state('svant-theme-light');
</script>

<div class={['wrapper', mode]}>
	<header>
		<Button
			onclick={() => {
				mode === 'svant-theme-light'
					? (mode = 'svant-theme-dark')
					: (mode = 'svant-theme-light');
			}}>Toggle dark/light mode</Button
		>
	</header>
	<main>
		{@render children()}
	</main>
</div>
