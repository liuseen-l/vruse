import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetAttributify({
          /* preset options */
        }),
        presetUno(),
      ],
    }),
  ],
  server: {
    port: 1999,
  },
})
