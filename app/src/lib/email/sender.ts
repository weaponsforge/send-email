import dotenv from 'dotenv'
dotenv.config()

import EmailTransport from '@/lib/email/transport.js'
import type { IEmailTransportAuth, SentMessageInfo } from '@/types/transport.types.js'
import type { IEmailSender } from '@/types/sender.interface.js'
import { type EmailType, EmailSchema } from '@/types/email.schema.js'
import { stringsToArray, zodErrorsToString } from '@/utils/helpers.js'

/**
 * @class EmailSender
 * @description Sends emails using its Nodemailer transporter
 */
class EmailSender extends EmailTransport implements IEmailSender {
  constructor (params: IEmailTransportAuth) {
    super(params)
  }

  async sendEmail (params: EmailType): Promise<SentMessageInfo> {
    try {
      const transportOptions = this.getTransportOptions()
      const result = EmailSchema.safeParse(params)

      if (!result.success) {
        const errors = zodErrorsToString(result?.error?.errors)
        throw new Error(errors || 'Encountered email parameter validation errors')
      }

      const {
        recipient,
        recipients = [],
        subject,
        content
      } = params

      const receivers = stringsToArray(recipient, recipients)

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
}

export default EmailSender
