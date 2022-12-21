<script lang="ts">
	import { pointsToPath } from '$lib/grapher';
	import { ondeTime, totalAmp } from '$lib/onde';
import { linspace } from '$lib/utils';
	import { filter, onde } from '$lib/utils-stores';
	import Graph from './graph.svelte';
	import XAxis from './xAxis.svelte';
	import YAxis from './yAxis.svelte';

	$: periode = 1 / $onde.freq;
	$: time = linspace(0, 3 * periode, 3);

	$: yScale = totalAmp($onde) * 1.1; // +10%
	$: yMin = -yScale + $onde.harmo[0][0]
	$: yMax = yScale + $onde.harmo[0][0]

	$: resultOnde = $filter.apply($onde);
</script>

<Graph ratio={3} title="Sortie">
	<polyline points={pointsToPath($time, ondeTime($onde, $time), yMin, yMax, 3)} class="plot-line"></polyline>
	<polyline points={pointsToPath($time, ondeTime($resultOnde, $time), yMin, yMax, 3)} class="plot-line plot-accent"></polyline>
	<XAxis x={$time} title="Temps (s)"></XAxis>
	<YAxis min_y={yMin} max_y={yMax} title="Amplitude (V)"></YAxis>
</Graph>
