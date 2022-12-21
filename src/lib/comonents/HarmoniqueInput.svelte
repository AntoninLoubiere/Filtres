<script lang="ts">
	import NumberInput from "./NumberInput.svelte";
	import PhaseInput from "./PhaseInput.svelte";

    export let i: number;
    export let ampl: number;
    export let phase: number;
</script>
<div class="parent">
    {i}
    <div class="input">
        <NumberInput bind:value={ampl} label="A" disable0={false} min={0} max_range={1} step={.01} size={1} vertical={true}></NumberInput>
        {#if i > 0}
            <PhaseInput bind:phase></PhaseInput>
        {/if}
    </div>
</div>

<style>
    .parent {
        text-align: center;
        border: #6ee7b7 solid 2px;
        padding: 0.2rem .35rem;
        border-radius: .5rem;
    }

    .input {
        display: flex;
    }
</style>