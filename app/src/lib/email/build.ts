import sanitizeHtml from 'sanitize-html'

import { promises as fs } from 'fs'
import path from 'path'
import ejs from 'ejs'

import { directory } from '@/utils/helpers.js'
import { HtmlBuildSchema, type EmailHtmlOptions } from '@/types/email.schema.js'

type EmailBuildOptions = Omit<EmailHtmlOptions, 'subject'>

/**
 * Builds the HTML-form email content to send in emails.
 * @param {EmailBuildOptions} params - HTML Email parameters with multiple `content[]` for paragraphs
 * @returns {string} HTML-form email content
 */
export const buildHtml = async (
  params: EmailBuildOptions
): Promise<string> => {
  const {
    content: messages = [],
    recipients,
    sender,
    wysiwyg = null
  } = params

  HtmlBuildSchema.parse(params)

  if (!sender?.trim()) {
    throw new Error('Sender is required')
  }

  // Sanitize HTML
  const wysiwygHtml = typeof wysiwyg === 'string'
    ? sanitizeHtml(wysiwyg.trim())
    : null

  // Clean messages
  const cleanMessages = messages.map(message => message.trim())

  // Format single recipient
  const recipient = recipients.length === 1
    ? recipients[0]?.trim() || null
    : null

  const dir = directory(import.meta.url)

  try {
    const templatePath = path.resolve(dir, '..', '..', 'templates', 'email.ejs')
    const emailTemplate = await fs.readFile(templatePath, 'utf-8')

    const html = ejs.render(emailTemplate, {
      recipient,
      messages: cleanMessages,
      sender,
      wysiwyg: wysiwygHtml
    })

    return html
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to render email template: ${errMsg}`)
  }
}
