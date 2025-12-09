<script module>
	type Orientation = 'horizontal' | 'vertical';
	type Variant = 'dashed' | 'solid' | 'dotted';
	type Size = 'small' | 'middle' | 'large';
	type TitlePlacement = 'start' | 'end';
	export type DivierProps = {
		horizontal?: boolean;
		vertical?: boolean;
		orientation?: Orientation;
		dashed?: boolean;
		variant?: Variant;
		size?: Size;
		titlePlacement?: TitlePlacement
	};
</script>

<script lang="ts">
</script>

<div class={['tokens', 'root']}>
	<div class="rail"></div>
	<span class="content"></span>
	<div class="rail"></div>
</div>

<style>
</style>
