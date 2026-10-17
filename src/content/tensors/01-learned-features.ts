import type { Section } from '../types'

export const learnedFeatures: Section = {
  id: 'learned-features',
  title: 'Parameterised functions and learned features',
  scene: 'learned-features',
  focus: 'routes',
  slide: `## Learned features

A neural network is a **parameterised function** f(x; θ) whose intermediate features are learned along with the output.

### Two routes from an image to a class
- **Classical**: you design features — edge counts, brightness — and a model learns their weights
- **Neural**: hidden layers turn raw pixels into features, and training sets **every** parameter
- The hidden layer is a **representation**: a learned re-description of the input

### What the parameters are
- Every weight and bias in every layer is part of θ
- The tiny classifier has **393,347** parameters, almost all in its first layer
- More parameters mean more to learn from data — not automatically a better model
- Whether learned features beat designed ones is an **empirical** question`,
  narration:
    "Every model in this course is a parameterised function: it takes an input, here a photograph of a part from the workshop's inspection station, and maps it to an output, here scores for three classes, ok, scratch and dent. What distinguishes a neural network is where its features come from. In the classical route, a person designs the features: count the edges, measure the brightness, describe the texture, and then a model such as logistic regression learns how much weight to give each one. In the neural route, the features themselves are parameters. A hidden layer takes the raw pixels and computes its own description of the image, and training adjusts that layer at the same time as the output layer. That hidden description is called a representation, and learning good representations is the central idea of deep learning. The code shows the tiny classifier we will use: flatten the image to twelve thousand two hundred and eighty-eight numbers, map them to thirty-two hidden features, then to three class scores. That is three hundred and ninety-three thousand three hundred and forty-seven parameters, nearly all in the first layer. More parameters are more to learn, not a promise of a better model.",
}
