// The chapter's small defect CNN, as data, so shapes, parameters, MACs and receptive fields are
// COMPUTED in one place. Input 3×64×64; three 3×3 convs (padding 1) with 2×2 max-pools between,
// global average pooling, and a linear head to 3 classes.
export type Layer = { name: string; kind: 'conv' | 'pool' | 'gap' | 'linear'; cin: number; cout: number; k: number; s: number; p: number }
export const layers: Layer[] = [
  { name: 'conv1', kind: 'conv', cin: 3, cout: 16, k: 3, s: 1, p: 1 },
  { name: 'pool1', kind: 'pool', cin: 16, cout: 16, k: 2, s: 2, p: 0 },
  { name: 'conv2', kind: 'conv', cin: 16, cout: 32, k: 3, s: 1, p: 1 },
  { name: 'pool2', kind: 'pool', cin: 32, cout: 32, k: 2, s: 2, p: 0 },
  { name: 'conv3', kind: 'conv', cin: 32, cout: 64, k: 3, s: 1, p: 1 },
  { name: 'gap', kind: 'gap', cin: 64, cout: 64, k: 0, s: 1, p: 0 },
  { name: 'head', kind: 'linear', cin: 64, cout: 3, k: 0, s: 1, p: 0 },
]
export const outSize = (h: number, k: number, s: number, p: number, d = 1) => Math.floor((h + 2 * p - d * (k - 1) - 1) / s) + 1

export function trace(h0 = 64) {
  let h = h0
  let rf = 1
  let jump = 1
  return layers.map((l) => {
    let params = 0
    let macs = 0
    if (l.kind === 'conv') {
      h = outSize(h, l.k, l.s, l.p)
      params = l.cin * l.cout * l.k * l.k + l.cout
      macs = h * h * l.cout * l.cin * l.k * l.k
      rf += (l.k - 1) * jump
      jump *= l.s
    } else if (l.kind === 'pool') {
      h = outSize(h, l.k, l.s, l.p)
      rf += (l.k - 1) * jump
      jump *= l.s
    } else if (l.kind === 'gap') {
      h = 1
    } else {
      params = l.cin * l.cout + l.cout
      macs = l.cin * l.cout
    }
    const shape = l.kind === 'linear' ? `[N, ${l.cout}]` : l.kind === 'gap' ? `[N, ${l.cout}]` : `[N, ${l.cout}, ${h}, ${h}]`
    return { ...l, h, shape, params, macs, rf: l.kind === 'gap' || l.kind === 'linear' ? 'whole image' : String(rf) }
  })
}
export const fmt = (n: number) => n.toLocaleString('en-GB')
