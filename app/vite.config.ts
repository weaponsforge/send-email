import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    // reports and coverage artifacts go to .vitest/
    reporters: ['verbose', 'html', 'junit'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reportsDirectory: '.vitest/coverage',
      include: ['src/lib', 'src/scripts', 'src/types', 'src/utils'],
      exclude: [
        'node_modules/',
        'dist/',
        'html/',
        '.vitest/',
        '**/*.html',
        '**/*.md',
        '**/*.ejs',
      ],
    },
    exclude: [
      ...configDefaults.exclude,
      'node_modules/**',
      'dist/**',
      '.cursor/**',
      '.git/**',
      '.github/**',
      '.vscode/**',
    ],
  },
})
