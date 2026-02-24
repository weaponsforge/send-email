import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
  { ignores: ['node_modules/**'] },
  {
    rules: {
      // 'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-trailing-spaces': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always']
    }
  }
])
