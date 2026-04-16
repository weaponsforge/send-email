import type { EmailType } from '@/types/email.schema.js'
import type { SentMessageInfo } from '@/types/transport.types.js'
import SchemaValidator from '@/lib/validator/schemavalidator.js'

export interface IEmailSender {
  /**
   * Sends an email using Gmail SMTP and Google OAuth2
   * @param {EmailType} params Input parameters for sending email
   * @returns {Promise<SentMessageInfo>} Resolved Promise with Nodemailer send result
   * @throws {ZodIssue[]} Input parameter validation error/s
   */
  sendEmail (params: EmailType): Promise<SentMessageInfo>;

  /**
   * Retrieves the email sender's local zod schema wrapper
   * @returns {SchemaValidator | null} zod schema validator for the email sender
   */
  get schema (): SchemaValidator | null;
}
