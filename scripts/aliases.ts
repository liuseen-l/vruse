import path from 'node:path'
import { fileURLToPath } from 'node:url'

const resolveEntryForPkg = p =>
  path.resolve(fileURLToPath(import.meta.url), `../../packages/${p}/index.ts`)

const entries = {
  '@vruse/vue': resolveEntryForPkg('vue'),
  '@vruse/react': resolveEntryForPkg('react'),
}

export { entries }
