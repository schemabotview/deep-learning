import type { Section } from '../types'

export const boundaries: Section = {
  id: 'boundaries',
  title: 'Compression/parallelism boundaries and specialist handoff',
  scene: 'boundaries',
  focus: 'techniques',
  slide: `## Where this course stops

Compression and parallelism go beyond a single-device training loop. Know what each changes and what to check, then **hand over**.

### Compression
- Weights: **44.7 MB** in fp32, **22.4 MB** in 16-bit, **11.2 MB** in int8
- **Quantisation** changes numerics: re-check per-class F1, not just accuracy

### Parallelism
- **Data parallel** splits the batch: sync BatchNorm, revisit the learning rate
- **Tensor / pipeline parallel** split the layers: check numerics match one device

### The handoff request
- **Baseline**: metrics, seeds, split and the exact checkpoint
- **Budget**: the latency and memory target
- **Tolerance**: the largest quality drop that is acceptable`,
  narration:
    "Compression and parallelism go beyond a training loop on a single device, and their implementations belong to specialists and to the deployment and infrastructure teams. What this course needs is to know what each one changes, and what to check before trusting it. The fine-tuned model's weights take forty-five megabytes in fp32, twenty-two in a sixteen-bit format, and eleven in eight-bit integers. Quantisation shrinks them by changing their numerics, so the result must be re-evaluated, per class rather than by overall accuracy, because rare defect classes are often the first to suffer. Pruning and distillation change the model itself, so they need a full re-evaluation, as if it were a new model. On the parallelism side, data parallel training splits each batch across devices, which makes batch norm statistics per device unless they are synchronised, and changes the effective batch size, so the learning rate may need revisiting. Tensor and pipeline parallelism split the layers themselves across devices, and the first check is that the numbers match a single-device run. When you hand this work over, send three things with the request. The baseline: its metrics, seeds, split and exact checkpoint. The budget: the latency and memory target. And the tolerance: the largest drop in quality that would be acceptable.",
}
