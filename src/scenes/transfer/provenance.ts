import type { Scene } from '@graphlearning/flow'

// §8 — what to record about a pretrained checkpoint, and a bounded choice by labelled-data budget.
export const provenance: Scene = {
  id: 'provenance',
  title: 'Provenance and bounded adaptation',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      label: 'Record with every pretrained checkpoint',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-src', label: 'Source data', sub: 'what, when, licence', pattern: 'storage', icon: 'database' },
        { id: 'r-obj', label: 'Objective', sub: 'labels or SSL signal', pattern: 'network', icon: 'circlecheck' },
        { id: 'r-pre', label: 'Preprocessing', sub: 'resize, mean, std', pattern: 'service', icon: 'ruler' },
        { id: 'r-hash', label: 'Weights hash', sub: 'exact file used', pattern: 'service', icon: 'hash' },
        { id: 'r-over', label: 'Overlap check', sub: 'against test batches', pattern: 'warn', icon: 'search' },
        { id: 'r-lic', label: 'Use terms', sub: 'allowed for this', pattern: 'warn', icon: 'scale' },
      ],
    },
    {
      id: 'choice',
      kind: 'table',
      label: 'A bounded choice, by evidence available',
      headers: ['situation', 'start with', 'move on only if'],
      values: [
        ['≈ 150 labels, close source', 'linear probe', 'validation gap justifies more'],
        ['≈ 600 labels', 'last stage + head', 'per-layer rates beat it on validation'],
        ['2,400 labels', 'full fine-tune vs scratch', 'transfer wins on the same split'],
        ['source unclear or unlicensed', 'from scratch', 'provenance is resolved'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'save_adapted.py',
      label: `torch.save({
    "state_dict": model.state_dict(),          # parameters AND BatchNorm buffers
    "source": {"weights": "resnet18 IMAGENET1K_V1", "sha256": sha, "licence": terms},
    "preprocess": {"size": 224, "mean": [0.485, 0.456, 0.406], "std": [0.229, 0.224, 0.225]},
    "adaptation": {"trained": ["layer4", "fc"], "bn_stats": "frozen", "labels": 600},
}, "defect_resnet18_adapted.pt")`,
    },
  ],
  edges: [
    { source: 'record', target: 'choice', label: 'then choose' },
    { source: 'choice', target: 'code', label: 'and save it with the weights' },
  ],
}
