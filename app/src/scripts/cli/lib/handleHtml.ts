import { buildHtml, send } from '@/lib/index.js'
import { type EmailHtmlOptions } from '@/types/email.schema.js'

/**
 * Handles the CommanderJS action for sending HTML-format email messages
 * @param {EmailHtmlOptions} options - CommanderJS options object
 */
export const handleSendHtmlEmail = async (options: EmailHtmlOptions) => {
  if (!process.env.GOOGLE_USER_EMAIL) {
    throw new Error('GOOGLE_USER_EMAIL .env variable is required')
  }

  try {
    const {
      subject,
      content: paragraphs = [],
      recipients = [],
      wysiwyg = null
    } = options

    if (paragraphs.length === 0 && typeof wysiwyg !== 'string') {
      throw new Error('One of content or wysiwyg is required')
    }

    // Clean data of whitespace
    const emails = recipients.map(email => email.trim())
    const cleanText = paragraphs.map(paragraph =>paragraph.trim())

    console.log(`Sending email to (${emails.length}) recipients`)

    const emailContent = await buildHtml({
      content: cleanText,
      recipients: emails,
      sender: process.env.GOOGLE_USER_EMAIL,
      wysiwyg
    })

    await send({
      subject,
      content: emailContent,
      recipients: emails,
      isHtml: true
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('[ERROR]: handle HTML email')
      throw err
    }
  }

  console.log('Process success')
}
