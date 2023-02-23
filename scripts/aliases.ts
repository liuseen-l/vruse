// these aliases are shared between vitest and rollup
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const resolveEntryForPkg = (p) =>
  path.resolve(fileURLToPath(import.meta.url), `../../packages/${p}/index.ts`)

const entries = {
  '@vruse/core': resolveEntryForPkg('core'),
  '@vruse/shared': resolveEntryForPkg('shared'),
}

export { entries }
