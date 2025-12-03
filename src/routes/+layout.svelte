<script lang="ts">
	import '$lib/styles/index.css';
	let { children } = $props();
</script>

<div class="wrapper svant-theme-light">
	<header></header>
	<main>
		{@render children()}
	</main>
</div>
