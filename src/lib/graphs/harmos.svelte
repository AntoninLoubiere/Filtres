<script lang="ts">
	export let baseX: number[];
	export let x: number[];
	export let min_y: number;
	export let max_y: number;
	export let y: number[];
	export let opacity: number[];
	export let log = false;

	$: min_x = baseX[0];
	$: max_x = baseX[baseX.length - 1];
	$: dx = 100 / (max_x - min_x);
	$: dy = 100 / (max_y - min_y);

	let output: number[][];
	$: {
		output = [];
		for (let i = 0; i < x.length; i++) {
			const x_val = log ? (x[i] == 0 ? 0 : Math.log10(x[i])) : x[i];

			if (min_x <= x_val && x_val <= max_x && opacity[i] > 0) {
				const y_val = log ? Math.log10(y[i]) : y[i];
				output.push([(x_val - min_x) * dx, (min_y - y_val) * dy + 100, opacity[i]]);
			}
		}
	}
</script>

{#each output as [x, y, op]}
	<line class="plot-line plot-accent" x1={x} y1={104} x2={x} y2={y} opacity={op} />
{/each}
