import { demo } from './demo'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
// SWAP: replace `demo` with this repo's real courses.
export const COURSES: Record<string, Course> = {
  [demo.id]: demo,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
