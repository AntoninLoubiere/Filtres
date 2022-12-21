<script lang="ts">
	import { GRAPH_KEY } from "$lib/grapher";
	import { formatNumberAxis } from "$lib/utils";
	import { getContext } from "svelte";


	export let x: number[];
	export let title: string = '';

	// @ts-expect-error Ignore unknown warning
	let ratio = getContext(GRAPH_KEY)?.ratio || 3

	$: dx = x[x.length - 1] - x[0];
	let step: number;
	$: {
		step = Math.pow(10, Math.round(Math.log10(dx)) - 1);
		while (dx / step < 5 * ratio) {
			step /= 2;
		}

		while (dx / step > 10 * ratio) {
			step *= 2;
		}
	}

	$: start_x = step * Math.ceil(Math.round((x[0] / step) * 10) / 10);

	let coords: number[];
	$: {
		coords = [];
		if (step > 0) {
		for (let i = 0; i * step <= dx + 0.01 * step; i++) {
			coords.push(i * step + start_x);
		}
	}
	}
</script>

{#each coords as c}
	{@const x_c = ((c - x[0]) / dx) * 100 * ratio}
	<path d="M{x_c} 105.5 l0 -3" class="tick" />
	<text x={x_c} y="109" class="axis-tick" text-anchor="middle"		>{formatNumberAxis(c)}</text>

{/each}
<text x={50 * ratio} y="113" class="axis-label">{title}</text>
