import type { Section } from '../types'

export const pooling: Section = {
  id: 'pooling',
  title: 'Pooling, downsampling and invariance limits',
  scene: 'pooling',
  focus: 'pooled',
  slide: `## Pooling and its limits

Max-pooling keeps the strongest response in each window: it **downsamples** and adds a little tolerance to position.

### Traced
- 2×2 max-pooling with stride 2 turns a 4×4 map into 2×2: **[8, 0 / 0, 3]**
- Shift the map **one pixel** right: the 8 stays in its window, but the 3 moves out of the map
- The pooled output becomes **[0, 8 / 0, 0]**: not the same

### What this means
- Convolution is shift-**equivariant**: shift the input, the feature map shifts too
- Pooling makes small shifts *within* a window invisible — that is all
- Strides, borders and padding break exact **invariance**
- So a defect classifier still needs varied positions in its **training** data`,
  narration:
    "Pooling summarises each small window of a feature map with a single number, most often its maximum. Two-by-two max pooling with a stride of two turns a four-by-four feature map into two-by-two, keeping the strongest response in each quarter: here eight in the top-left window, nothing in two others, and three in the bottom-right. It halves the resolution and adds a little tolerance to position. Now shift the same feature map one pixel to the right. The eight moves within its window, or into the neighbouring one, and the three at the right edge falls off the map entirely. The pooled output becomes zero and eight on the top row and nothing below: a different result for an input that differs by one pixel. This is worth being precise about. A convolution is shift-equivariant: shift the input and its output shifts by the same amount, at least away from the borders. Pooling only makes small shifts within a window invisible. Strides, borders and padding all break exact invariance, so convolutional networks are less translation-invariant than they are often described. The practical consequence is that a defect classifier still needs training images with defects in varied positions.",
}
