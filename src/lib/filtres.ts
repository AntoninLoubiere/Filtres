import { writable, type Writable, derived, type Readable } from 'svelte/store';
import type { Onde } from './onde';

export abstract class BaseFilter {
	f0: Writable<number>;
	h0: Writable<number>;

	constructor(f0: number, h0: number) {
		this.f0 = writable(f0);
		this.h0 = writable(h0);
	}

	abstract gain(freqs: number[]): Readable<number[]>;
	abstract phase(freqs: number[]): Readable<number[]>;
	abstract apply(onde: Onde): Readable<Onde>;
}

export class LowPassFirstFilter extends BaseFilter {
	constructor(f0: number, h0: number) {
		super(f0, h0);
	}

	gain(freqs: number[]): Readable<number[]> {
		let a = new Array(freqs.length);
		return derived([this.f0, this.h0], ([f0, h0]) => {
			for (let i = 0; i < freqs.length; i++) {
				let x = freqs[i] / f0;
				a[i] = h0 / Math.sqrt(1 + x * x);
			}
			return a;
		});
	}

	phase(freqs: number[]): Readable<number[]> {
		let a = new Array(freqs.length);
		return derived(this.f0, (f0) => {
			for (let i = 0; i < freqs.length; i++) {
				let x = freqs[i] / f0;
				a[i] = -Math.atan(x);
			}
			return a;
		});
	}

	apply(onde: Onde): Readable<Onde> {
		const o: Onde = {
			freq: onde.freq,
			harmo: new Array(onde.harmo.length)
		};
		for (let i = 0; i < onde.harmo.length; i++) {
			o.harmo[i] = new Array(2);
		}
		return derived([this.f0, this.h0], ([f0, h0]) => {
			for (let i = 0; i < onde.harmo.length; i++) {
				let x = (onde.freq * i) / f0;
				o.harmo[i][0] = (h0 / Math.sqrt(1 + x * x)) * onde.harmo[i][0];
				o.harmo[i][1] = onde.harmo[i][1] - Math.atan(x);
			}
			return o;
		});
	}
}

export class HighPassFirstFilter extends BaseFilter {
	constructor(f0: number, h0: number) {
		super(f0, h0);
	}

	gain(freqs: number[]): Readable<number[]> {
		let a = new Array(freqs.length);
		return derived([this.f0, this.h0], ([f0, h0]) => {
			for (let i = 0; i < freqs.length; i++) {
				let x = freqs[i] / f0;
				a[i] = (x * h0) / Math.sqrt(1 + x * x);
			}
			return a;
		});
	}

	phase(freqs: number[]): Readable<number[]> {
		let a = new Array(freqs.length);
		return derived(this.f0, (f0) => {
			for (let i = 0; i < freqs.length; i++) {
				let x = freqs[i] / f0;
				a[i] = Math.PI / 2 - Math.atan(x * x);
			}
			return a;
		});
	}

	apply(onde: Onde): Readable<Onde> {
		const o: Onde = {
			freq: onde.freq,
			harmo: new Array(onde.harmo.length)
		};
		for (let i = 0; i < onde.harmo.length; i++) {
			o.harmo[i] = new Array(2);
		}
		return derived([this.f0, this.h0], ([f0, h0]) => {
			for (let i = 0; i < onde.harmo.length; i++) {
				let x = (onde.freq * i) / f0;
				o.harmo[i][0] = ((x * h0) / Math.sqrt(1 + x * x)) * onde.harmo[i][0];
				o.harmo[i][1] = onde.harmo[i][1] - Math.atan(x) + Math.PI / 2;
			}
			return o;
		});
	}
}
