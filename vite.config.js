import { defineConfig } from 'vite'

const pagesBase = '/redwood-electric-sales/'

export default defineConfig(({ command }) => ({
  // Project Pages URL: https://redwoodelectricutah-dev.github.io/redwood-electric-sales/
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
