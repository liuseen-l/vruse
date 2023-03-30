import fs from 'fs-extra'
import fg from 'fast-glob'
import Git from 'simple-git'
import matter from 'gray-matter'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { getCategories } from '../utils'
import { packages } from '../../../meta/packages'
import { join, relative, resolve, dirname } from 'node:path'

import type { PackageIndexes, VRuseFunction, VRusePackage } from '../types'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const DOCS_URL = 'https://vruse.org'
export const DIR_PACKAGE = resolve(__dirname, '..')
export const DIR_ROOT = resolve(__dirname, '../../..')
export const DIR_SRC = resolve(DIR_ROOT, 'packages')
// export const DIR_TYPES = resolve(DIR_ROOT, 'types/packages')

export const git = Git(DIR_ROOT)

export async function listHooks(dir: string, ignore: string[] = []) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['_*', 'dist', 'node_modules', ...ignore],
  })
  files.sort()
  return files
}

export async function readMetadata() {
  const indexes: PackageIndexes = {
    packages: {},
    categories: [],
    functions: [],
  }

  for (const info of packages) {
    if (info.utils) continue

    // packageDir
    const dir = info.dir
      ? resolve(DIR_ROOT, info.dir)
      : join(DIR_SRC, info.name)

    // hook dir
    const hooks = await listHooks(dir)

    const pkg: VRusePackage = {
      ...info,
      dir: relative(DIR_ROOT, dir).replace(/\\/g, '/'),
      docs: info.addon ? `${DOCS_URL}/${info.name}/README.html` : undefined,
    }

    // push package info
    indexes.packages[info.name] = pkg

    await Promise.all(
      hooks.map(async (fnName) => {
        // hook md path
        const mdPath = join(dir, fnName, 'index.md')

        // hook code path
        const tsPath = join(dir, fnName, 'index.ts')

        // make directory
        if (['vue', 'react', 'shared'].includes(pkg.name)) {
          const dirPath = resolve(DIR_ROOT, 'docs', pkg.name)
          const hookDir = resolve(dirPath, fnName)
          await mkdir(hookDir,{
            recursive:true
          })
          await fs.copyFile(mdPath, join(hookDir, 'index.md'))
<<<<<<< HEAD
=======

>>>>>>> dev
        }

        // hook info
        const fn: VRuseFunction = {
          name: fnName,
          package: pkg.name,
          lastUpdated:
            +(await git.raw(['log', '-1', '--format=%at', tsPath])) * 1000,
        }

        if (fs.existsSync(join(dir, fnName, 'component.ts')))
          fn.component = true
        if (fs.existsSync(join(dir, fnName, 'directive.ts')))
          fn.directive = true
        if (!fs.existsSync(mdPath)) {
          fn.internal = true
          indexes.functions.push(fn)
          return
        }

        fn.docs = `${DOCS_URL}/${pkg.name}/${fnName}/`

        const mdRaw = await fs.readFile(mdPath, 'utf-8')

        const { content: md, data: frontmatter } = matter(mdRaw)
        const category = frontmatter.category

        let alias = frontmatter.alias
        if (typeof alias === 'string')
          alias = alias
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)

        let related = frontmatter.related
        if (typeof related === 'string')
          related = related
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        else if (Array.isArray(related))
          related = related.map((s) => s.trim()).filter(Boolean)

        let description =
          (md
            .replace(/\r\n/g, '\n')
            .match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || ''

        description = description.trim()
        description = description.charAt(0).toLowerCase() + description.slice(1)

        fn.category = ['vue', 'shared', 'react'].includes(pkg.name)
          ? category
          : `@${pkg.display}`
        fn.description = description

        if (description.includes('DEPRECATED') || frontmatter.deprecated)
          fn.deprecated = true

        if (alias?.length) fn.alias = alias

        if (related?.length) fn.related = related

        if (pkg.submodules) fn.importPath = `${pkg.name}/${fn.name}`

        indexes.functions.push(fn)
      }),
    )
  }

  indexes.functions.sort((a, b) => a.name.localeCompare(b.name))
  indexes.categories = getCategories(indexes.functions)

  // interop related
  indexes.functions.forEach((fn) => {
    if (!fn.related) return

    fn.related.forEach((name) => {
      const target = indexes.functions.find((f) => f.name === name)
      if (!target) throw new Error(`Unknown related function: ${name}`)
      if (!target.related) target.related = []
      if (!target.related.includes(fn.name)) target.related.push(fn.name)
    })
  })
  indexes.functions.forEach((fn) => fn.related?.sort())

  return indexes
}


async function run() {
  const indexes = await readMetadata()
  await fs.writeJSON(join(DIR_PACKAGE, 'index.json'), indexes, { spaces: 2 })
}

run()
