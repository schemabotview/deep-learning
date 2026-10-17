import type { Section } from '../types'

export const channelsParams: Section = {
  id: 'channels-params',
  title: 'Channels, filters, parameters and shapes',
  scene: 'channels-params',
  focus: 'layers',
  slide: `## Channels, filters and parameters

Real layers have many filters, and each filter spans **every input channel**.

### Counting
- A conv layer with C_in → C_out channels and k×k filters has C_out × C_in × k × k weights, plus C_out biases
- conv1: 16 × 3 × 3 × 3 + 16 = **448**; conv2 **4,640**; conv3 **18,496**
- The whole CNN: **23,779** parameters — against **393,248** in the MLP's first layer alone

### Shapes through the network
- Padding 1 keeps 64×64; each 2×2 pool halves it: 64 → 32 → 16
- Channels grow as resolution shrinks: 16 → 32 → 64
- **Global average pooling** turns [N, 64, 16, 16] into [N, 64], independent of image size
- Output channels are **feature maps**: one per learned filter`,
  narration:
    "A real convolutional layer has many filters, and each filter is three-dimensional: it spans every channel of its input. The first layer of our defect CNN takes three colour channels and produces sixteen feature maps, so it has sixteen filters, each three channels by three by three, which is four hundred and thirty-two weights, plus sixteen biases: four hundred and forty-eight parameters. The second layer maps sixteen channels to thirty-two, four thousand six hundred and forty parameters; the third maps thirty-two to sixty-four, eighteen thousand four hundred and ninety-six. With the small linear head, the whole network has twenty-three thousand seven hundred and seventy-nine parameters, which is under a sixteenth of the MLP's first layer on its own. The table also tracks shapes. Padding of one pixel keeps each convolution's output at the same size as its input, and each two-by-two max pool halves the height and width, from sixty-four to thirty-two to sixteen. Meanwhile the number of channels grows, a common pattern: less spatial detail, more kinds of feature. At the end, global average pooling averages each of the sixty-four feature maps to a single number, so the head sees a fixed-length vector whatever the image size.",
}
