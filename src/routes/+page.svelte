<script lang="ts">
	import Gain from '$lib/graphs/gain.svelte';
	import GainDb from '$lib/graphs/gainDb.svelte';
	import Onde from '$lib/graphs/onde.svelte';
	import Phase from '$lib/graphs/phase.svelte';
	import Dashboard from '$lib/dashboards/dashboard.svelte';

	import './app.css';
</script>

<div class="grid">
	<Gain />
	<GainDb />
	<Phase />
	<div class="row">
		<Onde />
	</div>
</div>

<Dashboard />

<style>
	.grid {
		padding: var(--base-margin);
		display: grid;
		grid-template: 1fr 1fr / 1fr 1fr 1fr;
	}

	.row {
		grid-column: 1 / 4;
	}
</style>
