<script lang="ts">
	import { pointsToPath } from '$lib/grapher';
	import { getHarmosFreqs, getHarmosNormalisedAmp } from '$lib/onde';
	import { linspace_store } from '$lib/utils';
	import { filter, gain_end, gain_start, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import Harmos from './harmos.svelte';
	import XAxis from './xAxis.svelte';
	import YAxis from './yAxis.svelte';

	let freqs = linspace_store(gain_start, gain_end);
	$: gain = $filter.gain(freqs);

	let harmoFreq = getHarmosFreqs(onde);
	$: harmosGain = $filter.gain(harmoFreq);

	$: h0 = $filter.h0;
	$: maxY = Math.abs($h0) * 1.1; // +10%;
</script>

<div>
	<Graph title="Gain">
		<Harmos
			baseX={$freqs}
			x={$harmoFreq}
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
