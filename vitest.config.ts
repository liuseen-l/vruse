import { resolve } from 'node:path'
import type { UserConfig } from 'vitest/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    dedupe: ['vue', 'vue-demi', '@vue/runtime-core'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, './scripts/setupVitest.ts')],
    reporters: 'dot',
    include: ['packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
}) as UserConfig
