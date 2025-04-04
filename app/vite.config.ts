import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    reporters: ['verbose', 'html'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reportsDirectory: './html/coverage',
      include: ['src/lib', 'src/scripts', 'src/types', 'src/utils'],
      exclude: [
        'node_modules/',
        'dist/',
        'html/'
      ]
    },
    exclude: [
      ...configDefaults.exclude,
      'node_modules/**',
      'dist/**',
      '.git/**',
      '.vscode/**'
    ]
  }
})
