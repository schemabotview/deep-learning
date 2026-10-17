import type { Section } from '../types'

export const receptiveField: Section = {
  id: 'receptive-field',
  title: 'Stride, padding, dilation and receptive fields',
  scene: 'receptive-field',
  focus: 'rf',
  slide: `## Stride, padding and receptive fields

Three settings control a convolution's output size, and together with depth they set how much of the image each unit **sees**.

### The output-size formula
- out = ⌊(H + 2p − d(k − 1) − 1) / s⌋ + 1
- 3×3 with **padding 1**: 64 stays 64; with no padding it shrinks to **62**
- **Stride 2** halves it to **32**; **dilation 2** spreads the filter over a 5×5 area

### Receptive field
- Each layer widens what a unit depends on, and strides multiply the growth
- In the small CNN: **3** pixels after conv1, **8** after conv2, **18** after conv3
- A dent wider than 18 pixels is never seen whole by one conv3 unit
- Global pooling then combines every position — but only from 18-pixel views`,
  narration:
    "Three settings control the size of a convolution's output: padding, stride and dilation, and the formula in the table combines them with the filter size. A three-by-three filter with one pixel of padding keeps a sixty-four-pixel input at sixty-four. Without padding the output shrinks to sixty-two, because the filter cannot be centred on the border pixels. A stride of two moves the filter two pixels at a time and halves the output to thirty-two. Dilation spaces the filter's taps apart, so a three-by-three filter with dilation two covers a five-by-five area while keeping nine weights. These settings, together with depth, determine the receptive field: the patch of the input image that a unit in a given layer depends on. Each convolution widens it by the filter size minus one, multiplied by the product of all earlier strides, so pooling and striding make later layers grow it much faster. In our small CNN, a unit after the first convolution sees three pixels, after the second eight, and after the third eighteen. That is a design constraint: a dent wider than eighteen pixels is never seen whole by any single unit of the last convolution, and global pooling can only combine those partial views.",
}
