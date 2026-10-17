import type { Course } from '../types'
import { whatASectionIs } from './01-what-a-section-is'
import { sceneKinds } from './02-scene-kinds'

// The template's one demo course. It exists so `npm run dev`, `npm run build` and `npm run check`
// all pass on a fresh clone and the first real section has a working shape to copy. Delete the whole
// folder once this repo has a course of its own.
export const demo: Course = {
  id: 'demo',
  title: 'How a section is built',
  sections: [whatASectionIs, sceneKinds],
}
