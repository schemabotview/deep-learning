import type { Scene } from '@graphlearning/flow'

// §2 — what a sequence model may see depends on the task and on what exists at prediction time.
export const sequenceTasks: Scene = {
  id: 'sequence-tasks',
  title: 'What may the model see?',
  flow: 'TB',
  padding: 0.08, // wide board: let it reach the pane
  nodes: [
    {
      id: 'tasks',
      kind: 'table',
      label: 'Sequence tasks and their visibility contract',
      headers: ['task', 'example', 'output', 'may use future steps?'],
      values: [
        ['sequence classification', 'whole inspector note', 'one label', 'yes: note is complete'],
        ['causal forecasting', 'sensor history to t', 'value at t + 1', 'no: not yet observed'],
        ['tagging', 'label each word', 'one per step', 'yes, if text is complete'],
        ['generation', 'continue a note', 'next token, repeatedly', 'no: written left to right'],
      ],
    },
    {
      id: 'boundaries',
      label: 'Boundaries for the sensor task',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-time', label: 'Cut by time', sub: 'train past, test later', pattern: 'service', icon: 'calendar' },
        { id: 'b-machine', label: 'Cut by machine', sub: 'if claims cover new ones', pattern: 'network', icon: 'cpu' },
        { id: 'b-window', label: 'Windows', sub: 'never straddle the cut', pattern: 'warn', icon: 'scissors' },
        { id: 'b-lag', label: 'Arrival lag', sub: 'readings land late', pattern: 'external', icon: 'clock' },
        { id: 'b-future', label: 'Future features', sub: 'computed after t: drop', pattern: 'warn', icon: 'ban' },
        { id: 'b-scale', label: 'Scaling stats', sub: 'from training months', pattern: 'user', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'tasks', target: 'boundaries' }],
}
