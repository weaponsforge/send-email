import nodemailer from 'nodemailer'

import SchemaValidator from '@/lib/validator/schemavalidator.js'
import { TransportOath2Schema, type TransportOath2SchemaType } from '@/types/transport.schema.js'
import { TRANSPORT_SMTP_HOSTS, TRANSPORT_AUTH_TYPES } from '@/types/transport.types.js'
import type { IEmailTransportAuth, SMTPTransport } from '@/types/transport.types.js'
import type { IEmailTransport } from '@/types/transport.interface.js'

/**
 * @class EmailTransport
 * @description Initializes the Nodemailer transport with Google OAuth2 credentials
 * and initiates sending emails using the Gmail SMTP
 */
class EmailTransport implements IEmailTransport {
  /** Zod schema wrapper methods and functions */
  #schema: SchemaValidator | null = null
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
    this.#schema = new SchemaValidator(TransportOath2Schema)
  }

  async createTransport3LO (options?: TransportOath2SchemaType): Promise<void> {
    try {
      const inputData = {
        googleUserEmail: options?.googleUserEmail || process.env.GOOGLE_USER_EMAIL,
        googleClientId: options?.googleClientId || process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: options?.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
        googleRefreshToken: options?.googleRefreshToken || process.env.GOOGLE_REFRESH_TOKEN,
      }

      this.#schema?.validate({ data: inputData })

      this.#transporter = nodemailer.createTransport(<SMTPTransport.Options>{
        host: this.#host,
        port: 465,
        secure: true,
        auth: {
          type: this.#type,
          user: inputData.googleUserEmail,
          clientId: inputData.googleClientId,
          clientSecret: inputData.googleClientSecret,
          refreshToken: inputData.googleRefreshToken,
        },
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      } else {
        throw new Error(`Unexpected error type: ${String(err)}`, { cause: err })
      }
    }
  }

  getTransportOptions (): SMTPTransport.Options {
    if (!this.#transporter) {
      throw new Error('Transport not initialized')
    }

    return <SMTPTransport.Options> this.#transporter.options
  }

  get transporter (): nodemailer.Transporter | null {
    return this.#transporter
  }
}

export default EmailTransport
