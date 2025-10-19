import { execa } from 'execa'
import { describe, expect, test } from 'vitest'

const MAX_TIMEOUT = 10000

describe('CLI test suite', () => {
  test('Sends a text email using CLI options', async () => {
    const { stdout } = await execa('npm', [
      'run', 'send-email:dev', '--',
      'text',
      '-s', 'Hello, World!',
      '-c', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      '-r', 'testor@gmail.com,abc@gmail.com'
    ],
    {
      preferLocal: true
    })

    expect(stdout).toContain('Process success')
  }, MAX_TIMEOUT)
})
