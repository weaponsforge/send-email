/**
 * Properties of the `EmailTransport.sendEmail()` method
 * @interface
 * @param {string} recipient Email address that will receive an email
 * @param {stirng} subject Email message title
 * @param {string} content Simple text email messaage cotent
 */
export interface ISendEmail {
  recipient: string;
  subject: string;
  content: string;
}
