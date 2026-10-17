import type { Section } from '../types'

export const zeroGrad: Section = {
  id: 'zero-grad',
  title: 'Clearing versus accumulating gradients',
  scene: 'zero-grad',
  focus: 'trace',
  slide: `## Gradients add up

\`backward()\` **adds** into \`.grad\`; it never overwrites. So a training loop must clear it — unless accumulation is the point.

### The missing clear
- True gradients over four steps: 0.60, 0.50, 0.45, 0.40
- Without clearing, \`.grad\` holds the running sum: **0.60, 1.10, 1.55, 1.95**
- Each update uses ever-larger, stale gradients; training drifts or diverges
- Nothing raises an error — the loss just behaves strangely

### Accumulating on purpose
- To imitate a larger batch, call \`backward()\` on several micro-batches **before** stepping
- Scale each loss by the number of steps, step once, then \`zero_grad()\`
- \`set_to_none=True\` frees memory and makes an accidental reuse visible`,
  narration:
    "Here is one of the most common bugs in hand-written training loops. Calling backward does not replace the contents of a parameter's grad; it adds to them. That design is deliberate, because it is what makes shared weights and gradient accumulation work, but it means a training loop has to clear the gradients itself before each new backward pass. Suppose a weight's true gradients over four steps are nought point six, nought point five, nought point four five and nought point four. With the gradients cleared each step, grad holds exactly those values. Forget to clear them, and grad holds the running sum instead: nought point six, then one point one, then one point five five, then one point nine five. Every update now uses a larger and more out-of-date gradient than it should, so training drifts or blows up, and nothing anywhere raises an error; the loss curve just looks strange. Sometimes accumulation is exactly what you want: to imitate a batch too large to fit in memory, call backward on several micro-batches before taking one optimiser step. Scale each micro-batch's loss by the number of steps, step once, and then clear. Setting gradients to None, rather than to zero, saves memory and makes accidental reuse fail loudly.",
}
