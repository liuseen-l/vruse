import fs from 'node:fs'
import { resolve } from 'node:path'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import { PluginPure as pure } from 'rollup-plugin-pure'
import type { OutputOptions, Plugin, RollupOptions } from 'rollup'
import fg from 'fast-glob'
import { packages } from '../meta/packages'

// 拿到vue-demi的模块路径
const VUE_DEMI_IIFE = fs.readFileSync(
  require.resolve('vue-demi/lib/index.iife.js'),
  'utf-8',
)
// 打包配置数组
const configs: RollupOptions[] = []

// 注入vueDemi
const injectVueDemi: Plugin = {
  name: 'inject-vue-demi',
  renderChunk(code) {
    return `${VUE_DEMI_IIFE};\n;${code}`
  },
}

const pluginEsbuild = esbuild()
const pluginDts = dts()
const pluginPure = pure({
  functions: ['defineComponent'],
})

const externals = ['vue-demi', '@vruse/metadata']

const esbuildMinifer = (options: ESBuildOptions) => {
  const { renderChunk } = esbuild(options)

  return {
    name: 'esbuild-minifer',
    renderChunk,
  }
}

for (const {
  globals,
  name,
  external,
  submodules,
  iife,
  build,
  cjs,
  mjs,
  dts,
  target,
} of packages) {
  if (build === false) continue

  const iifeGlobals = {
    'vue-demi': 'VueDemi',
    '@vruse/shared': 'VRuse',
    '@vruse/core': 'VRuse',
    '@vruse/vue': 'VRuse',
    '@vruse/react': 'VRuse',
    ...(globals || {}),
  }

  const iifeName = 'VRuse'
  const functionNames = ['index']

  if (submodules)
    functionNames.push(
      ...fg
        .sync('*/index.ts', { cwd: resolve(`packages/${name}`) })
        .map((i) => i.split('/')[0]),
    )

  // index
  for (const fn of functionNames) {
    // packages/core/index.ts
    const input =
      fn === 'index'
        ? `packages/${name}/index.ts`
        : `packages/${name}/${fn}/index.ts`

    const output: OutputOptions[] = []

    // build to es
    if (mjs !== false) {
      output.push({
        file: `packages/${name}/dist/${fn}.mjs`,
        format: 'es',
      })
    }

    // build to cjs
    if (cjs !== false) {
      output.push({
        file: `packages/${name}/dist/${fn}.cjs`,
        format: 'cjs',
      })
    }

    // build to iife
    if (iife !== false) {
      output.push(
        {
          file: `packages/${name}/dist/${fn}.iife.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals,
          plugins: [injectVueDemi],
        },
        {
          file: `packages/${name}/dist/${fn}.iife.min.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals,
          plugins: [
            injectVueDemi,
            esbuildMinifer({
              minify: true,
            }),
          ],
        },
      )
    }
    configs.push({
      input,
      output,
      plugins: [
        target ? esbuild({ target }) : pluginEsbuild,
        json(),
        pluginPure,
      ],
      external: [...externals, ...(external || [])],
    })
    if (dts !== false) {
      configs.push({
        input,
        output: {
          file: `packages/${name}/dist/${fn}.d.ts`,
          format: 'es',
        },
        plugins: [pluginDts],
        external: [...externals, ...(external || [])],
      })
    }
  }
}

export default configs
