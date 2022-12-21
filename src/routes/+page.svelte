<script lang="ts">
	import Gain from '$lib/graphs/gain.svelte';
	import GainDb from '$lib/graphs/gainDb.svelte';
	import Onde from '$lib/graphs/onde.svelte';
	import Phase from '$lib/graphs/phase.svelte';
	import { filter, onde } from '$lib/utils-stores';

	import './app.css';

	$: f0 = $filter.f0;
	$: h0 = $filter.h0;

	let harmos: number[] = [];
	$: {
		harmos = [];
		for (let i = 0; i < Math.min($onde.harmo.length, 11); i++) {
			harmos.push(i);
		}
	}

</script>

<input bind:value={$f0} type="number" step="10" />
<input bind:value={$h0} type="number" step="0.01" />
<div class="grid">
	<Gain />
	<GainDb />
	<Phase />
	<div class="row">
		<Onde></Onde>
	</div>
</div>

{#each harmos as h}
<div>
	{h}
	<input bind:value={$onde.harmo[h][0]} type="number" min="0">
	<input bind:value={$onde.harmo[h][1]} type="range" min="0" max="6.28" step=0.1>
</div>
{/each}

<style>
	.grid {
		display: grid;
		grid-template: 1fr 1fr / 1fr 1fr 1fr;
	}

	.row {
		grid-column: 1 / 4;
	}
</style>
