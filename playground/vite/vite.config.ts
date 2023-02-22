import { entries } from '../../scripts/aliases'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

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

  }
}

export default defineConfig(({ command, mode }) => {
  return modeResolver[mode]()
})
