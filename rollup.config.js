import 'esbuild-register'
import { defineConfig } from 'rollup'
import configs from './scripts/rollup.config.ts'

export default defineConfig({
  ...configs,
})
