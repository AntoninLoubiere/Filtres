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
	$: gain = $filter.gain($freqs);

	$: harmoFreq = getHarmosFreqs($onde);
	$: harmosGain = $filter.gain(harmoFreq);

	$: h0 = $filter.h0;
	$: maxY = Math.abs($h0) * 1.1; // +10%;
</script>

<div>
	<Graph title="Gain">
		<Harmos
			baseX={$freqs}
			x={harmoFreq}
			y={$harmosGain}
			min_y={0}
			max_y={maxY}
			opacity={getHarmosNormalisedAmp($onde)}
		/>
		<polyline points={pointsToPath($freqs, $gain, 0, maxY)} class="plot-line" />
		<XAxis x={$freqs} title="Fréquence (Hz)" />
		<YAxis min_y={0} max_y={maxY} title="Gain" />
	</Graph>
</div>
