import type { Scene } from '@graphlearning/flow'

// §6 — orientation only: a deterministic code versus a distribution over codes. The VAE objective
// (ELBO) is deferred; this names what changes and why it matters.
export const latentModels: Scene = {
  id: 'latent-models',
  title: 'Deterministic and probabilistic latents',
  flow: 'TB',
  nodes: [
    {
      id: 'two',
      label: 'What the encoder outputs',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'det',
          label: 'Autoencoder · a point',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'd-enc', label: 'Encoder', sub: 'x → z', pattern: 'network', icon: 'layers' },
            { id: 'd-z', label: 'One code z', sub: '[N, 16]', pattern: 'storage', icon: 'hash' },
            { id: 'd-dec', label: 'Decoder', sub: 'z → x̂', pattern: 'network', icon: 'layers' },
          ],
          edges: [{ source: 'd-enc', target: 'd-z' }, { source: 'd-z', target: 'd-dec' }],
        },
        {
          id: 'prob',
          label: 'Variational AE · a distribution',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'p-enc', label: 'Encoder', sub: 'x → μ, log σ²', pattern: 'network', icon: 'layers' },
            { id: 'p-z', label: 'Sample z', sub: 'μ + σ · ε', pattern: 'warn', icon: 'sigma' },
            { id: 'p-dec', label: 'Decoder', sub: 'z → x̂', pattern: 'network', icon: 'layers' },
          ],
          edges: [{ source: 'p-enc', target: 'p-z' }, { source: 'p-z', target: 'p-dec' }],
        },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'What changes',
      headers: ['', 'autoencoder', 'variational autoencoder'],
      values: [
        ['latent', 'one point per input', 'a Gaussian per input'],
        ['loss', 'reconstruction', 'reconstruction + KL to a prior'],
        ['sample new x?', 'no defined way', 'decode z drawn from the prior'],
        ['derivation', 'this chapter', 'deferred: generative models'],
      ],
    },
  ],
  edges: [{ source: 'two', target: 'compare' }],
}
