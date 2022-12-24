import { writable, type Writable, derived, type Readable } from 'svelte/store';
import type { Onde } from './onde';

export abstract class BaseFilter {
	f0: Writable<number>;
	h0: Writable<number>;
	q: Writable<number>;

	constructor(f0: number, h0: number, q: number) {
		this.f0 = writable(f0);
		this.h0 = writable(h0);
		this.q = writable(q);
	}

	abstract gain(freqs: Readable<number[]>): Readable<number[]>;
	abstract phase(freqs: Readable<number[]>): Readable<number[]>;
	abstract apply(onde: Readable<Onde>): Readable<Onde>;
	abstract max_gain(): Readable<number>;
	abstract get_id(): number;
}

export class LowPassFirstFilter extends BaseFilter {
	constructor(f0: number, h0: number) {
		super(f0, h0, 1);
	}

	gain(freqs: Readable<number[]>): Readable<number[]> {
		let a = new Array(0);
		return derived([freqs, this.f0, this.h0], ([freqs, f0, h0]) => {
			if (a.length != freqs.length) a = new Array(freqs.length);

			for (let i = 0; i < freqs.length; i++) {
				const x = freqs[i] / f0;
				a[i] = h0 / Math.sqrt(1 + x * x);
			}
			return a;
		});
	}

	phase(freqs: Readable<number[]>): Readable<number[]> {
		let a = new Array(0);
		return derived([freqs, this.f0], ([freqs, f0]) => {
			if (a.length != freqs.length) a = new Array(freqs.length);
			for (let i = 0; i < freqs.length; i++) {
				const x = freqs[i] / f0;
				a[i] = -Math.atan(x);
			}
			return a;
		});
	}

	apply(onde: Readable<Onde>): Readable<Onde> {
		let harmo = new Array(0);
		return derived([onde, this.f0, this.h0], ([onde, f0, h0]) => {
			if (harmo.length != onde.harmo.length) {
				harmo = new Array(onde.harmo.length);
				for (let i = 0; i < onde.harmo.length; i++) {
					harmo[i] = new Array(2);
				}
			}
			const o: Onde = {
				freq: onde.freq,
				harmo
			};

			for (let i = 0; i < onde.harmo.length; i++) {
				const x = (onde.freq * i) / f0;
				o.harmo[i][0] = (h0 / Math.sqrt(1 + x * x)) * onde.harmo[i][0];
				o.harmo[i][1] = onde.harmo[i][1] - Math.atan(x);
			}
			return o;
		});
	}

	max_gain() {
		return this.h0;
	}

	get_id(): number {
		return 0;
	}
}

export class HighPassFirstFilter extends BaseFilter {
	constructor(f0: number, h0: number) {
		super(f0, h0, 1);
	}

	gain(freqs: Readable<number[]>): Readable<number[]> {
		let a = new Array(0);
		return derived([freqs, this.f0, this.h0], ([freqs, f0, h0]) => {
			if (a.length != freqs.length) a = new Array(freqs.length);

			for (let i = 0; i < freqs.length; i++) {
				const x = freqs[i] / f0;
				a[i] = (x * h0) / Math.sqrt(1 + x * x);
			}
			return a;
		});
	}

	phase(freqs: Readable<number[]>): Readable<number[]> {
		let a = new Array(0);
		return derived([freqs, this.f0], ([freqs, f0]) => {
			if (a.length != freqs.length) a = new Array(freqs.length);
			for (let i = 0; i < freqs.length; i++) {
				const x = freqs[i] / f0;
				a[i] = Math.PI / 2 - Math.atan(x);
			}
			return a;
		});
	}

	apply(onde: Readable<Onde>): Readable<Onde> {
		let harmo = new Array(0);
		return derived([onde, this.f0, this.h0], ([onde, f0, h0]) => {
			if (harmo.length != onde.harmo.length) {
				harmo = new Array(onde.harmo.length);
				for (let i = 0; i < onde.harmo.length; i++) {
					harmo[i] = new Array(2);
				}
			}
			const o: Onde = {
				freq: onde.freq,
				harmo
			};

			for (let i = 0; i < onde.harmo.length; i++) {
				const x = (onde.freq * i) / f0;
				o.harmo[i][0] = ((x * h0) / Math.sqrt(1 + x * x)) * onde.harmo[i][0];
				o.harmo[i][1] = onde.harmo[i][1] - Math.atan(x) + Math.PI / 2;
			}
			return o;
		});
	}

	max_gain() {
		return this.h0;
	}

	get_id(): number {
		return 1;
	}
}

export class SecondOrderFilter extends BaseFilter {
	mode: number;
	constructor(f0: number, h0: number, q: number, mode: number) {
		super(f0, h0, q);
		this.mode = mode;
	}

	_gain: ((h0: number, b: number, c: number) => number)[] = [
		(h0, b, c) => h0 / Math.sqrt((1 + c) * (1 + c) + b * b),
		(h0, b, c) => (-c * h0) / Math.sqrt((1 + c) * (1 + c) + b * b),
		(h0, b, c) => (b * h0) / Math.sqrt((1 + c) * (1 + c) + b * b),
		(h0, b, c) => (Math.abs(1 + c) * h0) / Math.sqrt((1 + c) * (1 + c) + b * b)
	];

	_phase: ((q: number, x: number) => number)[] = [
		(q, x) => -Math.PI / 2 - Math.atan(q * (x - 1 / x)),
		(q, x) => Math.PI / 2 - Math.atan(q * (x - 1 / x)),
		(q, x) => -Math.atan(q * (x - 1 / x)),
		(q, x) => -Math.atan(q * (x - 1 / x))
	];

	gain(freqs: Readable<number[]>): Readable<number[]> {
		let a = new Array(0);
		const _gain = this._gain[this.mode];
		return derived([freqs, this.f0, this.h0, this.q], ([freqs, f0, h0, q]) => {
			if (a.length != freqs.length) a = new Array(freqs.length);

			for (let i = 0; i < freqs.length; i++) {
				const x = freqs[i] / f0;
				const b = x / q;
				const c = -x * x;
				a[i] = _gain(h0, b, c);
			}
			return a;
		});
	}

	phase(freqs: Readable<number[]>): Readable<number[]> {
		let a = new Array(0);
		const _phase = this._phase[this.mode];
		return derived([freqs, this.f0, this.q], ([freqs, f0, q]) => {
			if (a.length != freqs.length) a = new Array(freqs.length);
			for (let i = 0; i < freqs.length; i++) {
				const x = freqs[i] / f0;
				a[i] = _phase(q, x);
			}
			return a;
		});
	}

	apply(onde: Readable<Onde>): Readable<Onde> {
		let harmo = new Array(0);
		const _gain = this._gain[this.mode];
		const _phase = this._phase[this.mode];
		return derived([onde, this.f0, this.h0, this.q], ([onde, f0, h0, q]) => {
			if (harmo.length != onde.harmo.length) {
				harmo = new Array(onde.harmo.length);
				for (let i = 0; i < onde.harmo.length; i++) {
					harmo[i] = new Array(2);
				}
			}
			const o: Onde = {
				freq: onde.freq,
				harmo
			};

			for (let i = 0; i < onde.harmo.length; i++) {
				const x = (onde.freq * i) / f0;
				const b = x / q;
				const c = -x * x;
				o.harmo[i][0] = _gain(h0, b, c) * onde.harmo[i][0];
				o.harmo[i][1] = onde.harmo[i][1] + _phase(q, x);
			}
			return o;
		});
	}

	max_gain() {
		return derived([this.h0, this.q], ([h0, q]) => {
			if (q < 1 / Math.sqrt(2)) {
				return h0;
			} else {
				const x = Math.sqrt(4 - 1 / (2 * q * q));
				const b = x / q;
				const c = -x * x;
				return Math.max(this._gain[this.mode](h0, b, c), this._gain[this.mode](h0, 1 / q, -1), h0);
			}
		});
	}

	get_id(): number {
		return this.mode + 2;
	}
}
