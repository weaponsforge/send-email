import dotenv from 'dotenv'
dotenv.config()

import EmailTransport from '@/lib/email/transport.js'
import type { IEmailTransportAuth } from '@/types/transport.types.js'
import type { IEmailSender } from '@/types/sender.interface.js'
import { type EmailType, EmailSchema } from '@/types/email.schema.js'

/**
 * @class EmailSender
 * @description Sends emails using its Nodemailer transporter
 */
class EmailSender extends EmailTransport implements IEmailSender {
  constructor (params: IEmailTransportAuth) {
    super(params)
  }

  async sendEmail (params: EmailType): Promise<void> {
    try {
      const transportOptions = this.getTransportOptions()
      const result = EmailSchema.safeParse(params)

      if (!result.success) {
        throw new Error(result.error.message)
      }

      const { recipient, subject, content } = params

      return await this.transporter!.sendMail({
        from: transportOptions.auth?.user || process.env.USER_EMAIL,
        to: recipient,
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
