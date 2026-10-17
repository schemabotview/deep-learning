import type { Scene } from '@graphlearning/flow'

// One training batch as tensors. Memory is COMPUTED: elements × bytes per element.
const n = 32, c = 3, h = 64, w = 64
const imageBytes = n * c * h * w * 4 // float32
const labelBytes = n * 8 // int64
const mib = (b: number) => `${(b / 2 ** 20).toFixed(2)} MiB`

// §3 — what every axis of a batch means, and what dtype and device add to the shape.
export const tensorShapes: Scene = {
  id: 'tensor-shapes',
  title: 'Shape, dtype, device',
  flow: 'TB',
  nodes: [
    {
      id: 'axes',
      kind: 'table',
      label: `images: [${n}, ${c}, ${h}, ${w}] · float32 · cuda:0`,
      headers: ['axis', 'size', 'meaning'],
      values: [
        ['0  N', String(n), 'images in the batch'],
        ['1  C', String(c), 'colour channels, RGB'],
        ['2  H', String(h), 'pixel rows'],
        ['3  W', String(w), 'pixel columns'],
      ],
    },
    {
      id: 'tensors',
      kind: 'table',
      label: 'The batch, tensor by tensor',
      headers: ['tensor', 'shape', 'dtype', 'memory'],
      values: [
        ['images', `[${n}, ${c}, ${h}, ${w}]`, 'float32', mib(imageBytes)],
        ['labels', `[${n}]`, 'int64', `${labelBytes} B`],
        ['images, float16', `[${n}, ${c}, ${h}, ${w}]`, 'float16', mib(imageBytes / 2)],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'inspect.py',
      label: `x, y = next(iter(train_loader))
print(x.shape, x.dtype, x.device)  # torch.Size([32, 3, 64, 64]) float32 cpu
x, y = x.to("cuda"), y.to("cuda")  # both must share one device
assert x.ndim == 4 and y.shape == (x.shape[0],)`,
    },
  ],
  edges: [
    { source: 'axes', target: 'tensors' },
    { source: 'tensors', target: 'code', label: 'in code' },
  ],
}
