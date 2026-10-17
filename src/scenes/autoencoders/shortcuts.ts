import type { Scene } from '@graphlearning/flow'

// §3 — what stops an autoencoder from copying its input. Scores are illustrative validation
// evidence: reconstruction MSE on clean windows, and a linear probe on z for the fault label.
export const shortcuts: Scene = {
  id: 'shortcuts',
  title: 'Denoising, sparsity, and copying',
  flow: 'TB',
  nodes: [
    {
      id: 'variants',
      kind: 'table',
      label: 'Sensor-window autoencoders · validation (illustrative)',
      headers: ['variant', 'z width', 'what blocks copying', 'recon MSE', 'probe F1 on z'],
      values: [
        ['undercomplete', '16', 'the narrow bottleneck', '0.018', '0.71'],
        ['overcomplete, plain', '960', 'nothing', '0.0003', '0.55'],
        ['overcomplete + L1 on z', '960', 'few active units', '0.012', '0.73'],
        ['denoising, σ = 0.2', '960', 'noisy in, clean target', '0.015', '0.76'],
      ],
    },
    {
      id: 'ideas',
      label: 'Making reconstruction non-trivial',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'i-copy', label: 'Copying', sub: 'identity map, MSE ≈ 0', pattern: 'warn', icon: 'copy' },
        { id: 'i-narrow', label: 'Bottleneck', sub: 'fewer numbers than x', pattern: 'service', icon: 'scissors' },
        { id: 'i-sparse', label: 'Sparsity', sub: 'penalty on |z|', pattern: 'service', icon: 'sigma' },
        { id: 'i-noise', label: 'Denoising', sub: 'corrupt, then restore', pattern: 'service', icon: 'waves' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'denoise.py',
      label: `noisy = window + 0.2 * torch.randn_like(window)   # corrupt the input only
z = enc(noisy)
loss = F.mse_loss(dec(z), window) + 1e-3 * z.abs().mean()   # clean target, + optional L1`,
    },
  ],
  edges: [
    { source: 'variants', target: 'ideas', label: 'why the plain one fails' },
    { source: 'ideas', target: 'code' },
  ],
}
