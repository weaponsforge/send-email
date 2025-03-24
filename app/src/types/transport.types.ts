

import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'
export { SMTPTransport }

export enum TRANSPORT_SMTP_HOSTS {
  GMAIL ='smtp.gmail.com'
}

export enum TRANSPORT_AUTH_TYPES {
  OAUTH2 = 'OAuth2'
}

/**
 * Properties of the `EmailTransport` class constructor.
 * @interface
 * @param {string} host Nodemailer-defined SMTP host provider, e.g., "smtp.gmail.com"
 * @param {string} type Nodemailer-defined authorization type, e.g., "OAuth2"
 */
export interface ITransportAuth {
  host?: TRANSPORT_SMTP_HOSTS;
  type?: TRANSPORT_AUTH_TYPES;
};
