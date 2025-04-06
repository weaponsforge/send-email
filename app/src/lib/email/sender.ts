import dotenv from 'dotenv'
dotenv.config()

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
        content
      } = params

      const receivers = stringsToArray(recipient, recipients)

      if (receivers.length > 20) {
        throw new Error(EmailSchemaMessages.RECIPIENT_EMAIL_MAX)
      }

      return await this.transporter!.sendMail({
        from: transportOptions.auth?.user || process.env.USER_EMAIL,
        to: receivers,
        subject: subject,
        text: content
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
    }
  }

  get schema (): SchemaValidator | null {
    return this.#schema
  }
}

export default EmailSender
