
export function pointsToPath(x: number[], y: number[], y_min: number, y_max: number, ratio = 1): string {
	if (!x.length) return '';
	const dx = ratio * 100 / (x[x.length - 1] - x[0]);
	const dy = 100 / (y_max - y_min);

	let s = 0 + ' ' + ((y_min - y[0]) * dy + 100);

	for (let i = 1; i < x.length; i++) {
		s += ' ' + (x[i] - x[0]) * dx + ',' + ((y_min - y[i]) * dy + 100);
	}

	return s;
}

export function pointsToLogPath(x: number[], y: number[], y_min: number, y_max: number): string {
	if (!x.length) return '';
	const dx = 100 / (x[x.length - 1] - x[0]);
	const dy = 100 / (y_max - y_min);

	let s = 0 + ' ' + ((y_min - Math.log10(y[0])) * dy + 100);

	for (let i = 1; i < x.length; i++) {
		s += ' ' + (x[i] - x[0]) * dx + ',' + ((y_min - Math.log10(y[i])) * dy + 100);
	}

	return s;
}

export const GRAPH_KEY = Symbol()
