import type { PlotPoint } from '@graphlearning/flow'

// Seeded synthetic data for the geometry plots, shared by every course. A fixed LCG keeps every frame
// reproducible: the same seed always draws the same points, so a recorded video never shifts.
export function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

/** n points around (cx, cy), roughly Gaussian (sum of uniforms), spread sx × sy, rounded. */
export function blob(seed: number, n: number, cx: number, cy: number, sx: number, sy = sx): PlotPoint[] {
  const r = rng(seed)
  const g = () => (r() + r() + r() - 1.5) * 1.15
  return Array.from({ length: n }, () => [Math.round((cx + g() * sx) * 100) / 100, Math.round((cy + g() * sy) * 100) / 100])
}

/** A circle as a closed line, for neighbourhoods and radial boundaries. */
export function circle(cx: number, cy: number, r: number, steps = 64): PlotPoint[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = (i / steps) * 2 * Math.PI
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)]
  })
}

// ---- tiny exact numerics for neural traces --------------------------------------------------------

/** Softmax with the max subtracted first (the stable form). */
export const softmax = (z: number[]) => {
  const m = Math.max(...z)
  const e = z.map((v) => Math.exp(v - m))
  const s = e.reduce((a, b) => a + b, 0)
  return e.map((v) => v / s)
}
export const relu = (v: number) => Math.max(0, v)
export const sigmoid = (v: number) => 1 / (1 + Math.exp(-v))
/** Matrix–vector product, W as rows. */
export const matvec = (W: number[][], x: number[]) => W.map((row) => row.reduce((a, w, j) => a + w * x[j], 0))
/** Matrix–matrix product. */
export const matmul = (A: number[][], B: number[][]) => A.map((row) => B[0].map((_, j) => row.reduce((a, v, k) => a + v * B[k][j], 0)))
/** Format a number compactly for a table cell. */
export const f2 = (v: number, d = 2) => (Math.abs(v) < 1e-12 ? '0' : v.toFixed(d))
