import path from 'path'
import { execa } from 'execa'
import { describe, expect, test } from 'vitest'
import { directory } from '@/utils/helpers.js'

const MAX_TIMEOUT = 10000

const cliPath = path.resolve(
  directory(import.meta.url), '../scripts/cli/send.ts'
)

describe('CLI test suite', () => {
  test('Sends a text email using CLI options', async () => {
    const { stdout } = await execa('npx vite-node', [
      cliPath,
      'send',
      '-s \'Hello, World!\'',
      '-c \'Lorem ipsum dolor sit amet, consectetur adipiscing elit...\'',
      '-r tester@gmail.com'
    ])

    expect(stdout).toContain('Process success')
  }, MAX_TIMEOUT)
})
