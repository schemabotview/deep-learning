import type { Section } from '../types'

export const depthWidth: Section = {
  id: 'depth-width',
  title: 'Depth, width, expressivity and learnability',
  scene: 'depth-width',
  focus: 'counts',
  slide: `## Depth, width and what they buy

Width and depth both add capacity, at very different **parameter costs**.

### The counts
- One hidden layer of 256 on a 64×64 image: **3,146,755** parameters, nearly all in layer one
- Narrowing it to 32 cuts that to **393,347**
- Adding seven more 32-wide layers costs only **7,392** more

### Can represent is not will learn
- Universal approximation: one wide enough hidden layer can approximate any continuous function
- It says nothing about how **wide**, how much **data**, or whether training will find the weights
- Depth lets later layers **reuse** earlier features, often more efficiently than width
- Deep stacks bring their own training problems — chapters 4 and 6`,
  narration:
    "Capacity can be added by making layers wider or by stacking more of them, and the costs are very different. For a fully connected network on sixty-four by sixty-four colour images, the first layer dominates everything, because it connects every one of twelve thousand two hundred and eighty-eight inputs to every hidden unit. A single hidden layer of two hundred and fifty-six units costs over three million parameters. Narrowing it to thirty-two cuts that to under four hundred thousand. And stacking seven more thirty-two-wide layers on top costs only about seven thousand four hundred more, because each extra layer is only thirty-two by thirty-two. There is a famous result behind all this, the universal approximation theorem: a single hidden layer, made wide enough, can approximate any continuous function as closely as you like. It is true, and it is much less useful than it sounds. It says nothing about how wide is wide enough, which can be enormous, nothing about how much data you would need, and nothing about whether training would find those weights. In practice depth often helps because later layers can reuse and combine features computed earlier. Deep stacks have training problems of their own, which chapters four and six address.",
}
