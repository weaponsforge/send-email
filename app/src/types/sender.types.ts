/**
 * Properties of the `EmailTransport.sendEmail()` method
 * @interface
 * @param {string} recipient Email address that will receive an email
 * @param {stirng} subject Email message title
 * @param {string} content Email message cotent can can be a simple text or HTML string
 */
export interface ISendEmail {
  recipient: string;
  subject: string;
  content: string;
}
