export type { SentMessageInfo } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'
export { SMTPTransport }

/**
 * Enum containing SMTP hosts allowed in Nodemailer
 * @enum {string}
 */
export enum TRANSPORT_SMTP_HOSTS {
  GMAIL ='smtp.gmail.com'
}

/**
 * Enum containing supported authentication types for Nodemailer email transport
 * @enum {string}
 */
export enum TRANSPORT_AUTH_TYPES {
  OAUTH2 = 'OAuth2'
}

/**
 * Properties of the `EmailTransport` class constructor.
 * @interface
 * @param {string} host Nodemailer-defined SMTP host provider, e.g., "smtp.gmail.com"
 * @param {string} type Nodemailer-defined authorization type, e.g., "OAuth2"
 */
export interface IEmailTransportAuth {
  host?: TRANSPORT_SMTP_HOSTS;
  type?: TRANSPORT_AUTH_TYPES;
};
