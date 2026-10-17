import type { Section } from '../types'

export const layernorm: Section = {
  id: 'layernorm',
  title: 'Layer normalisation and axis choices',
  scene: 'layernorm',
  focus: 'compare',
  slide: `## Which axis is normalised?

Batch norm and layer norm use the same formula over **different axes** of the same tensor.

### Traced on [[1, 2, 3], [4, 6, 8]]
- **Batch norm** normalises each **feature** across the batch: every row becomes **±1.00**
- **Layer norm** normalises each **example** across its features: both rows become **[−1.22, 0, 1.22]**
- Batch norm erased the difference *between* examples; layer norm erased the scale *within* one

### Choosing
- Layer norm is **independent of batch size** and identical in train and eval
- That suits sequences and transformers, where batch statistics are awkward
- Batch norm remains common in CNNs with large batches
- **Placement** matters too: normalising before or after the residual addition changes training`,
  narration:
    "Batch norm and layer norm compute the same thing, subtract a mean and divide by a standard deviation, but over different axes, and that difference changes their behaviour completely. Take a tiny tensor of two examples with three features each: one, two, three, and four, six, eight. Batch normalisation works per feature, across the examples in the batch. Each feature column has just the two values, so each becomes minus one and plus one, and both rows come out as all minus ones and all plus ones. What is left is only which example was larger. Layer normalisation works per example, across its own features. Both rows have values evenly spaced around their own mean, so both become minus one point two two, zero, one point two two. The fact that the second example was twice as large is gone; the pattern within each example is kept. Layer norm has two practical advantages: it does not depend on the batch at all, so batch size does not matter, and it behaves identically in training and evaluation, with no running statistics to manage. That makes it the standard in sequence models and transformers. Batch norm remains common in CNNs trained with large batches. Where the normalisation sits relative to the residual addition matters as well.",
}
