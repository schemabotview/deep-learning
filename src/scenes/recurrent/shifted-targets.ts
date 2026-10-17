import type { Scene } from '@graphlearning/flow'

// Next-token training on one fragment padded to length 6. Inputs are tokens[:-1], targets tokens[1:].
// The model's probability for each target (illustrative) gives per-position losses −ln p; the mean is
// taken over VALID positions only — computed.
const tokens = ['BOS', 'scratch', 'on', 'lid', 'EOS', 'PAD']
const input = tokens.slice(0, -1)
const target = tokens.slice(1)
const p = [0.4, 0.5, 0.3, 0.6, 0.98]
const valid: number[] = target.map((t) => (t === 'PAD' ? 0 : 1))
const loss = p.map((v) => -Math.log(v))
const masked = loss.reduce((a, l, i) => a + l * valid[i], 0) / valid.reduce((a, b) => a + b, 0)
const unmasked = loss.reduce((a, b) => a + b, 0) / loss.length

// §3 — shifted targets and the valid-length mask.
export const shiftedTargets: Scene = {
  id: 'shifted-targets',
  title: 'Predict the next token',
  flow: 'TB',
  nodes: [
    {
      id: 'shift',
      kind: 'table',
      label: 'Inputs and targets, shifted by one',
      headers: ['position', 'input', 'target', 'valid', 'p(target)', '−ln p'],
      values: input.map((t, i) => [String(i), t, target[i], String(valid[i]), p[i].toFixed(2), valid[i] ? loss[i].toFixed(3) : '— masked']),
    },
    {
      id: 'means',
      kind: 'table',
      label: 'The sequence loss',
      headers: ['mean over', 'loss'],
      values: [
        ['valid positions (4)', masked.toFixed(3)],
        ['all positions, PAD included (5)', `${unmasked.toFixed(3)} — wrong`],
      ],
    },
  ],
  edges: [{ source: 'shift', target: 'means', label: 'mask, then average' }],
}
