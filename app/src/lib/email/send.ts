import EmailSender from '@/lib/email/sender.js'
import GmailOAuthClient from '@/lib/google/oauth2client.js'

import { TRANSPORT_AUTH_TYPES, TRANSPORT_SMTP_HOSTS } from '@/types/transport.types.js'
import type { EmailType } from '@/types/email.schema.js'

/**
 *  Sends a raw, text-content email to a recipient
 * @param {EmailType} params Email sending input parameters
 */
export const send = async (params: EmailType, client?: GmailOAuthClient): Promise<void> => {
  const oauthClient = client || new GmailOAuthClient()
  const { recipient, recipients, subject, content } = params

  const handler = new EmailSender({
    host: TRANSPORT_SMTP_HOSTS.GMAIL,
    type: TRANSPORT_AUTH_TYPES.OAUTH2
  })

  const properties = handler.schema?.properties
  const validate = {
    subject: 'hello'
  }

  handler.schema?.validate({ data: validate, pick: true })
  console.log('properties', properties)

  try {
    await handler.createTransport3LO(oauthClient)
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }

  try {
    const result = await handler.sendEmail({
      recipient,
      recipients,
      subject,
      content
    })

    console.log('Email sent to', result?.accepted)
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}
