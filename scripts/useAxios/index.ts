import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

import type { OutputOptions, RollupBuild, RollupOptions } from 'rollup'

import parentPkg from '../../packages/vue/package.json' assert { type: 'json' }

const pkgName = '@vruse/axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const root = join(__dirname, '../../packages/vue/useAxios')
const out = join(root, '__out__')

const configs: RollupOptions[] = [{
  input: join(root, 'index.ts'),
  plugins: [esbuild()],
  output: {
    file: join(out, 'dist', 'index.js'), format: 'es',
  },
}, {
  input: join(root, 'index.ts'),
  plugins: [dts()],
  output: { dir: join(out, 'dist'), format: 'es' },
}]

async function build() {
  try {
    for (const config of configs) {
      const bundle = await rollup(config)
      await generateOutputs(bundle, config.output as OutputOptions)
    }

    /** create package.json */
    parentPkg.name = pkgName
    parentPkg.author = 'Lin<https://github.com/dongwa>'
    delete (parentPkg as any).exports
    delete (parentPkg as any).unpkg
    delete (parentPkg as any).jsdelivr
    delete (parentPkg as any).dependencies['@vruse/shared']
    parentPkg.module = './dist/index.js'
    parentPkg.types = './dist/index.d.ts'
    parentPkg.main = './dist/index.js'

    await writeFile(join(out, 'package.json'), JSON.stringify(parentPkg, undefined, 2))

    /** copy readme */
    const readmeData = (await readFile(join(root, 'index.md'), 'utf-8')).toString()
    const newReadme = readmeData.replace(/^---\s*\n(?:\w+:.*\n)*.*\s*\n(?:\w+:.*\n)*---\s*\n/mg, '').replaceAll('@vruse/vue', pkgName)
    await writeFile(join(out, 'README.md'), newReadme)
  } catch (error) {
    console.error('error', error)
  }
}

async function generateOutputs(bundle: RollupBuild, outputOptions: OutputOptions) {
  const { output } = await bundle.write(outputOptions)
  for (const chunkOrAsset of output)
    console.log(`${chunkOrAsset.fileName} => ${outputOptions.file || outputOptions.dir}`)
}

async function run() {
  await build()
  exec('npm publish --access publish', {
    cwd: out,
  }, (err, stdout) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(stdout.toString())
  })
}

run()
