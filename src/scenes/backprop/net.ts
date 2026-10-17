// The chapter's two-layer network, traced exactly (shared by several scenes):
//   z1 = W1 x + b1,  h = relu(z1),  y = W2 · h + b2,  L = ½ (y − t)²
// Biases are chosen so no pre-activation sits on the ReLU kink at 0.
export const x = [1, 2]
export const t = 1
export const W1 = [
  [0.5, -0.3],
  [0.2, 0.4],
]
export const b1 = [0.2, -0.1]
export const W2 = [0.7, -0.5]
export const b2 = 0.2

export function forward(w1 = W1, bb1 = b1, w2 = W2, bb2 = b2) {
  const z1 = w1.map((row, i) => row[0] * x[0] + row[1] * x[1] + bb1[i])
  const h = z1.map((v) => Math.max(0, v))
  const y = w2[0] * h[0] + w2[1] * h[1] + bb2
  const L = 0.5 * (y - t) ** 2
  return { z1, h, y, L }
}

export function backward() {
  const { z1, h, y } = forward()
  const dy = y - t
  const dW2 = h.map((v) => dy * v)
  const db2 = dy
  const dh = W2.map((w) => dy * w)
  const dz1 = dh.map((g, i) => (z1[i] > 0 ? g : 0))
  const dW1 = dz1.map((g) => x.map((xi) => g * xi))
  const db1 = dz1
  return { dy, dW2, db2, dh, dz1, dW1, db1 }
}

/** Central finite difference of L with respect to one parameter, nudged by ε. */
export function finiteDiff(which: 'W1' | 'b1' | 'W2' | 'b2', i: number, j = 0, eps = 1e-4) {
  const nudge = (s: number) => {
    const w1 = W1.map((r) => [...r])
    const bb1 = [...b1]
    const w2 = [...W2]
    let bb2 = b2
    if (which === 'W1') w1[i][j] += s
    if (which === 'b1') bb1[i] += s
    if (which === 'W2') w2[i] += s
    if (which === 'b2') bb2 += s
    return forward(w1, bb1, w2, bb2).L
  }
  return (nudge(eps) - nudge(-eps)) / (2 * eps)
}
