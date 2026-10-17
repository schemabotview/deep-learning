import type { Section } from '../types'

export const tensorShapes: Section = {
  id: 'tensor-shapes',
  title: 'Tensor axes, shapes, dtypes and devices',
  scene: 'tensor-shapes',
  focus: 'axes',
  slide: `## Tensors: shape, dtype, device

A **tensor** is a multidimensional array; three facts describe it completely enough to reason about.

### Shape: what each axis means
- A batch of images is **[N, C, H, W]**: images, channels, rows, columns
- [32, 3, 64, 64] holds **393,216** numbers; labels are just [32]
- An axis has a **meaning**, not only a size — write it down
- Other libraries put channels **last**: [N, H, W, C]

### Dtype and device
- **float32** uses 4 bytes per element: this batch is **1.50 MiB**; float16 halves it
- Class labels are **int64** indices, not floats
- **Device** says where the data lives; every tensor in one operation must share it
- Moving data between CPU and GPU costs time: chapter 12 measures it`,
  narration:
    "Neural computation is written in tensors, which here simply means multidimensional arrays of numbers. Three facts describe a tensor well enough to reason about it. The first is its shape, the size of each axis. A batch of thirty-two colour images, sixty-four pixels square, is a tensor of shape thirty-two, three, sixty-four, sixty-four, and the axes mean, in order, which image, which colour channel, which row and which column. That ordering, often written N C H W, is a convention, and other libraries put the channels last, so an axis's meaning is something to write down, not assume. The batch holds three hundred and ninety-three thousand two hundred and sixteen numbers, while its labels are a single axis of thirty-two class indices. The second fact is the dtype. Thirty-two-bit floats take four bytes each, so this batch is about one and a half mebibytes, and sixteen-bit floats would halve that. Labels for classification are sixty-four-bit integers, indices rather than numbers to average. The third fact is the device: whether the tensor lives in CPU memory or on a GPU. Every tensor in one operation must be on the same device, and moving between them takes time.",
}
