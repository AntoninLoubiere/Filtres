<script lang="ts">
	import HarmoniqueInput from "$lib/comonents/HarmoniqueInput.svelte";
	import NumberInput from "$lib/comonents/NumberInput.svelte";
import { onde } from "$lib/utils-stores";


	function sin() {
		for (let i = 1; i < $onde.harmo.length; i++) {
			const h = $onde.harmo[i];
			h[0] = 0;
			h[1] = 0;
		}
		$onde.harmo[1][0] = 1;
	}

	function carre() {
		for (let i = 1; i < $onde.harmo.length; i++) {
			const h = $onde.harmo[i];
			if (i % 2 == 1) {
				h[0] = 4 / (Math.PI * i)
				h[1] = Math.PI / 2
			} else {
				h[0] = 0;
				h[1] = 0;
			}
		}
		$onde.harmo[1][0] = 1;
	}

	function trig() {
		for (let i = 1; i < $onde.harmo.length; i++) {
			const h = $onde.harmo[i];
			if (i % 2 == 1) {
				h[0] = 8 / Math.pow(Math.PI * i, 2)
				h[1] = i % 4 == 1 ? 3 * Math.PI / 2 : Math.PI / 2
			} else {
				h[0] = 0;
				h[1] = 0;
			}
		}
		$onde.harmo[1][0] = 1;
	}

	function scie() {
		for (let i = 1; i < $onde.harmo.length; i++) {
			const h = $onde.harmo[i];
			h[0] = 2 / (Math.PI * i)
			h[1] = i % 2 == 0 ? 3 * Math.PI / 2 : Math.PI / 2

		}
		$onde.harmo[1][0] = 1;
	}

</script>

<div class="freq">
	Harmoniques :
	<NumberInput bind:value={$onde.freq} label="Fréquence" suffix="Hz" min={0} max_range={1e4} step={10}></NumberInput>
	<div>
		<button on:click={sin}>Sinus</button>
		<button on:click={carre}>Carré</button>
		<button on:click={trig}>Triangulaire</button>
		<button on:click={scie}>Scie</button>
	</div>
</div>

<div class="harmos">
{#each $onde.harmo as h, i}
	<HarmoniqueInput bind:ampl={h[0]} bind:phase={h[1]} {i}></HarmoniqueInput>
{/each}
</div>

<style>
	.freq {
		display: flex;
		gap: .5rem;
		justify-content: space-between;
	}

	.harmos {
		margin-top: .5rem;

		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: .5rem;
	}
</style>