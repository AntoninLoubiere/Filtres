<script lang="ts">
	import { GRAPH_KEY } from "$lib/grapher";
	import { setContext } from "svelte";

	export let ratio = 1;
	export let title: string;

	setContext(GRAPH_KEY, {ratio})

	// we only want to clip vertically so it's fine not being tight horizontally
</script>

<div>
	<h2>{title}</h2>
	<svg viewBox="-14 -7 {19 + 100 * ratio} 121">
		<slot />
		<path d="M-3 104L{4 + 100 * ratio} 104m-2 -2l2 2l-2 2 M-3 104L-3 -3m-2 2l 2 -2l2 2" class="axis" /></svg
	>
</div>

<style>
	@media print {
		h2 {
			font-size: medium;
		}
	}

	@media (max-width: 600px) {
		h2 {
			font-size: medium;
	}
	}

	@media (max-width: 400px) {
		h2 {
			font-size: small;
	}
	}

	h2 {
		margin: 0;
		text-align: center;
	}

	.axis {
		fill: none;
		stroke: #333;
		stroke-width: 0.5;
	}

	svg {
		display: block;
		margin: auto;
		max-height: calc(90vh - var(--dashboard-size));
	}
</style>
