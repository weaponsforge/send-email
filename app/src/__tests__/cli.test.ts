import { execa } from 'execa'
import { describe, expect, test } from 'vitest'

const MAX_TIMEOUT = 10000

describe('CLI test suite', () => {
  test('Sends a text email using CLI options', async () => {
    const { stdout, exitCode } = await execa('npm', [
      'run', 'send-email:dev', '--',
      'send',
      '-s \'Hello, World!\'',
      '-c \'Lorem ipsum dolor sit amet, consectetur adipiscing elit...\'',
      '-r tester@gmail.com'
    ],
    {
      preferLocal: true,
      reject: false
    })

    expect(exitCode).toBe(0)
    expect(stdout).toContain('Process success')
  }, MAX_TIMEOUT)
})
