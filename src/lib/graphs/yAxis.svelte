	<script lang="ts">
	import { formatNumberAxis } from "$lib/utils";

	export let y_min: number;
	export let y_max: number;
	export let title: string = '';

	$: dy = y_max - y_min;
	let step: number;
	$: {
		step = Math.pow(10, Math.round(Math.log10(dy)) - 1);
		while (dy / step < 5) {
			step /= 2;
		}

		while (dy / step > 10) {
			step *= 2;
		}
	}

	$: start_x = step * Math.ceil(Math.round((y_min / step) * 10) / 10); // Round in order to prevent case like 3.9998…

	let coords: number[];
	$: {
		coords = [];
		if (step > 0) {
			for (let i = 0; i * step <= dy + 0.01 * step; i++) {
				const c = i * step + start_x;
				if (c <= y_max + 0.1)
					coords.push(c);
			}
		}
	}
</script>

{#each coords as c}
	{@const y_c = ((y_min - c) / dy) * 100 + 100}
	<path d="M-4.5 {y_c} l3 0" class="tick" />
	<text x="-5" y={y_c} class="axis-tick" text-anchor="end" dominant-baseline="middle"
		>{formatNumberAxis(c)}</text>
{/each}
<text x="-11" y="50" class="axis-label">{title}</text>

<style>
	.axis-label {
		transform: rotate(-90deg);
		transform-origin: -11px 50px;
	}
</style>
