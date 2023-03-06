import type { PackageManifest } from '../docs/metadata'

export const packages: PackageManifest[] = [
  {
    name: 'shared',
    display: 'VRuse Shared utilities',
    iife: true,
    cjs: true,
    mjs: true,
  },
  {
    name: 'vue',
    display: 'vue',
    description: 'Collection of essential Vue Composition Utilities',
    iife: true,
    cjs: true,
    mjs: true,
    external: ['@vueuse/shared'],
  },
]
