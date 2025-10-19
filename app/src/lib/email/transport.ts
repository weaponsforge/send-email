import nodemailer from 'nodemailer'
import GmailOAuthClient from '@/lib/google/oauth2client.js'

import { TRANSPORT_SMTP_HOSTS, TRANSPORT_AUTH_TYPES } from '@/types/transport.types.js'
import type { IEmailTransportAuth, SMTPTransport } from '@/types/transport.types.js'
import type { IEmailTransport } from '@/types/transport.interface.js'

/**
 * @class EmailTransport
 * @description Initializes the Nodemailer transport with Google OAuth2 credentials
 * and initiates sending emails using the Gmail SMTP
 */
class EmailTransport implements IEmailTransport {
  /** Nodemailer tansport */
  #transporter: nodemailer.Transporter | null = null

  /** SMTP hosts allowed within Nodemailer */
  #host: TRANSPORT_SMTP_HOSTS | null = null

  /** SMTP authentication modes allowed by Nodemailer */
  #type: TRANSPORT_AUTH_TYPES | null = null

  /**
   * @constructor
   * @param {IEmailTransportAuth} params Constructor parameters
   */
  constructor (params?: IEmailTransportAuth) {
    this.#host = params?.host || TRANSPORT_SMTP_HOSTS.GMAIL
    this.#type = params?.type || TRANSPORT_AUTH_TYPES.OAUTH2
  }

  async createTransport3LO (oauth2Client: GmailOAuthClient): Promise<void> {
    try {
      let token = oauth2Client.accessToken

      // Generate and retrieve a fresh access token
      if (!token) {
        token = await oauth2Client.getAccessToken()
      }

      // Initialize the nodemailer transport with a fresh access token
      this.#transporter = nodemailer.createTransport(<SMTPTransport.Options>{
        host: this.#host,
        port: 465,
        secure: true,
        auth: {
          type: this.#type,
          user: oauth2Client.email,
          clientId: oauth2Client.client?._clientId,
          clientSecret: oauth2Client.client?._clientSecret,
          refreshToken: oauth2Client?.refreshToken,
          accessToken: token
        }
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      } else {
        throw new Error(`Unexpected error type: ${String(err)}`)
      }
    }
  }

  getTransportOptions (): SMTPTransport.Options {
    if (!this.#transporter) {
      throw new Error('Transport not initialized')
    }

    return <SMTPTransport.Options>this.#transporter.options
  }

  get transporter (): nodemailer.Transporter | null  {
    return this.#transporter
  }
}

export default EmailTransport
