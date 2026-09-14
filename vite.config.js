import { defineConfig } from 'vite'

const pagesBase = '/Redwood-Electric-Sales/'

export default defineConfig(({ command }) => ({
  // Project Pages URL: https://redwoodelectricutah-dev.github.io/Redwood-Electric-Sales/
  base: command === 'build' ? pagesBase : '/',
  server: {
    host: '127.0.0.1',
    port: 43147,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 43147,
    strictPort: true,
  },
}))
