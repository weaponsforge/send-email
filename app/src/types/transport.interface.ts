import nodemailer from 'nodemailer'
import GmailOAuthClient from '@/lib/google/oauth2client.js'
import type { SMTPTransport } from './transport.types.js'

/**
 * Public properties and methods types of the `GmailOAuthClient` class
 * @interface IEmailTransport
 */
export interface IEmailTransport {
  /**
   * Initializes `this.#transporter` with a Nodemailer transport using the 3-Legged OAuth (3LO) authentication.
   * @param {GmailOAuthClient} oauth2Client Instance of the `GmailOAuthClient` class
   * @returns {Promise<void>} A completed Promise that intialized `this.#transporter`with a Nodemailer transport
   * @see https://nodemailer.com/smtp/oauth2/#example-3
   */
  createTransport3LO (oauth2Client: GmailOAuthClient): Promise<void>;

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
  get transporter (): nodemailer.Transporter | null;
}
