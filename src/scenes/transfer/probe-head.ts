import type { Scene } from '@graphlearning/flow'
import { resnet, encoderParams, headParams, n, general } from './numbers'

// §2 — a frozen ResNet-18 encoder as a feature extractor; replace its 1,000-way head with a 3-way
// one. Trainable counts COMPUTED; validation scores illustrative (600 labelled images).
export const probeHead: Scene = {
  id: 'probe-head',
  title: 'Frozen features, probes, new heads',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'Frozen encoder, new head',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-img', label: 'Defect image', sub: '[N, 3, 224, 224]', pattern: 'storage', icon: 'scanface' },
        { id: 'p-enc', label: 'ResNet-18 body', sub: `${n(encoderParams)} frozen`, pattern: 'external', icon: 'lock' },
        { id: 'p-head', label: 'New 3-way head', sub: `${n(headParams)} trained`, pattern: 'service', icon: 'pencil' },
      ],
    },
    {
      id: 'options',
      kind: 'table',
      label: 'Trainable parameters, 600 labelled images · validation',
      headers: ['strategy', 'trains', 'trainable', 'macro-F1'],
      values: [
        ['linear probe', 'head only', n(headParams), '0.74'],
        ['MLP head', '512 → 128 → 3', n(512 * 128 + 128 + 128 * 3 + 3), '0.76'],
        ['last stage + head', 'layer4 + head', n(resnet.layer4 + headParams), '0.83'],
        ['full fine-tune', 'everything', n(encoderParams + headParams), general(600).toFixed(2)],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'probe.py',
      label: `model = torchvision.models.resnet18(weights="IMAGENET1K_V1")
for p in model.parameters():
    p.requires_grad = False                 # freeze the body
model.fc = nn.Linear(512, 3)                # new head: trainable by default
opt = torch.optim.AdamW(model.fc.parameters(), lr=1e-3)`,
    },
  ],
  edges: [
    { source: 'path', target: 'options', label: 'how much to train' },
    { source: 'options', target: 'code', label: 'the probe' },
  ],
}
