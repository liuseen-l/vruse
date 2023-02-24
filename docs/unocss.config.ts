import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  UserConfig,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: () =>
          import('@iconify-json/carbon').then((i) => i.icons as any),
      },
    }),
  ],
}) as UserConfig
