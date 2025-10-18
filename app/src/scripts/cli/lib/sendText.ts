import { send } from '@/lib/index.js'
import { formatEmails, validateComonArgs } from './utils.js'

import type { HtmlEmailParams } from '@/types/email.schema.js'

/**
 * Handles the CommanderJS action for sending text-form email messages
 * @param {HtmlEmailParams} options - CommanderJS options object
 */
export const handleSendTextEmail = async (options: HtmlEmailParams) => {
  try {
    validateComonArgs(options)

    const { subject, content, recipients } = options
    const emailRecipients = formatEmails(recipients)

    console.log(`Sending email to: ${recipients}`)

    await send({
      recipients: emailRecipients,
      subject,
      content
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('[ERROR]: handle text email')
      throw err
    }
  }

  console.log('Process success')
}
