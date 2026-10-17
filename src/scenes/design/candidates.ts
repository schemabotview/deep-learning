// Chapter 13's three defect predictors, as data, so every frame quotes the same numbers. Validation
// is macro-F1 over 3 seeds on the batch-grouped split (chapters 1, 5, 10); test is the single
// final-test run; station C is a held-out new station. Illustrative but mutually consistent.
export const candidates = [
  { id: 'dense', name: 'MLP on pixels', params: 393_347, val: [0.69, 0.68, 0.7], test: 0.67, stationC: 0.52, dentRecall: 0.48, cpuMs: 0.3, trainGB: 0.4 },
  { id: 'cnn', name: 'small CNN', params: 23_779, val: [0.86, 0.85, 0.87], test: 0.85, stationC: 0.71, dentRecall: 0.74, cpuMs: 1.9, trainGB: 0.6 },
  { id: 'transfer', name: 'ResNet-18, fine-tuned', params: 11_178_051, val: [0.93, 0.92, 0.94], test: 0.91, stationC: 0.83, dentRecall: 0.86, cpuMs: 28, trainGB: 2.3 },
]
export const baseline = { name: 'hand features + logistic', params: 39, val: 0.71, test: 0.7, stationC: 0.6 }
export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
export const spread = (xs: number[]) => (Math.max(...xs) - Math.min(...xs)) / 2
export const n = (v: number) => v.toLocaleString('en-GB')
export const budget = { cpuMs: 50, labelCeiling: 0.92 }
