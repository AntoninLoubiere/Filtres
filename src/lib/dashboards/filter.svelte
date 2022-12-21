<script lang="ts">
	import NumberInput from "$lib/comonents/NumberInput.svelte";
	import { filter } from "$lib/utils-stores";


	$: f0 = $filter.f0;
	$: h0 = $filter.h0;
</script>
Filtre passe haut
<div>
    <NumberInput bind:value={$f0} min={0} max_range={1e4} step={10} label="Fréquence propre" size={6} suffix="Hz"/>
    <NumberInput bind:value={$h0} step={0.01} min={0.01} min_range={0.01} max_range={2} label="Gain propre"/>
</div>