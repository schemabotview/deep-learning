import type { Section } from '../types'

export const precision: Section = {
  id: 'precision',
  title: 'Dtype/autocast/scaling and numerical failure',
  scene: 'precision',
  focus: 'rounding',
  slide: `## Precision and numerical failure

Half-precision formats halve memory and speed up matrix units, but each fails on **different** numbers.

### What the rounding does
- A gradient of **10⁻⁸**: fp16 underflows to **0**; bf16 keeps it
- Scaled by 65,536 first, it survives fp16 as 6.552 × 10⁻⁴
- 1 + 0.0001 rounds to **1** in both: tiny updates **vanish**
- 70,000 overflows fp16 to **inf**, not bf16

### The two formats
- **fp16**: finer steps, small range: needs loss scaling
- **bf16**: fp32's range, coarser steps: usually no scaler

### Autocast
- Matmuls and convolutions in low precision; reductions in fp32
- A precision change needs a quality check, not only speed`,
  narration:
    "Sixteen-bit formats halve the memory of activations and speed up the matrix units on modern accelerators, but each one fails on different numbers. The table rounds the same values into each format. A small gradient of ten to the minus eight underflows to zero in fp16, whose smallest number is about six times ten to the minus eight. Bf16 keeps it, because it has the same exponent range as fp32. Multiply that gradient by a loss scale of sixty-five thousand five hundred and thirty-six first, and it survives in fp16 as about six point five five times ten to the minus four. One plus one ten-thousandth rounds back to one in both formats, so any update smaller than the spacing near a weight's value simply vanishes. And an activation of seventy thousand overflows fp16 to infinity, while bf16 rounds it to seventy thousand one hundred and forty-four. So fp16 has finer steps but a small range, and needs loss scaling. Bf16 has fp32's range but coarser steps, and usually needs no scaler. Autocast runs matrix multiplies and convolutions in low precision while keeping reductions in fp32, and the optimiser's master weights stay in fp32 so small updates still accumulate. Even then, a precision change is a change to the model's numerics, so it needs a quality check as well as a speed measurement.",
}
