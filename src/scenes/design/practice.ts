import type { Scene } from '@graphlearning/flow'

// §6 — how to keep practising, and where the deferred topics live.
export const practice: Scene = {
  id: 'practice',
  title: 'Continued practice',
  flow: 'TB',
  nodes: [
    {
      id: 'habits',
      label: 'Carry the habits to an unfamiliar problem',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-shape', label: 'Trace shapes', sub: 'before running', pattern: 'service', icon: 'ruler' },
        { id: 'h-base', label: 'Baseline first', sub: 'then a network', pattern: 'service', icon: 'barchart' },
        { id: 'h-split', label: 'Split by group', sub: 'batch, machine, time', pattern: 'network', icon: 'scissors' },
        { id: 'h-mask', label: 'Check visibility', sub: 'masks, state, leaks', pattern: 'warn', icon: 'lock' },
        { id: 'h-meas', label: 'Measure', sub: 'quality with resources', pattern: 'network', icon: 'gauge' },
        { id: 'h-label', label: 'Label evidence', sub: 'train, val, test', pattern: 'warn', icon: 'tag' },
      ],
    },
    {
      id: 'next',
      kind: 'table',
      label: 'Deferred from this course, and where it lives',
      headers: ['topic', 'go to'],
      values: [
        ['derivatives, optimisation theory', 'the maths courses'],
        ['evaluation, calibration, responsible use', 'Machine Learning'],
        ['serving, monitoring, retraining', 'MLOps'],
        ['detection, segmentation, NLP pipelines', 'specialist vision / language'],
        ['VAEs, diffusion, GANs; LLM post-training', 'specialist generative models'],
        ['reinforcement learning, graph networks', 'specialist courses'],
      ],
    },
  ],
  edges: [{ source: 'habits', target: 'next', label: 'and go deeper' }],
}
