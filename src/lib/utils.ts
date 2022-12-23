import { derived, type Readable } from 'svelte/store';
import { precision } from './utils-stores';

export function linspace(start: number, end: number, ratio = 1): Readable<number[]> {
	return derived(precision, (pres) => {
		const p = pres * ratio;
		let a = new Array(p + 1);
		for (let i = 0; i <= p; i++) {
			a[i] = (i / p) * (end - start) + start;
		}
		return a;
	});
}

export function logspace(start: number, end: number): Readable<number[]> {
	return derived(precision, (pres) => {
		let a = new Array(pres + 1);
		for (let i = 0; i <= pres; i++) {
			a[i] = Math.pow(10, (i / pres) * (end - start) + start);
		}
		return a;
	});
}

export function linspace_store(
	start: Readable<number>,
	end: Readable<number>,
	ratio = 1
): Readable<number[]> {
	return derived([precision, start, end], ([pres, start, end]) => {
		const p = pres * ratio;
		let a = new Array(p + 1);
		for (let i = 0; i <= p; i++) {
			a[i] = (i / p) * (end - start) + start;
		}
		return a;
	});
}

export function logspace_store(start: Readable<number>, end: Readable<number>): Readable<number[]> {
	return derived([precision, start, end], ([pres, start, end]) => {
		let a = new Array(pres + 1);
		for (let i = 0; i <= pres; i++) {
			a[i] = Math.pow(10, (i / pres) * (end - start) + start);
		}
		return a;
	});
}

const numberFormatterCompact = Intl.NumberFormat(undefined, {
	notation: 'compact'
});

const numberFormatterSci = Intl.NumberFormat(undefined, {
	notation: 'scientific'
});

export function formatNumberAxis(x: number) {
	if (Math.abs(x) > 0.01 || x == 0) {
		return numberFormatterCompact.format(x);
	}

	if (Math.abs(x) >= 1e-3) {
		return (x / 1e-3).toLocaleString() + ' m';
	}

	if (Math.abs(x) >= 1e-6) {
		return (x / 1e-6).toLocaleString() + ' µ';
	}

	if (Math.abs(x) >= 1e-9) {
		return (x / 1e-9).toLocaleString() + ' n';
	}

	if (Math.abs(x) >= 1e-12) {
		return (x / 1e-12).toLocaleString() + ' p';
	}

	if (Math.abs(x) >= 1e-15) {
		return (x / 1e-15).toLocaleString() + ' f';
	}

	return numberFormatterSci.format(x);
}
