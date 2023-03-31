import path from 'node:path'
import assert from 'node:assert'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { packages } from '../meta/packages'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rootDir = path.resolve(__dirname, '..')

const toReplace = process.env.NODE_ENV === 'REPLACE_PRE'

assert(process.cwd() !== __dirname)

async function buildMetaFiles() {
  for (const { name, dir } of packages) {
    const packageDir = dir ? dir.split('/')[0] : 'packages'
    const packageRoot = path.resolve(rootDir, packageDir, name)

    const packageJSON = await fs.readJSON(
      path.join(packageRoot, 'package.json'),
    )

    for (const key of Object.keys(packageJSON.dependencies || {})) {
      if (key.startsWith('@vruse/'))
        packageJSON.main = toReplace ? './dist/index.cjs' : 'index.ts'
    }

    await fs.writeJSON(path.join(packageRoot, 'package.json'), packageJSON, {
      spaces: 2,
    })
  }
}

buildMetaFiles()
