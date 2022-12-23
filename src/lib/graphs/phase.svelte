<script lang="ts">
	import { pointsToPath } from '$lib/grapher';
	import { getHarmosFreqs, getHarmosFreqsLog, getHarmosNormalisedAmp } from '$lib/onde';
	import { linspace, linspace_store, logspace, logspace_store } from '$lib/utils';
	import { db_end, db_start, filter, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import Harmos from './harmos.svelte';
	import XAxis from './xAxis.svelte';
	import YAxis from './yAxis.svelte';

	let db = linspace_store(db_start, db_end);
	let log_freqs = logspace_store(db_start, db_end);
	$: phase = $filter.phase(log_freqs);

	$: stPhase = $phase[0];
	$: endPhase = $phase[$phase.length - 1];

	$: minY = stPhase == endPhase ? endPhase - Math.PI / 2 : endPhase;
	$: maxY = stPhase == endPhase ? stPhase + Math.PI / 2 : stPhase;

	let harmoFreq = getHarmosFreqs(onde);
	$: harmosPhase = $filter.phase(harmoFreq);
</script>

<div>
	<Graph title="Phase">
		<Harmos
			baseX={$db}
			x={getHarmosFreqsLog($onde)}
			y={$harmosPhase}
			min_y={minY}
			max_y={maxY}
			opacity={getHarmosNormalisedAmp($onde)}
		/>
		<polyline points={pointsToPath($db, $phase, minY, maxY)} class="plot-line" />
		<XAxis x={$db} title="Fréquence (log)" />
		<YAxis min_y={(minY * 180) / Math.PI} max_y={(maxY * 180) / Math.PI} title="Phase (°)" />
	</Graph>
</div>
