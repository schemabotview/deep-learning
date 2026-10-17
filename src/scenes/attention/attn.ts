import { softmax, rng } from '../points'

// The chapter's one worked attention trace, COMPUTED: an inspector note "dent on lid" padded to four
// positions, d_k = 4 (so √d_k = 2), values of width 2. Every number on the chapter's slides comes
// from here.
export const tokens = ['dent', 'on', 'lid', 'PAD']
export const dk = 4
export const Q = [
  [1, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
]
export const K = [
  [1, 0, 1, 1],
  [0, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 0, 0],
]
export const V = [
  [2, 0],
  [0, 1],
  [1, 2],
  [0, 0],
]
export const valid = [true, true, true, false] // the padding mask: key 4 is PAD

const dot = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0)

/** Raw scores QKᵀ/√d_k. */
export const scores = Q.map((q) => K.map((k) => dot(q, k) / Math.sqrt(dk)))

/** Masked scores: −∞ where key j is padding (and, if causal, where j > i). */
export const masked = (causal: boolean) =>
  scores.map((row, i) => row.map((s, j) => (!valid[j] || (causal && j > i) ? -Infinity : s)))

/** Row softmax that, like the naive kernel, returns NaN for an all −∞ row. */
export const rowSoftmax = (row: number[]) => (row.every((v) => v === -Infinity) ? row.map(() => NaN) : softmax(row))

export const weights = (causal: boolean) => masked(causal).map(rowSoftmax)
export const outputs = (w: number[][]) => w.map((row) => [0, 1].map((c) => row.reduce((s, a, j) => s + a * V[j][c], 0)))

export const fmt = (v: number, d = 2) => (v === -Infinity ? '−∞' : Number.isNaN(v) ? 'NaN' : Math.abs(v) < 5e-3 ? '0' : v.toFixed(d))

/**
 * Softmax saturation with width: for random q, k with unit-variance entries, the mean largest weight
 * a query puts on 8 keys, with and without the 1/√d scale. Averaged over 200 seeded draws.
 */
export function maxWeight(d: number, scaled: boolean, trials = 200, nk = 8) {
  const r = rng(1000 + d)
  const g = () => (r() + r() + r() - 1.5) * 2 // ≈ unit variance
  let tot = 0
  for (let t = 0; t < trials; t++) {
    const q = Array.from({ length: d }, g)
    const s = Array.from({ length: nk }, () => {
      const k = Array.from({ length: d }, g)
      return dot(q, k) / (scaled ? Math.sqrt(d) : 1)
    })
    tot += Math.max(...softmax(s))
  }
  return tot / trials
}
