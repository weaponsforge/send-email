import dotenv from 'dotenv'
dotenv.config({ quiet: true })

import EmailTransport from '@/lib/email/transport.js'
import type { IEmailTransportAuth, SentMessageInfo } from '@/types/transport.types.js'
import type { IEmailSender } from '@/types/sender.interface.js'
import { type EmailType, EmailSchema, EmailSchemaMessages } from '@/types/email.schema.js'
import { stringsToArray } from '@/utils/helpers.js'
import SchemaValidator from '@/lib/validator/schemavalidator.js'

/**
 * @class EmailSender
 * @description Sends emails using its Nodemailer transporter
 */
class EmailSender extends EmailTransport implements IEmailSender {
  /** Zod schema wrapper methods and functions */
  #schema: SchemaValidator | null = null

  constructor (params: IEmailTransportAuth) {
    super(params)
    this.#schema = new SchemaValidator(EmailSchema)
  }

  async sendEmail (params: EmailType): Promise<SentMessageInfo> {
    try {
      const transportOptions = this.getTransportOptions()
      this.#schema?.validate({ data: params })

      const {
        recipient,
        recipients = [],
        subject,
        content,
        isHtml = false,
      } = params

      const receivers = stringsToArray(recipient, recipients)

      if (receivers.length > 20) {
        throw new Error(EmailSchemaMessages.RECIPIENT_EMAIL_MAX)
      }

      const from = transportOptions.auth?.user || process.env.GOOGLE_USER_EMAIL

      if (!from) {
        throw new Error(TransportMessages.MISSING_SENDER_EMAIL)
      }

      return await this.transporter!.sendMail({
        from,
        to: receivers,
        subject,
        ...(!isHtml && { text: content }), // Text email
        ...(isHtml && { html: content }), // HTML content format
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      } else {
        throw new Error(`Unexpected error type: ${String(err)}`, { cause: err })
      }
    }
  }

  get schema (): SchemaValidator | null {
    return this.#schema
  }
}

const TransportMessages: Record<string, string> = {
  MISSING_SENDER_EMAIL: 'Sender email address is not set. Ensure GOOGLE_USER_EMAIL is defined or pass it via oauth2 options.'
}

export default EmailSender
