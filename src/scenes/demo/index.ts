import type { Scene } from '@graphlearning/flow'
import { sectionParts } from './section-parts'
import { declarativeScene } from './declarative-scene'

// One bundle per course folder, spread into src/scenes/index.ts.
export const demoScenes: Scene[] = [sectionParts, declarativeScene]
