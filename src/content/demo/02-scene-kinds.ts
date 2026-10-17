import type { Section } from '../types'

// The second demo section, showing the other scene shape: a code card beside a container of leaves.
export const sceneKinds: Section = {
  id: 'scene-kinds',
  title: 'Scenes are declarative',
  scene: 'declarative-scene',
  slide: `## Scenes are declarative

A scene lists **nodes, edges and nesting**. The layout engine computes every position and size.

### Never write x or y
- The engine is \`@graphlearning/flow\`, consumed as a pinned package
- Layout internals are **withheld** from the barrel, so no repo can hand-compute
- Deterministic layout is what makes screenshots **reproducible**

### What goes on the left
- A **react-flow diagram** — nodes, edges, containers
- Or a **code card** — \`kind: 'code'\`, sized from a measured glyph advance
- A scene is content-agnostic and can be **shared** across sections`,
  narration:
    "Here is the part that is easy to get wrong. A scene is a declaration, not a drawing. You list the nodes, you list the edges, you say which nodes nest inside which containers, and then the layout engine decides every coordinate and every size. You never write an x or a y, and in fact you cannot: the engine's layout internals are not exported, so there is no way to reach past it. That sounds like a restriction, and it is, but it buys the thing the whole pipeline depends on. The same scene renders identically every single time, which means a screenshot taken today matches one taken next month, and a video can be recorded and re-recorded without the frames shifting underneath it. The left pane has two shapes available to it. Most of the time it is a diagram. When the point being made is about code, it is a code card instead, sized from a measured glyph advance in the monospace face the engine is calibrated to.",
}
