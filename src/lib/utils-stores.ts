import { writable, type Writable } from 'svelte/store';
import { BaseFilter, LowPassFirstFilter } from './filtres';
import type { Onde } from './onde';

export const precision = writable(200);
export const filter: Writable<BaseFilter> = writable(new LowPassFirstFilter(1000, 1));

let harmo = [[0, 0]];
for (let i = 0; i < 25; i++) {
	harmo.push([0, 0]);
}
harmo[1][0] = 1;
// Should only be written by the dashboard !
export const onde: Writable<Onde> = writable({ freq: 1000, harmo });
