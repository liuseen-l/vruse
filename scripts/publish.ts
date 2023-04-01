import path from 'node:path'
import assert from 'node:assert'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import execa from 'execa'
import { packages } from '../meta/packages'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rootDir = path.resolve(__dirname, '..')

assert(process.cwd() !== __dirname)

async function toggleUpdatePackageJSON(toReplace: boolean) {
  for (const { name, packageName, dir } of packages) {
    const packageDir = dir ? dir.split('/')[0] : 'packages'
    const packageRoot = path.resolve(rootDir, packageDir, name)

    const packageJSON = await fs.readJSON(
      path.join(packageRoot, 'package.json'),
    )

    if (packageName.startsWith('@vruse/')) {
      packageJSON.main = toReplace ? './dist/index.cjs' : 'index.ts'
      packageJSON.module = toReplace ? './dist/index.mjs' : 'index.ts'
    }

    for (const key of Object.keys(packageJSON.dependencies || {})) {
      if (key.startsWith('@vruse/') && !toReplace)
        packageJSON.dependencies[key] = 'workspace:*'
    }

    await fs.writeJSON(path.join(packageRoot, 'package.json'), packageJSON, {
      spaces: 2,
    })
  }
}

async function publish() {
  await toggleUpdatePackageJSON(true)

  await execa('pnpm run build', { stdio: 'inherit' })

  await execa('lerna publish --exact --force-publish --yes --no-git-tag-version --no-git-reset --no-push', { stdio: 'inherit' })

  await toggleUpdatePackageJSON(false)
}

publish()
