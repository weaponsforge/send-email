import EmailSender from '@/lib/email/sender.js'
import GmailOAuthClient from '@/lib/google/oauth2client.js'

import { TRANSPORT_AUTH_TYPES, TRANSPORT_SMTP_HOSTS } from '@/types/transport.types.js'
import type { ISendEmail } from '@/types/sender.types.js'

/**
 *  Sends a raw, text-content email to a recipient
 * @param {ISendEmail} params Email sending input parameters
 */
export const send = async (params: ISendEmail): Promise<void> => {
  const oauthClient = new GmailOAuthClient()

  const handler = new EmailSender({
    host: TRANSPORT_SMTP_HOSTS.GMAIL,
    type: TRANSPORT_AUTH_TYPES.OAUTH2
  })

  try {
    await handler.createTransport3LO(oauthClient)
    console.log('Transport created')
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }

  try {
    await handler.sendEmail({
      recipient: params?.recipient,
      subject: params?.subject,
      content: params?.content
    })

    console.log('Email sent to', params?.recipient)
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}
