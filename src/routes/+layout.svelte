<script lang="ts">
	import '$lib/styles/index.css';
	let { children } = $props();
	let mode = $state('svant-theme-light');
</script>

<div class={['wrapper', mode]}>
	<header></header>
	<main>
		{@render children()}
	</main>
</div>
