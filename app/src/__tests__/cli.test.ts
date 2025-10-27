import { $, execa } from 'execa'
import { describe, expect, test } from 'vitest'
import { EmailSchemaMessages } from '@/types/email.schema.js'
import htmlContent from '@/utils/constants/htmlContent.js'

const MAX_TIMEOUT = 10000

describe('CLI test suite', () => {
  /**
   * ---------- Email sending ----------
   */
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

  test('Sends the default HTML email using CLI options', async () => {
    const correctEmailList = 'testor@gmail.com,abc@gmail.com'

    const { stdout } = await $`npm run send-email:dev -- html
    -s ${'Default HTML Message'}
    -c ${'This is paragraph #1'} ${'This is paragraph #2'} ${'This is paragraph #3'}
    -r ${correctEmailList}`

    expect(stdout).toContain('Process success')
  }, MAX_TIMEOUT)

  test('Sends WYSIWYG body content in HTML email', async () => {
    const { stdout } = await $`npm run send-email:dev -- html
    -s ${'WYSIWYG Email Content Message'}
    -c ${'This is paragraph #1'} ${'This is paragraph #2'} ${'This is paragraph #3'}
    -w ${htmlContent}
    -r ${'acetiercel@yahoo.com'}`

    expect(stdout).toContain('Process success')
  }, MAX_TIMEOUT)

  /**
   * ---------- CLI parameters ----------
   */
  test('Rejects email recipients list not separated by comma', async () => {
    // Email list should be comma-separated
    const incorrectEmailList = 'testor@gmail.com|abc@gmail.com'

    const { stdout } = await $`npm run send-email:dev -- html
      -s ${'Default HTML Message'}
      -c ${'helloooo'}
      -r ${incorrectEmailList}`

    expect(stdout).toContain('[ERROR]')
    expect(stdout).toContain(EmailSchemaMessages.RECIPIENT_EMAIL)
  }, MAX_TIMEOUT)
})
