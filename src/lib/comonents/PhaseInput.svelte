<script lang="ts">
	export let phase: number;

	$: degPhase = Math.round(((phase * 180) / Math.PI) * 10000000) / 10000000;

	function update() {
		phase = (degPhase * Math.PI) / 180;
	}
</script>

<div>
	φ
	<input
		type="range"
		min="0"
		max="360"
		step="1"
		bind:value={degPhase}
		orient="vertical"
		on:change={update}
		on:input={update}
	/>
	<input
		type="number"
		min="0"
		max="360"
		step="1"
		bind:value={degPhase}
		size="2"
		on:change={update}
		on:input={update}
	/>
</div>

<style>
	div {
		display: flex;
		gap: 0.1rem;
		flex-direction: column;
	}

	input[type='range'] {
		/* transform: rotate(-90deg); */
		appearance: slider-vertical;
		height: 100px;
	}

	input {
		vertical-align: middle;
	}
</style>
