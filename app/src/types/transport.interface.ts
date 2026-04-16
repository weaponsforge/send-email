import type { Transporter } from 'nodemailer'
import type { SMTPTransport } from './transport.types.js'
import type { TransportOath2SchemaType } from './transport.schema.js'

/**
 * Public properties and methods types of the `EmailTransport` class
 * @interface IEmailTransport
 */
export interface IEmailTransport {
  /**
   * Initializes `this.#transporter` with a Nodemailer transport using the 3-Legged OAuth (3LO) authentication.
   * Reads Google OAuth2 credentials from environment variables.
   * @param {TransportOath2SchemaType} options Google OAuth2 settings
   * @returns {Promise<void>} A completed Promise that initialized `this.#transporter` with a Nodemailer transport
   * @see https://nodemailer.com/smtp/oauth2/#example-3
   */
  createTransport3LO (options?: TransportOath2SchemaType): Promise<void>;

  /**
   * Retrieves the options used to initialize the Nodemailer transport
   * @returns {SMTPTransport.Options} Nodemailer SMTP Options
   * @throws {Error} Nodemailer transport initialization error
   */
  getTransportOptions (): SMTPTransport.Options;

  /**
   * Retrieves the local Nodemailer transporter instance
   * @returns {nodemailer.Transporter | null} Nodemailer instance
   */
  get transporter (): Transporter | null;
}
