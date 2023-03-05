import React from '@vitejs/plugin-react'
import Vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { entries } from '../../scripts/aliases'

const plugins: PluginOption[] = [Inspect()]

const modeResolver = {
  vue: () => ({
    plugins: [Vue(), ...plugins],
    resolve: {
      alias: entries,
    },
  }),
  react: () => ({
    plugins: [React(), ...plugins],
    resolve: {
      alias: entries,
    },
  }),
}

export default defineConfig(({ mode }) => {
  return modeResolver[mode]()
})
