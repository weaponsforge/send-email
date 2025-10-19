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

    console.log(`Sending email to (${recipients.length}) recipients`)

    const emailContent = await buildHtml({
      content: paragraphs,
      recipients,
      sender: process.env.GOOGLE_USER_EMAIL,
      wysiwyg
    })

    await send({
      subject,
      content: emailContent,
      recipients,
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
