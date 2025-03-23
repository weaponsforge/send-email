import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    exclude: [
      ...configDefaults.exclude,
      'node_modules/**',
      'dist/**',
      '.git/**',
      '.vscode/**'
    ]
  }
})
