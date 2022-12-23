<script lang="ts">
	import {
		db_end,
		db_start,
		gain_end,
		gain_start,
		gain_db_end,
		gain_db_start,
		precision,
		nb_period
	} from '$lib/utils-stores';
</script>

<div>
	Précision : <input type="number" min="0" step="20" bind:value={$precision} size="2" /> points
</div>

<div class="params-container">
	<div class="graph-params">
		<h4>Gain</h4>
		Fréquence de<input
			type="number"
			size="4"
			bind:value={$gain_start}
			min={0}
			max={$gain_end}
			step="100"
		/>
		Hz à <input type="number" size="4" bind:value={$gain_end} min={$gain_start} step="100" />
	</div>

	<div class="graph-params">
		<h4>Diagramme de Bode - Phase</h4>
		<div>
			Fréquence logarithmique de <input
				type="number"
				size="1"
				bind:value={$db_start}
				max={$db_end}
				step="0.2"
			/>
			Hz à <input type="number" size="1" bind:value={$db_end} min={$db_start} step="0.2" />
		</div>
		<div>
			Gain de <input
				type="number"
				size="4"
				bind:value={$gain_db_start}
				max={$gain_db_end}
				step="10"
			/>
			dB à <input type="number" size="4" bind:value={$gain_db_end} min={$gain_db_start} step="10" />
			dB
		</div>
	</div>

	<div class="graph-params">
		<h4>Sortie</h4>
		Nombre de période à afficher<input
			type="number"
			size="1"
			bind:value={$nb_period}
			min={0}
			step=".2"
		/>
	</div>
</div>

<style>
	.params-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.graph-params h4 {
		margin: 0;
		text-align: center;
	}

	.graph-params div {
		margin: 0.2rem;
	}
</style>
