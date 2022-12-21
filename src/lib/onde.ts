export interface Onde {
	freq: number;
	harmo: number[][];
}

export function ondeTime(onde: Onde, time: number[]) {
	const base_puls = 2 * Math.PI * onde.freq;
	const out = new Array(time.length).fill(0);
	for (let i = 0; i < time.length; i++) {
		const t = time[i];
		for (let n = 0; n < onde.harmo.length; n++) {
			out[i] += onde.harmo[n][0] * Math.cos(base_puls * n * t + onde.harmo[n][1]);
		}
	}
	return out;
}

export function totalAmp(onde: Onde) {
	let tot = 0;
	for (let i = 1; i < onde.harmo.length; i++) {
		tot += onde.harmo[i][0];
	}
	return Math.max(tot, onde.harmo[0][0]);
}

export function maxAmp(onde: Onde) {
	let m = onde.harmo[0][0];
	for (let i = 1; i < onde.harmo.length; i++) {
		m = Math.max(m, onde.harmo[i][0]);
	}
	return m;
}

export function getHarmosFreqs(onde: Onde) {
	let o = new Array(onde.harmo.length);
	o[0] = 1e-100;
	for (let i = 1; i < onde.harmo.length; i++) {
		o[i] = onde.freq * i;
	}
	return o;
}

export function getHarmosFreqsLog(onde: Onde) {
	let o = new Array(onde.harmo.length);
	o[0] = -100;
	const base_f = Math.log10(onde.freq);
	for (let i = 1; i < onde.harmo.length; i++) {
		o[i] = base_f + Math.log10(i);
	}
	return o;
}

export function getHarmosNormalisedAmp(onde: Onde) {
	const max = maxAmp(onde);
	let o = new Array(onde.harmo.length);
	for (let i = 0; i < onde.harmo.length; i++) {
		o[i] = onde.harmo[i][0] / max;
	}
	return o;
}
