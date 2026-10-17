import type { Section } from '../types'

export const memory: Section = {
  id: 'memory',
  title: 'Parameter/activation/gradient/optimiser memory',
  scene: 'memory',
  focus: 'budget',
  slide: `## Where training memory goes

Training memory has two parts: a **per-parameter** part fixed by the model and optimiser, and a **per-example** part that grows with batch and input size.

### Per parameter: 11.18M weights, AdamW, fp32
- Weights **0.04 GB**, gradients **0.04 GB**, Adam's m and v **0.09 GB**
- 16 bytes per parameter: **0.18 GB**, whatever the batch

### Per example: activations kept for backward
- Estimate from conv and BatchNorm outputs: **20.7 MB** per 224 × 224 image
- Batch 64: **1.32 GB**; batch 128: **2.65 GB**
- For this model, activations dominate **seven to one** at batch 64

### Estimate, then measure
- The estimate leaves out ReLU outputs, workspaces and allocator caching
- The measured peak at batch 64 is **3.9 GB**, over twice the 1.50 GB estimate
- Read max_memory_allocated() after one full step`,
  narration:
    "Training memory comes in two parts. One is fixed by the model and the optimiser, the same whatever the batch. The other grows with every example in the batch and with the size of each input. Take the fine-tuned ResNet eighteen from chapter ten, with eleven point one eight million parameters, trained with AdamW in thirty-two-bit floats. The weights take four bytes each, about four hundredths of a gigabyte. The gradients take the same again. Adam keeps two running averages per parameter, another nine hundredths. That is sixteen bytes per parameter, nought point one eight gigabytes in all, at any batch size. The second part is the activations that forward keeps for backward. Counting only the convolution and batch norm outputs at two hundred and twenty-four pixels gives an estimate of twenty point seven megabytes per image: one point three two gigabytes at a batch of sixty-four, and two point six five at a hundred and twenty-eight. For this model the activations outweigh everything else seven to one. Treat that as an estimate, then measure. It leaves out the ReLU outputs, convolution workspaces and the allocator's caching. The measured peak at a batch of sixty-four is three point nine gigabytes, more than twice the estimate. Reset the peak counter, run one full step, and read it back.",
}
