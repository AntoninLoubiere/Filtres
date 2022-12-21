<script lang="ts">
	import type { SvelteComponent, SvelteComponentTyped } from "svelte";
	import type { SvelteComponentDev } from "svelte/internal";
	import Filter from "./filter.svelte";
	import Onde from "./onde.svelte";


    type DashBoards = 'onde' | 'filter' | 'none';
    type DashInfo = {
        comp: typeof Onde,
        name: string,
    }
    const DASHBOARDS: Map<DashBoards, DashInfo | undefined> = new Map([['filter', {comp: Filter, name: 'Filtre'}], ['onde', {comp: Onde, name: 'Onde'}]]);

    let dashboard: DashBoards = 'none';
    $: showed = dashboard != 'none';

    let lastDashboard: DashBoards = 'filter';
    let currentDashboard: typeof Onde = Filter;
    $: if (dashboard != 'none') {
        lastDashboard = dashboard;
         currentDashboard = DASHBOARDS.get(dashboard)?.comp || Filter;
    }

    function toggle(dash: DashBoards) {
        if (dashboard == dash) {
            dashboard = 'none'
        } else {
            dashboard = dash;
        }
    }

</script>

<div class="parent" class:showed>
    <div class="button-list">
        {#each Array.from(DASHBOARDS.keys()) as d}
            <button on:click={() => toggle(d)} class:selected={d == lastDashboard}>
                {DASHBOARDS.get(d)?.name}
            </button>
        {/each}
    </div>
    <div class="child">
        {#if currentDashboard}
            <svelte:component this={currentDashboard}></svelte:component>
        {/if}
    </div>
</div>

<style>
    .parent {
        position: sticky;
        bottom: calc(-0px - var(--dashboard-size));
        left:0;
        right: 0;

        overflow-x: hidden;


        transition: bottom 300ms;
    }

    .showed {
        bottom: 0px;
    }

    .child {
        height: var(--dashboard-size);
        background: var(--bg-color);
        border-top: var(--accent-bis) 4px solid;
        margin: 0 0;
        padding: var(--base-margin);
        box-sizing: border-box;

        overflow: auto;
    }

    .button-list {
        padding: 0 1rem;
        display: flex;
        gap: .5rem;
    }

    button {
        background: var(--bg-color);
        border: solid var(--accent-bis) 4px;
        margin-bottom: -4px;
        z-index: 10;

        border-radius: .5rem .5rem 0 0;
        text-transform: uppercase;
        font-size: x-large;
        font-weight: 300;
        letter-spacing: .05rem;
        padding: 0 .5rem;
        cursor: pointer;
    }

    button.selected {
        border-bottom-color: var(--bg-color);
    }

        @media print {
        .parent {
            display: none;
        }
    }
</style>