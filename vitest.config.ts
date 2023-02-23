// import { resolve } from 'path'
import type { UserConfig } from 'vitest/config'
import { defineConfig } from 'vitest/config'

// ts-expect-error let me do it
export default defineConfig({
  resolve: {
    dedupe: ['vue', 'vue-demi', '@vue/runtime-core'],
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: [resolve(__dirname, 'packages/.test/setup.ts')],
    reporters: 'dot',
    include: ['packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    deps: {
      inline: ['@vue/composition-api', 'vue-demi'],
    },
  },
}) as UserConfig
