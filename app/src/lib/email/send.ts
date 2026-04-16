import EmailSender from '@/lib/email/sender.js'

import { TRANSPORT_AUTH_TYPES, TRANSPORT_SMTP_HOSTS } from '@/types/transport.types.js'
import type { EmailType } from '@/types/email.schema.js'
import type { TransportOath2SchemaType } from '@/types/transport.schema.js'

/**
 *  Sends an email to a recipient (text or HTML)
 * @param {EmailType} params Email sending input parameters
 * @param {oauth2} options Optional Google OAuth2 settings. Uses the `GOOGLE_*` env variables by default.
 */
export const send = async (
  params: EmailType,
  oauth2?: TransportOath2SchemaType,
): Promise<void> => {
  const { recipient, recipients, subject, content, isHtml = false } = params

  const handler = new EmailSender({
    host: TRANSPORT_SMTP_HOSTS.GMAIL,
    type: TRANSPORT_AUTH_TYPES.OAUTH2,
  })

  try {
    await handler.createTransport3LO(oauth2)
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err
    }
  }

  try {
    const result = await handler.sendEmail({
      recipient,
      recipients,
      subject,
      content,
      isHtml,
    })

    const acceptedCount = (result?.accepted || []).length
    console.log(`Email sent to (${acceptedCount}) recipients`)
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err
    }
  }
}
