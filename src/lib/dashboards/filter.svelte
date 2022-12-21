<script lang="ts">
	import NumberInput from '$lib/comonents/NumberInput.svelte';
	import { HighPassFirstFilter, LowPassFirstFilter } from '$lib/filtres';
	import { filter } from '$lib/utils-stores';

	$: f0 = $filter.f0;
	$: h0 = $filter.h0;

	let selected = '0';
	function update() {
		if (selected == '0') {
			$filter = new LowPassFirstFilter($f0, $h0);
		} else if (selected == '1') {
			$filter = new HighPassFirstFilter($f0, $h0);
		}
	}
</script>

<div class="filter">
	Filtre :
	<select bind:value={selected} on:change={update}>
		<optgroup label="1er ordre">
			<option selected value="0">Passe bas du 1er ordre</option>
			<option value="1">Passe haut du 1er ordre</option>
		</optgroup>
		<optgroup label="2nd ordre">
			<option disabled value="2">Passe bas du 2nd ordre</option>
			<option disabled value="3">Passe haut du 2nd ordre</option>
			<option disabled value="4">Passe bande du 2nd ordre</option>
			<option disabled value="5">Coupe bande du 2nd ordre</option>
		</optgroup>
	</select>
</div>
<div class="freq-gain">
	<NumberInput
		bind:value={$f0}
		min={0}
		max_range={1e4}
		step={10}
		label="Fréquence propre"
		size={6}
		suffix="Hz"
	/>

	<NumberInput
		bind:value={$h0}
		step={0.01}
		min={0.01}
		min_range={0.01}
		max_range={2}
		label="Gain propre"
	/>
</div>

<style>
	.filter {
		text-align: center;
	}

	.freq-gain {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
