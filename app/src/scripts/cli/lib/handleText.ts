import { send } from '@/lib/index.js'
import type { EmailTextOptions } from '@/types/email.schema.js'

/**
 * Handles the CommanderJS action for sending text-form email messages
 * @param {EmailTextOptions} options - CommanderJS options object
 */
export const handleSendTextEmail = async (options: EmailTextOptions) => {
  try {
    const { subject, content, recipients = [] } = options

    console.log(`Sending email to (${recipients.length}) recipients`)

    await send({
      recipients,
      subject,
      content
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('[ERROR] Failed to send text email:', err.message)
      throw err
    }
  }

  console.log('Process success')
}
