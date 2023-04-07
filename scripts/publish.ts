import path from 'node:path'
import assert from 'node:assert'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { execa } from 'execa'
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
      packageJSON.main = toReplace ? './dist/index.cjs' : './index.ts'
      packageJSON.module = toReplace ? './dist/index.mjs' : './index.ts'
      packageJSON.exports['.'].import = toReplace ? './dist/index.mjs' : './index.ts'

      const functionNames: string[] = []

      functionNames.push(
        ...fg
          .sync('*/index.ts', { cwd: path.resolve(`${packageDir}/${name}`) })
          .map(i => i.split('/')[0]),
      )

      for (const fnName of functionNames) {
        packageJSON.exports[`./${fnName}`] = {}
        packageJSON.exports[`./${fnName}`].types = `./dist/${fnName}/index.d.ts`
        packageJSON.exports[`./${fnName}`].require = `./dist/${fnName}/index.cjs`
        packageJSON.exports[`./${fnName}`].import = toReplace ? `./dist/${fnName}/index.mjs` : './index.ts'
      }
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

function generatorBundle() {
  const resolveBundleName: {
    [key: string]: RegExp
  } = {
    'index.mjs': /'(.*)'/g,
    'index.cjs': /require\('(.*)'\)/g,
  }
  for (const { name, dir } of packages) {
    const packageDir = dir ? dir.split('/')[0] : 'packages'
    const packageRoot = path.resolve(rootDir, packageDir, name, 'dist')
    for (const bundle of Object.keys(resolveBundleName)) {
      const bundlePath = path.resolve(packageRoot, bundle)
      const bundleCode = fs.readFileSync(bundlePath, 'utf-8')
      const replaceCode = bundleCode.replaceAll(resolveBundleName[bundle], (match, matchItem, str) => match.replace(matchItem, `${matchItem}/${bundle}`))
      fs.writeFileSync(bundlePath, replaceCode)
    }
  }
}

async function publish() {
  await toggleUpdatePackageJSON(true)

  await execa('pnpm run build', { stdio: 'inherit' })

  await execa('lerna publish --exact --force-publish --yes --no-git-tag-version --no-git-reset --no-push', { stdio: 'inherit' })

  generatorBundle()

  await toggleUpdatePackageJSON(false)
}

publish()
