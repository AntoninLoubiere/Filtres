<script lang="ts">
	import { GRAPH_KEY } from "$lib/grapher";
	import { setContext } from "svelte";

	export let ratio = 1;

	setContext(GRAPH_KEY, {ratio})

	// we only want to clip vertically so it's fine not being tight horizontally
</script>

<svg viewBox="-14 -7 {19 + 100 * ratio} 121">
	<slot />
	<path d="M-3 104L{4 + 100 * ratio} 104m-2 -2l2 2l-2 2 M-3 104L-3 -3m-2 2l 2 -2l2 2" class="axis" /></svg
>

<style>
	.axis {
		fill: none;
		stroke: #333;
		stroke-width: 0.5;
	}
</style>
