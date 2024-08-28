import { crx } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import manifest from './manifest'
import path from 'path'

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
