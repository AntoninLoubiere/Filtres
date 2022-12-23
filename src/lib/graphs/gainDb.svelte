<script lang="ts">
	import { pointsToLogPath } from '$lib/grapher';
	import { linspace_store, logspace_store } from '$lib/utils';
	import { db_end, db_start, filter, gain_db_end, gain_db_start, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import XAxis from '$lib/graphs/xAxis.svelte';
	import YAxis from './yAxis.svelte';
	import { getHarmosFreqs, getHarmosNormalisedAmp } from '$lib/onde';
	import Harmos from './harmos.svelte';

	let db = linspace_store(db_start, db_end);
	let log_freqs = logspace_store(db_start, db_end);
	$: gain = $filter.gain(log_freqs);

	$: minY = $gain_db_start / 20;
	$: maxY = $gain_db_end / 20;
	// We trick the user by multiplying by 20 the scale

	let harmoFreq = getHarmosFreqs(onde);
	$: harmosGain = $filter.gain(harmoFreq);
</script>

<div>
	<Graph title="Diagramme de Bode">
		<Harmos
			baseX={$db}
			x={$harmoFreq}
			y={$harmosGain}
			min_y={minY}
			max_y={maxY}
			opacity={getHarmosNormalisedAmp($onde)}
			log={true}
		/>
		<polyline points={pointsToLogPath($db, $gain, minY, maxY)} class="plot-line" />
		<XAxis x={$db} title="Fréquence (log)" />
		<YAxis min_y={$gain_db_start} max_y={$gain_db_end} title="Gain (dB)" />
	</Graph>
</div>
