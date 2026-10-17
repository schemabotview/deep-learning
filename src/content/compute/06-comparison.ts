import type { Section } from '../types'

export const comparison: Section = {
  id: 'comparison',
  title: 'Measured quality–resource comparisons',
  scene: 'comparison',
  focus: 'table',
  slide: `## Measure quality and resources together

An efficiency change is only an improvement if it keeps **quality**. Measure both, on the same split and seeds, one change at a time.

### The changes, batch 64 (validation, 3 seeds)
- fp32 baseline: **696** images/s, 3.9 GB, macro-F1 **0.851 ± 0.004**
- Workers + pinned memory: **1,855** images/s, same F1
- bf16 autocast: **2,936** images/s, **2.3 GB**, F1 0.849 ± 0.003
- fp16 without a scaler: about as fast, but F1 **0.549 ± 0.157**

### Reading it
- The biggest gain came from the **input pipeline**, not precision
- fp16's failure shows only in **quality**, never in speed

### Report
- Hardware, batch, dtype, step time, peak memory and quality, with seeds`,
  narration:
    "An efficiency change is only an improvement if the model is still as good. So measure speed, memory and quality together, on the same split and the same seeds, changing one thing at a time. These are illustrative measurements at a batch of sixty-four. The fp32 baseline trains at about seven hundred images a second, peaks at three point nine gigabytes, and reaches a validation macro F one of nought point eight five one, with a spread of four thousandths over three seeds. Adding loader workers and pinned memory, the fix from the profile, raises throughput to over eighteen hundred images a second with exactly the same results. Turning on bf16 autocast raises it to nearly three thousand, cuts peak memory to two point three gigabytes, and gives nought point eight four nine, a change well inside the spread between seeds. Switching to fp16 without a gradient scaler is about as fast again, but the macro F one falls to nought point five five, with a huge spread across seeds, as small gradients underflow to zero. Two lessons follow. The biggest gain came from the input pipeline, not from precision. And the fp16 failure is invisible in the speed numbers: it shows up only in quality. Report hardware, batch, dtype, step time, peak memory and quality with seeds, every time.",
}
