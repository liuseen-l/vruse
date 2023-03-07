import fs from 'fs-extra'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { packages } from '../meta/packages'
import { version } from '../package.json'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const DIR_SRC = resolve(__dirname, '../packages')

export async function updatePackageJSON() {
  for (const { name, description, author, iife, dir } of packages) {
    const packageDir = dir ? resolve(__dirname, '..', dir) : join(DIR_SRC, name)

    const packageJSONPath = join(packageDir, 'package.pro.json')
    const packageJSON = await fs.readJSON(packageJSONPath)

    packageJSON.version = version
    packageJSON.description = description || packageJSON.description
    packageJSON.author = author || 'LiuSeen<https://github.com/code-ManL>'
    packageJSON.bugs = {
      url: 'https://github.com/code-ManL/VRuse/issues',
    }
    packageJSON.homepage = 'https://github.com/code-ManL/VRus'
    packageJSON.repository = {
      type: 'git',
      url: 'git+https://github.com/code-ManL/VRuse',
      directory: `packages/${name}`,
    }
    packageJSON.main = './index.cjs'
    packageJSON.types = './index.d.ts'
    packageJSON.module = './index.mjs'
    if (iife !== false) {
      packageJSON.unpkg = './index.iife.min.js'
      packageJSON.jsdelivr = './index.iife.min.js'
    }
    packageJSON.exports = {
      '.': {
        import: './index.mjs',
        require: './index.cjs',
        types: './index.d.ts',
      },
      './*': './*',
      ...packageJSON.exports,
    }

    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
  }
}
