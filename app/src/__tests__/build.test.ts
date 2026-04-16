import path from 'path'
import { beforeAll, describe, expect, it } from 'vitest'

import { buildHtml } from '@/lib/email/build.js'
import { directory } from '@/utils/helpers.js'
import { EmailSchemaMessages } from '@/types/email.schema.js'

// buildHtml resolves the EJS template relative to __dirname (set to the build.ts location)
beforeAll(() => {
  globalThis.__dirname = path.resolve(directory(import.meta.url), '..', 'lib', 'email')
})

const TEST_RECIPIENTS = ['tester@gmail.com']
const TEST_SENDER = 'sender@gmail.com'

describe('buildHtml test', () => {
  it('should return an HTML string from paragraph content', async () => {
    const html = await buildHtml({
      content: ['Hello, World!', 'Second paragraph'],
      recipients: TEST_RECIPIENTS,
      sender: TEST_SENDER,
    })

    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })

  it('should return an HTML string from wysiwyg content', async () => {
    const html = await buildHtml({
      content: [],
      recipients: TEST_RECIPIENTS,
      sender: TEST_SENDER,
      wysiwyg: '<p>Hello, wysiwyg!</p>',
    })

    expect(typeof html).toBe('string')
    expect(html).toContain('Hello, wysiwyg!')
  })

  it('should strip script tags from wysiwyg content', async () => {
    const html = await buildHtml({
      content: [],
      recipients: TEST_RECIPIENTS,
      sender: TEST_SENDER,
      wysiwyg: '<script>alert("xss")</script><p>Safe content</p>',
    })

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('alert("xss")')
  })

  it('should reject if both content and wysiwyg are missing', async () => {
    await expect(
      buildHtml({
        content: [],
        recipients: TEST_RECIPIENTS,
        sender: TEST_SENDER,
      }),
    ).rejects.toThrow()
  })

  it('should reject with an invalid sender email', async () => {
    await expect(
      buildHtml({
        content: ['Hello'],
        recipients: TEST_RECIPIENTS,
        sender: 'not-an-email',
      }),
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_EMAIL)
  })

  it('should reject if recipients list exceeds 20', async () => {
    const tooManyRecipients = Array.from({ length: 21 }, (_, i) => `user${i}@gmail.com`)

    await expect(
      buildHtml({
        content: ['Hello'],
        recipients: tooManyRecipients,
        sender: TEST_SENDER,
      }),
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_EMAIL_MAX)
  })
})
