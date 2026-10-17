import type { Scene, PlotPoint } from '@graphlearning/flow'
import { data, pcaDir, decDir, angleDiffDeg, pcaMSE, aeMSE, enc, dec, normEnc, normDec } from './numbers'

// §2 — a linear 2→1→2 autoencoder trained by gradient descent on centred 2-D data finds PCA's first
// subspace, but not PCA's basis: encoder and decoder norms trade off freely. COMPUTED.
const line = (d: number[], t = 3.4): [PlotPoint, PlotPoint] => [[-t * d[0], -t * d[1]], [t * d[0], t * d[1]]]
const [p0, p1] = line(pcaDir)
const [a0, a1] = line(decDir, 2.6)
const v = (a: number[]) => `[${a.map((t) => t.toFixed(3)).join(', ')}]`

export const pca: Scene = {
  id: 'ae-pca',
  title: 'Linear autoencoder and PCA',
  flow: 'TB',
  nodes: [
    {
      id: 'plot',
      kind: 'plot',
      label: '80 centred points, PCA axis and AE decoder direction',
      sub: `directions differ by ${angleDiffDeg.toFixed(2)}°`,
      plot: {
        x: { min: -3.5, max: 3.5, step: 1, label: 'feature 1' },
        y: { min: -2, max: 2, step: 1, label: 'feature 2' },
        axes: 'corner',
        series: [
          { kind: 'scatter', points: data.map((p) => [p[0], p[1]] as PlotPoint), color: '#6b7280', size: 4 },
          { kind: 'segment', from: p0, to: p1, color: 'service', label: 'PCA 1st component', labelAt: [1.2, 1.75] },
          { kind: 'segment', from: a0, to: a1, color: 'warn', dashed: true, label: 'AE decoder', labelAt: [-3.2, -1.75] },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Same subspace, different parameters',
      headers: ['', 'PCA', 'linear AE (gradient descent)'],
      values: [
        ['direction', v(pcaDir), v(decDir)],
        ['reconstruction MSE', pcaMSE.toFixed(4), aeMSE.toFixed(4)],
        ['encoder weights', v(pcaDir), `${v(enc)}, norm ${normEnc.toFixed(2)}`],
        ['decoder weights', v(pcaDir), `${v(dec)}, norm ${normDec.toFixed(2)}`],
        ['basis', 'orthonormal, ordered', `any rescaling: ${normEnc.toFixed(2)} × ${normDec.toFixed(2)} = ${(normEnc * normDec).toFixed(2)}`],
      ],
    },
  ],
  edges: [{ source: 'plot', target: 'compare', label: 'the numbers' }],
}
