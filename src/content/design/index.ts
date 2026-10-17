import type { Course } from '../types'
import { rationale } from './01-rationale'
import { configuration } from './02-configuration'
import { comparison } from './03-comparison'
import { contract } from './04-contract'
import { handoff } from './05-handoff'
import { practice } from './06-practice'

// Chapter 13 — a justified recommendation from explicit evidence, and what remains before use.
export const design: Course = {
  id: 'design',
  title: 'Integrated Neural Design and Handoff',
  sections: [rationale, configuration, comparison, contract, handoff, practice],
}
