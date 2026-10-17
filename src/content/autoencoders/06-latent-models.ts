import type { Section } from '../types'

export const latentModels: Section = {
  id: 'latent-models',
  title: 'Deterministic versus probabilistic latent-model orientation',
  scene: 'latent-models',
  focus: 'two',
  slide: `## Points and distributions

The autoencoders so far map each input to **one point** z. A probabilistic model maps it to a **distribution** over codes instead.

### Deterministic autoencoder
- The encoder outputs z directly; the loss is reconstruction only
- Gaps between codes mean nothing
- No defined way to **sample** a new input

### Variational autoencoder, in outline
- The encoder outputs a mean **μ** and a log-variance **log σ²**
- z = μ + σ · ε keeps sampling **differentiable**
- The loss adds a **KL** term pulling each code distribution towards a prior
- Decoding z drawn from the prior **generates** new inputs

### Scope
- The VAE objective (the ELBO) and generative models are **deferred**`,
  narration:
    "Every autoencoder in this chapter so far maps each input to a single point, its code z. A probabilistic latent model maps each input to a distribution over codes instead, and that small change has large consequences. In a deterministic autoencoder the encoder outputs the code directly, and the loss is reconstruction alone. Codes can end up anywhere in the latent space, so the gaps between them mean nothing, and there is no defined way to sample a new input: a random code may decode to nonsense. A variational autoencoder, in outline, has an encoder that outputs a mean and a log variance for each code dimension. The code is sampled as the mean plus the standard deviation times standard normal noise, which keeps the sampling step differentiable. The loss adds a second term, a KL divergence, which pulls each input's code distribution towards a simple prior, usually a standard normal. Because codes are packed around that prior, decoding a code drawn from the prior produces a plausible new input, so the model can generate. This course stops at that orientation. The full objective, the evidence lower bound, and the wider family of generative models belong to a specialist course. What matters here is recognising which kind of latent a model has, and what it does and does not let you do.",
}
