import sanitizeHtml from 'sanitize-html'

import { promises as fs } from 'fs'
import path from 'path'
import ejs from 'ejs'

import { HtmlBuildSchema, type EmailHtmlOptions } from '@/types/email.schema.js'
import config from '@/utils/config/sanitizeHtml.js'

type EmailBuildOptions = Omit<EmailHtmlOptions, 'subject'>

/**
 * Builds and sanitizes the HTML-form email content to send in emails.
 * @param {EmailBuildOptions} params - HTML Email parameters with multiple `content[]` for paragraphs
 * @returns {Promise<string>} HTML-form email content
 */
export const buildHtml = async (
  params: EmailBuildOptions
): Promise<string> => {
  const {
    content: messages = [],
    recipients,
    sender,
    wysiwyg = null,
    sanitizeConfig
  } = params

  HtmlBuildSchema.parse(params)

  // Sanitize HTML
  let wysiwygHtml = null

  if (typeof wysiwyg === 'string') {
    const configOptions = sanitizeConfig ?? config

    wysiwygHtml = sanitizeHtml(
      wysiwyg
        .replace(/(\r\n|\n|\r|\t)/g, '')
        .trim(),
      configOptions
    )
  }

  // Clean messages
  const cleanMessages = messages
    .map(message => message.trim())
    .filter(message => message.length > 0)

  // Format single recipient
  const recipient = recipients.length === 1
    ? recipients[0]?.trim() || null
    : null

  try {
    let emailTemplate

    if (process.env.IS_BUILD_SEA === 'true') {
      // Use import to bake/build the ejs template into the SEA
      const mod = await import('@/utils/templates/email.ejs')
      emailTemplate = (mod as unknown as { default: string }).default
    } else {
      // Read the ejs template from file
      const templatePath = path.resolve(__dirname, '..', '..', 'utils', 'templates', 'email.ejs')
      emailTemplate = await fs.readFile(templatePath, 'utf-8')
    }

    const html = ejs.render(emailTemplate, {
      recipient,
      messages: cleanMessages,
      sender,
      wysiwyg: wysiwygHtml
    })

    return html
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to render email template: ${errMsg}`)
  }
}
