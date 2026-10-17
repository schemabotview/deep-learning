import type { Scene } from '@graphlearning/flow'

// §4 — what must travel with the weights so that inference reproduces validation, for the image
// model and for the two other recurring models.
export const contract: Scene = {
  id: 'contract',
  title: 'Checkpoint, preprocessing and inference-state contract',
  flow: 'TB',
  nodes: [
    {
      id: 'items',
      kind: 'table',
      label: 'The inference contract',
      headers: ['item', 'image model', 'if it is wrong'],
      values: [
        ['weights', 'state_dict incl. BatchNorm buffers, sha256', 'a different model'],
        ['mode', 'model.eval(): dropout off, running stats', 'noisy, batch-dependent output'],
        ['preprocessing', 'resize 224, mean/std from the checkpoint', 'every feature shifts'],
        ['class order', '0 ok, 1 scratch, 2 dent', 'labels silently swapped'],
        ['dtype', 'bf16 autocast, validated against fp32', 'unchecked numerics'],
      ],
    },
    {
      id: 'others',
      label: 'The same contract for the other models',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-tok', label: 'Tokeniser', sub: 'vocab file, PAD 0, UNK 1', pattern: 'storage', icon: 'tag' },
        { id: 'o-state', label: 'Sensor state', sub: 'reset per machine', pattern: 'warn', icon: 'repeat' },
        { id: 'o-mask', label: 'Masks', sub: 'causal + padding', pattern: 'network', icon: 'lock' },
        { id: 'o-ver', label: 'Version all', sub: 'one manifest file', pattern: 'service', icon: 'hash' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'predict.py',
      label: `ckpt = torch.load("defect_resnet18_v3.pt", weights_only=True)
assert sha256(ckpt["state_dict"]) == ckpt["sha256"]
model.load_state_dict(ckpt["state_dict"]); model.eval()
x = preprocess(img, **ckpt["preprocess"])                 # the checkpoint's own mean/std
with torch.no_grad(), torch.autocast("cpu", dtype=torch.bfloat16):
    label = ckpt["classes"][model(x[None]).argmax(1).item()]`,
    },
  ],
  edges: [
    { source: 'items', target: 'others' },
    { source: 'others', target: 'code', label: 'enforced at load' },
  ],
}
