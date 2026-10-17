import { rng } from '../points'

// Chapter 12 numerics, COMPUTED.

// §1 — training memory for chapter 10's fine-tuned ResNet-18 (11,178,051 parameters), AdamW, fp32.
export const P = 11_178_051
export const GB = (bytes: number) => bytes / 1e9
export const mem = { params: 4 * P, grads: 4 * P, adam: 8 * P } // Adam keeps m and v per parameter
// Activation estimate at 224×224: conv and BatchNorm outputs saved for backward (2 tensors per conv).
const convOuts = [
  { c: 64, h: 112, n: 1 }, // stem
  { c: 64, h: 56, n: 4 }, // layer1
  { c: 128, h: 28, n: 5 }, // layer2 (+1 downsample)
  { c: 256, h: 14, n: 5 },
  { c: 512, h: 7, n: 5 },
]
export const actPerImage = 4 * (convOuts.reduce((a, l) => a + 2 * l.n * l.c * l.h * l.h, 0) + 64 * 56 * 56)
export const actBytes = (batch: number) => batch * actPerImage

// §2 — rounding to IEEE half precision (10 mantissa bits, subnormals down to 2^−24) and bfloat16.
export function toHalf(x: number) {
  if (x === 0 || !Number.isFinite(x)) return x
  const a = Math.abs(x)
  if (a >= 65520) return Math.sign(x) * Infinity
  const e = Math.max(Math.floor(Math.log2(a)), -14)
  const q = 2 ** (e - 10)
  return Math.sign(x) * Math.round(a / q) * q
}
export function toBf16(x: number) {
  if (x === 0 || !Number.isFinite(x)) return x
  const a = Math.abs(x)
  const e = Math.floor(Math.log2(a))
  const q = 2 ** (e - 7)
  return Math.sign(x) * Math.round(a / q) * q
}

// §3 — one BatchNorm channel's pre-activations over a batch of 64 (seeded), seen whole or as four
// microbatches of 16.
const r = rng(12)
export const acts = Array.from({ length: 64 }, (_, i) => 0.4 + (i < 16 ? 0.5 : i < 32 ? 0 : i < 48 ? -0.3 : 0.1) + (r() + r() + r() - 1.5) * 0.6)
const mu = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
const sd = (xs: number[]) => Math.sqrt(mu(xs.map((v) => (v - mu(xs)) ** 2)))
export const full = { mu: mu(acts), sd: sd(acts) }
export const micro = [0, 1, 2, 3].map((k) => {
  const xs = acts.slice(16 * k, 16 * k + 16)
  return { mu: mu(xs), sd: sd(xs) }
})

// §4 — activation checkpointing on a 12-block transformer: each block keeps 0.40 GB of internals for
// backward and takes a 0.05 GB input. Checkpoint every k blocks: keep the 12/k segment inputs, and
// rebuild one segment's internals at a time.
export const blocks = 12, inner = 0.4, input = 0.05
export const ckptMem = (k: number) => (k === 0 ? blocks * inner : (blocks / k) * input + k * inner)
export const extraForward = (k: number) => (k === 0 ? 0 : 1) // one extra forward pass over the stack

// §5 — a supplied profile summary for one training step (ms), as printed by the profiler.
export const profile = [
  { op: 'DataLoader __next__', cpu: 61.0, gpu: 0 },
  { op: 'aten::to (host → device copy)', cpu: 4.2, gpu: 3.8 },
  { op: 'forward (conv, bn, relu)', cpu: 3.1, gpu: 9.6 },
  { op: 'backward', cpu: 2.4, gpu: 18.7 },
  { op: 'optimizer.step', cpu: 1.2, gpu: 2.1 },
  { op: 'aten::item (loss.item())', cpu: 9.4, gpu: 0 },
]
export const stepMs = 92.0

// §6 — measured configurations: step time (ms, batch 64), peak memory, and validation macro-F1 over
// three seeds. Throughput is COMPUTED as batch / step time.
export const configs = [
  { name: 'fp32 baseline', ms: 92.0, gb: 3.9, f1: [0.851, 0.846, 0.855] },
  { name: '+ 4 workers, pinned', ms: 34.5, gb: 3.9, f1: [0.851, 0.846, 0.855] },
  { name: '+ bf16 autocast', ms: 21.8, gb: 2.3, f1: [0.849, 0.852, 0.845] },
  { name: '+ fp16, no scaler', ms: 21.5, gb: 2.3, f1: [0.611, 0.334, 0.702] },
]
export const meanSd = (xs: number[]) => {
  const m = mu(xs)
  return `${m.toFixed(3)} ± ${sd(xs).toFixed(3)}`
}
