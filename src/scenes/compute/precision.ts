import type { Scene } from '@graphlearning/flow'
import { toHalf, toBf16 } from './numbers'

// §2 — what fp16 and bf16 do to specific numbers, COMPUTED by rounding to each format.
const show = (v: number) => (v === 0 ? '0 (underflow)' : !Number.isFinite(v) ? 'inf (overflow)' : Math.abs(v) < 1e-3 ? v.toExponential(3) : String(+v.toPrecision(6)))
const cases: [string, number][] = [
  ['a small gradient', 1e-8],
  ['× loss scale 65,536', 1e-8 * 65536],
  ['1 + 0.0001', 1.0001],
  ['an activation of 70,000', 70000],
  ['0.1', 0.1],
]

export const precision: Scene = {
  id: 'precision',
  title: 'Precision and numerical failure',
  flow: 'TB',
  nodes: [
    {
      id: 'formats',
      kind: 'table',
      label: 'Three floating-point formats',
      headers: ['format', 'exponent / mantissa bits', 'largest', 'step at 1.0'],
      values: [
        ['fp32', '8 / 23', '3.4 × 10³⁸', (2 ** -23).toExponential(1)],
        ['fp16', '5 / 10', '65,504', (2 ** -10).toExponential(1)],
        ['bf16', '8 / 7', '3.4 × 10³⁸', (2 ** -7).toExponential(1)],
      ],
    },
    {
      id: 'rounding',
      kind: 'table',
      label: 'The same values, rounded to each format',
      headers: ['value', 'fp32', 'fp16', 'bf16'],
      values: cases.map(([name, v]) => [name, show(Math.fround(v)), show(toHalf(v)), show(toBf16(v))]),
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'amp.py',
      label: `scaler = torch.amp.GradScaler()                   # needed for fp16, not for bf16
with torch.autocast("cuda", dtype=torch.float16):  # matmuls/convs in fp16, reductions in fp32
    loss = loss_fn(model(x), y)
scaler.scale(loss).backward()      # scale up so small gradients survive
scaler.step(opt); scaler.update()  # unscale, skip the step on inf/nan, adjust the scale`,
    },
  ],
  edges: [
    { source: 'formats', target: 'rounding', label: 'in practice' },
    { source: 'rounding', target: 'code', label: 'autocast + scaling' },
  ],
}
