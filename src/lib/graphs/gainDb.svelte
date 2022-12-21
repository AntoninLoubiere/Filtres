<script lang="ts">
	import { pointsToLogPath } from '$lib/grapher';
	import { linspace, logspace } from '$lib/utils';
	import { filter, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import XAxis from '$lib/graphs/xAxis.svelte';
	import YAxis from './yAxis.svelte';
	import { getHarmosFreqs, getHarmosNormalisedAmp } from '$lib/onde';
	import Harmos from './harmos.svelte';

	let db = linspace(-2, 7);
	let log_freqs = logspace(-2, 7);
	$: gain = $filter.gain($log_freqs);

	let minY = -5;
	let maxY = 0.2;
	// We trick the user by multiplying by 20 the scale

	$: harmoFreq = getHarmosFreqs($onde);
	$: harmosGain = $filter.gain(harmoFreq);
</script>

<div>
	<Graph title="Diagramme de Bode">
		<Harmos
			baseX={$db}
			x={harmoFreq}
			y={$harmosGain}
			min_y={minY}
			max_y={maxY}
			opacity={getHarmosNormalisedAmp($onde)}
			log={true}
		/>
		<polyline points={pointsToLogPath($db, $gain, minY, maxY)} class="plot-line" />
		<XAxis x={$db} title="Fréquence (log)" />
		<YAxis min_y={minY * 20} max_y={maxY * 20} title="Gain (dB)" />
	</Graph>
</div>
