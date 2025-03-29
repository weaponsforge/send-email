import type { EmailType } from '@/types/email.schema.js'

export interface IEmailSender {
  /**
   * Sends an email using Gmail SMTP and Google OAuth2
   * @param {EmailType} params Input parameters for sending email
   * @returns {Promise<void>} Resolved Promise that sent the email
   * @throws {ZodIssue[]} Input parameter validation error/s
   */
  sendEmail (params: EmailType): Promise<void>;
}
