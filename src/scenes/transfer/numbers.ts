import type { PlotPoint } from '@graphlearning/flow'

// Shared, computed figures for chapter 10. Learning curves are illustrative saturating curves on the
// chapter-5 convention (validation macro-F1, split by production batch, pool of 2,400 images).
export const sizes = [150, 300, 600, 1200, 1800, 2400]
export const curve = (top: number, rate: number) => (n: number) => top * (1 - Math.exp(-n / rate))
export const scratch = curve(0.9, 700) // chapter 5's small CNN
export const general = curve(0.93, 245) // pretrained on general photos, fine-tuned
export const renders = curve(0.84, 160) // pretrained on clean CAD renders: negative transfer at scale
export const pts = (f: (n: number) => number): PlotPoint[] => sizes.map((n) => [n / 1000, f(n)])

// ResNet-18 parameter counts, COMPUTED from its layer shapes (conv weights + BatchNorm γ, β).
const conv = (i: number, o: number, k: number) => i * o * k * k
const bn = (c: number) => 2 * c
const basic = (i: number, o: number, down: boolean) =>
  conv(i, o, 3) + bn(o) + conv(o, o, 3) + bn(o) + (down ? conv(i, o, 1) + bn(o) : 0)
const stage = (i: number, o: number, down: boolean) => basic(i, o, down) + basic(o, o, false)
export const resnet = {
  stem: conv(3, 64, 7) + bn(64),
  layer1: stage(64, 64, false),
  layer2: stage(64, 128, true),
  layer3: stage(128, 256, true),
  layer4: stage(256, 512, true),
}
export const encoderParams = Object.values(resnet).reduce((a, b) => a + b, 0)
export const headParams = 512 * 3 + 3
export const n = (v: number) => v.toLocaleString('en-GB')

// BatchNorm running mean under momentum 0.1: source statistics 0.0, every target batch has mean 0.6.
export const running = (k: number, src = 0, tgt = 0.6, m = 0.1) => tgt + (src - tgt) * (1 - m) ** k

// InfoNCE for one anchor: cosine similarities to its positive and three negatives, temperature 0.1.
export const sims = { pos: 0.6, negs: [0.5, 0.2, -0.1] }
export const tau = 0.1
export const infoNCE = (pos: number, negs: number[], t = tau) => {
  const e = [pos, ...negs].map((s) => Math.exp(s / t))
  return { p: e[0] / e.reduce((a, b) => a + b, 0), loss: -Math.log(e[0] / e.reduce((a, b) => a + b, 0)) }
}
