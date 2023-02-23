import React from '@vitejs/plugin-react'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { entries } from '../../scripts/aliases'

const modeResolver = {
  vue: () => ({
    plugins: [Vue()],
    resolve: {
      alias: entries,
    },
  }),
  react: () => ({
    plugins: [React()],
    resolve: {
      alias: entries,
    },
  }),
}

export default defineConfig(({ mode }) => {
  return modeResolver[mode]()
})
