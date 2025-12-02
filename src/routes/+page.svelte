<script lang="ts">
	import Button from '$lib/components/general/Button.svelte';
</script>

<div class="wrapper">
	<div class="showarea">
		<div class="row">
			<div class="col">
				<h1>Basic</h1>
				<Button type="primary">Primary</Button>
				<Button>Default</Button>
				<Button type="dashed">Dashed</Button>
				<Button type="text" block>Text</Button>
				<Button type="link" block>Link</Button>
			</div>
			<div class="col">
				<h1>Size</h1>
				<Button size="large">Large</Button>
				<Button size="medium">Medium</Button>
				<Button size="small">Small</Button>
			</div>
			<div class="col">
				<h1>Shape</h1>
				<Button>Rounded</Button>
				<Button shape="circle">Circle</Button>
			</div>
			<div class="col">
				<h1>Block</h1>
				<div>---------------</div>
				<Button block>Block</Button>
			</div>
			<div class="col" style="background-color: lightgray; padding: 0 1rem; border-radius: 6px;">
				<h1>Ghost</h1>
				<Button type="primary">Primary</Button>
				<Button ghost>Default</Button>
				<Button ghost type="dashed">Dashed</Button>
				<Button ghost type="text" block>Text</Button>
				<Button ghost type="link" block>Link</Button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h1>Color & Variant</h1>
				<div class="row">
					<div class="col">
						<Button variant="solid" color="default">Solid</Button>
						<Button variant="solid" color="primary">Solid</Button>
						<Button variant="solid" color="danger">Solid</Button>
						<Button variant="solid" color="pink">Solid</Button>
						<Button variant="solid" color="purple">Solid</Button>
						<Button variant="solid" color="cyan">Solid</Button>
					</div>
					<div class="col">
						<Button variant="outlined" color="default">Outlined</Button>
						<Button variant="outlined" color="primary">Outlined</Button>
						<Button variant="outlined" color="danger">Outlined</Button>
						<Button variant="outlined" color="pink">Outlined</Button>
						<Button variant="outlined" color="purple">Outlined</Button>
						<Button variant="outlined" color="cyan">Outlined</Button>
					</div>
					<div class="col">
						<Button variant="dashed" color="default">Dashed</Button>
						<Button variant="dashed" color="primary">Dashed</Button>
						<Button variant="dashed" color="danger">Dashed</Button>
						<Button variant="dashed" color="pink">Dashed</Button>
						<Button variant="dashed" color="purple">Dashed</Button>
						<Button variant="dashed" color="cyan">Dashed</Button>
					</div>
					<div class="col">
						<Button variant="filled" color="default">Filled</Button>
						<Button variant="filled" color="primary">Filled</Button>
						<Button variant="filled" color="danger">Filled</Button>
						<Button variant="filled" color="pink">Filled</Button>
						<Button variant="filled" color="purple">Filled</Button>
						<Button variant="filled" color="cyan">Filled</Button>
					</div>
					<div class="col">
						<Button variant="text" color="default">Text</Button>
						<Button variant="text" color="primary">Text</Button>
						<Button variant="text" color="danger">Text</Button>
						<Button variant="text" color="pink">Text</Button>
						<Button variant="text" color="purple">Text</Button>
						<Button variant="text" color="cyan">Text</Button>
					</div>
					<div class="col">
						<Button variant="link" color="default">Link</Button>
						<Button variant="link" color="primary">Link</Button>
						<Button variant="link" color="danger">Link</Button>
						<Button variant="link" color="pink">Link</Button>
						<Button variant="link" color="purple">Link</Button>
						<Button variant="link" color="cyan">Link</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.showarea {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		row-gap: 1rem;
	}

	.row {
		display: flex;
		column-gap: 14px;
	}

	.col {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
		align-items: flex-start;
	}
</style>
