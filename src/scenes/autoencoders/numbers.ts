import { rng } from '../points'

// Chapter 11 numerics, COMPUTED.

// §1 — a tied linear autoencoder on three sensor-channel means: z = u·x, x̂ = z·u, with unit u.
export const u = [0.6, 0, 0.8]
export const x = [0.9, 0.2, 0.4]
export const z = u.reduce((a, v, i) => a + v * x[i], 0)
export const xhat = u.map((v) => z * v)
export const err = x.map((v, i) => v - xhat[i])
export const mse = err.reduce((a, e) => a + e * e, 0) / err.length

// §2 — 2-D centred data, PCA's first direction, and a linear autoencoder (untied 2→1→2) trained by
// plain gradient descent from a seeded start.
const r = rng(11)
const g = () => (r() + r() + r() - 1.5) * 1.15
const raw = Array.from({ length: 80 }, () => {
  const a = g() * 2.2, b = g() * 0.6
  return [a * 0.866 - b * 0.5, a * 0.5 + b * 0.866]
})
const mean = [0, 1].map((k) => raw.reduce((s, p) => s + p[k], 0) / raw.length)
export const data = raw.map((p) => [p[0] - mean[0], p[1] - mean[1]])
const cxx = data.reduce((s, p) => s + p[0] * p[0], 0) / data.length
const cyy = data.reduce((s, p) => s + p[1] * p[1], 0) / data.length
const cxy = data.reduce((s, p) => s + p[0] * p[1], 0) / data.length
export const pcaAngle = 0.5 * Math.atan2(2 * cxy, cxx - cyy)
export const pcaDir = [Math.cos(pcaAngle), Math.sin(pcaAngle)]
export const varTotal = cxx + cyy
const lam1 = (cxx + cyy) / 2 + Math.sqrt(((cxx - cyy) / 2) ** 2 + cxy ** 2)
export const pcaMSE = (varTotal - lam1) / 2 // per coordinate

let we = [1.6, 0.3], wd = [0.2, 0.1]
const lr = 0.05
for (let it = 0; it < 3000; it++) {
  const ge = [0, 0], gd = [0, 0]
  for (const p of data) {
    const zz = we[0] * p[0] + we[1] * p[1]
    const e = [wd[0] * zz - p[0], wd[1] * zz - p[1]]
    for (let k = 0; k < 2; k++) gd[k] += (2 * e[k] * zz) / data.length
    const back = 2 * (e[0] * wd[0] + e[1] * wd[1])
    for (let k = 0; k < 2; k++) ge[k] += (back * p[k]) / data.length
  }
  we = we.map((v, k) => v - lr * ge[k] / 2)
  wd = wd.map((v, k) => v - lr * gd[k] / 2)
}
export const enc = we, dec = wd
const norm = (v: number[]) => Math.hypot(v[0], v[1])
export const decDir = [dec[0] / norm(dec), dec[1] / norm(dec)].map((v) => v * Math.sign(dec[0]))
export const angleDiffDeg = (Math.acos(Math.min(1, Math.abs(decDir[0] * pcaDir[0] + decDir[1] * pcaDir[1]))) * 180) / Math.PI
export const aeMSE = data.reduce((s, p) => {
  const zz = enc[0] * p[0] + enc[1] * p[1]
  return s + (dec[0] * zz - p[0]) ** 2 + (dec[1] * zz - p[1]) ** 2
}, 0) / (2 * data.length)
export const normEnc = norm(enc), normDec = norm(dec)

// §4 — how little a missed scratch costs in pixel MSE: 64×64 image, 2×30-pixel scratch, error 0.5.
export const pixels = 64 * 64, scratchPx = 2 * 30
export const scratchShare = scratchPx / pixels
export const missedCost = (scratchPx * 0.5 ** 2) / pixels

// §5 — reconstruction-error scores (seeded): 400 normal validation images, 60 defects, 20 blank
// frames (camera fault). Threshold = 99th percentile of normal validation error.
const r5 = rng(55)
const lognorm = (mu: number, s: number) => Math.exp(mu + s * (r5() + r5() + r5() + r5() - 2) * 1.22)
export const normal = Array.from({ length: 400 }, () => lognorm(Math.log(0.02), 0.3))
export const defect = Array.from({ length: 60 }, () => lognorm(Math.log(0.034), 0.35))
export const blank = Array.from({ length: 20 }, () => lognorm(Math.log(0.006), 0.25))
export const threshold = [...normal].sort((a, b) => a - b)[Math.floor(0.99 * normal.length) - 1]
export const rate = (xs: number[]) => xs.filter((v) => v > threshold).length / xs.length
