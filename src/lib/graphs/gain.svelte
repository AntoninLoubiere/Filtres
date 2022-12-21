<script lang="ts">
	import { pointsToPath } from '$lib/grapher';
	import { getHarmosFreqs, getHarmosNormalisedAmp, type Onde } from '$lib/onde';
	import { linspace } from '$lib/utils';
	import { filter, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import Harmos from './harmos.svelte';
	import XAxis from './xAxis.svelte';
	import YAxis from './yAxis.svelte';

	let freqs = linspace(0, 10000);
	let gain = $filter.gain($freqs);

	$: harmoFreq = getHarmosFreqs($onde);
	$: harmosGain = $filter.gain(harmoFreq);
</script>

<div>
	<h1>Gain</h1>
	<Graph>
		<Harmos baseX={$freqs} x={harmoFreq} y={$harmosGain} min_y={0} max_y={1} opacity={getHarmosNormalisedAmp($onde)}></Harmos>
		<polyline points={pointsToPath($freqs, $gain, 0, 1)} class="plot-line" />
		<XAxis x={$freqs} title="Fréquence (Hz)" />
		<YAxis y_min={0} y_max={1} title="Gain" />
	</Graph>
</div>
