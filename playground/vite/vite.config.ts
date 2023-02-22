import { entries } from '../../scripts/aliases'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import React from '@vitejs/plugin-react'

const modeResolver = {
  "vue": () => {
    return ({
      plugins: [
        Vue(),
      ],
      resolve: {
        alias: entries
      }
    })
  },
  'react': () => {
    return ({
      plugins: [
        React(),
      ],
      resolve: {
        alias: entries
      }
    })
  }
}

export default defineConfig(({ command, mode }) => {
  return modeResolver[mode]()
})
