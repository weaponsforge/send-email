import { promises as fs } from 'fs'
import path from 'path'
import ejs from 'ejs'

import { directory } from '@/utils/helpers.js'
import type {  MultipleMessageEmail } from '@/types/email.schema.js'

/**
 * Builds the HTML-form email content to send in emails.
 * @param {MultipleMessageEmail} params - HTML Email parameters with multiple `content[]` for paragraphs
 * @returns {string} HTML-form email content
 */
export const buildHtml = async (
  params: MultipleMessageEmail
): Promise<string> => {
  const {
    content: messages = [],
    recipients,
    sender,
    subject
  } = params

  if (
    !subject ||
    !messages || messages.length === 0 ||
    !recipients ||
    !sender
  ) {
    throw new Error('Invalid parameters/s')
  }

  const recipientArray = Array.isArray(recipients) ? recipients : [recipients]

  if (recipientArray.length === 0) {
    throw new Error('Invalid recipients')
  }

  // Format single recipient
  const recipient = recipientArray.length === 1
    ? recipientArray[0]
    : null

  const dir = directory(import.meta.url)

  try {
    const templatePath = path.resolve(dir, '..', '..', 'templates', 'email.ejs')
    const emailTemplate = await fs.readFile(templatePath, 'utf-8')

    const html = ejs.render(emailTemplate, {
      recipient,
      messages,
      sender
    })

    return html
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to render email template: ${errMsg}`)
  }
}
