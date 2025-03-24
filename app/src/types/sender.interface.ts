import type { ISendEmail } from '@/types/sender.types.js'

export interface IEmailSender {
  /**
   * Sends an email using Gmail SMTP and Google OAuth2
   * @param {ISendEmail} params Input parameters for sending email
   * @returns {Promise<void>} Resolved Promise that sent the email
   */
  sendEmail (params: ISendEmail): Promise<void>;
}
