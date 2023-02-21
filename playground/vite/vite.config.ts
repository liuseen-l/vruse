import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { entries } from '../../scripts/aliases'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  resolve: {
    alias: entries,
  },

})
