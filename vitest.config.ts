import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import React from '@vitejs/plugin-react'

const modeResolver: { [key: string]: () => any } = {
  v: () => ({
    include: ['packages/vue/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  }),
  r: () => ({
    include: [
      'packages/react/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  }),
}

function isUnitTest(u: string) {
  return u === 'r' || u === 'v'
}

export default defineConfig(({ mode }) => {
  const testConfig = isUnitTest(mode) ? modeResolver[mode]() : {}
  return {
    resolve: {
      dedupe: ['vue', 'vue-demi', '@vue/runtime-core'],
    },
    test: {
      ...testConfig,
      globals: true,
      environment: 'jsdom',
      setupFiles: [resolve(__dirname, './scripts/setupVitest.ts')],
      reporters: 'dot',
    },
    plugins: [React()],
  }
})
