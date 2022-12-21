import { writable, type Writable } from 'svelte/store';
import { BaseFilter, HighPassFirstFilter, LowPassFirstFilter } from './filtres';
import type { Onde } from './onde';

export const precision = writable(120);
export const filter: Writable<BaseFilter> = writable(new HighPassFirstFilter(2000, 1));
export const onde: Writable<Onde> = writable({freq: 1000, harmo: [[0, 0], [1, 0], [0.2, 2], [0.2, 0]]});