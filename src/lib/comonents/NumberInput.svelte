<script lang="ts">
	export let min: number | undefined = undefined;
	export let min_range: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let max_range: number | undefined = undefined;
	export let step: number | undefined = undefined;

	export let value: number;
	export let label: string;
	export let suffix = '';
	export let size = 5;
	export let disable0 = true;
	export let vertical = false;

	function update0() {
		if (disable0 && value == 0) {
			value = 1e-20;
		}
	}
</script>

<div class:vertical>
	{label}
	<input
		type="range"
		min={min_range ?? min}
		max={max_range ?? max}
		{step}
		bind:value
		orient={vertical ? 'vertical' : undefined}
		on:input={update0}
		on:change={update0}
	/>
	<input type="number" {min} {max} {step} bind:value {size} on:change={update0} />
	{suffix}
</div>

<style>
	div {
		display: flex;
		gap: 0.1rem;
	}
	.vertical {
		flex-direction: column;
	}

	.vertical input[type='range'] {
		/* transform: rotate(-90deg); */
		appearance: slider-vertical;
		height: 100px;
	}

	input {
		vertical-align: middle;
	}
</style>
