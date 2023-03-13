import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import Components from 'unplugin-vue-components/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'


import { resolve } from 'path'

export default defineConfig({
  plugins: [
    MarkdownTransform(),
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      dts: './.vitepress/components.d.ts',
      transformer: 'vue3',
    }),
    Icons({
      compiler: 'vue3',
      defaultStyle: 'display: inline-block',
    }),
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
    port: 1888,
  },
})
