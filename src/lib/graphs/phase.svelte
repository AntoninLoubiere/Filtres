<script lang="ts">
	import { pointsToPath } from '$lib/grapher';
	import { getHarmosFreqs, getHarmosFreqsLog, getHarmosNormalisedAmp } from '$lib/onde';
	import { linspace, logspace } from '$lib/utils';
	import { filter, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import Harmos from './harmos.svelte';
	import XAxis from './xAxis.svelte';
	import YAxis from './yAxis.svelte';

	let db = linspace(-2, 7);
	let log_freqs = logspace(-2, 7);
	$: phase = $filter.phase($log_freqs);

	$: stPhase = $phase[0];
	$: endPhase = $phase[$phase.length - 1];

	$: harmoFreq = getHarmosFreqs($onde);
	$: harmosPhase = $filter.phase(harmoFreq);
</script>

<div>
	<h1>Phase</h1>
	<Graph>
		<Harmos baseX={$db} x={getHarmosFreqsLog($onde)} y={$harmosPhase} min_y={endPhase} max_y={stPhase} opacity={getHarmosNormalisedAmp($onde)}></Harmos>
		<polyline points={pointsToPath($db, $phase, endPhase, stPhase)} class="plot-line" />
		<XAxis x={$db} title="Fréquence (log)" />
		<YAxis y_min={(endPhase * 180) / Math.PI} y_max={(stPhase * 180) / Math.PI} title="Phase (°)" />
	</Graph>
</div>
