import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config({ quiet: true })

import SchemaValidator from '@/lib/validator/schemavalidator.js'
import type { IGmailOAuthClient } from '@/types/oauth2client.interface.js'
import type { ZodObjectBasicType } from '@/types/schemavalidator.interface.js'
import { GmailOAuthClientSchema } from '@/types/oauth2client.schema.js'

import {
  type GetAccessTokenResponse,
  type IOauthClient,
  type OAuth2Client
} from '@/types/oauth2client.types.js'

/**
 * @class GmailOAuthClient
 * @description Manages relevant API keys, methods and properties of the Google `OAuth2Client`
 */
class GmailOAuthClient implements IGmailOAuthClient {
  /** Local instance of the `OAuth2Client` */
  #client: OAuth2Client | null = null

  /** Email sender associated with the API keys of the `OAuth2Client` */
  #email: string | null = null

  /** Google OAuth2 refresh token from the Google OAuth2 Playground  */
  #refreshToken: string | null = null

  /** Google OAuth2 access token generated using the #refreshToken */
  #accessToken: GetAccessTokenResponse | null = null

  /** Zod schema wrapper methods and functions */
  #schema: SchemaValidator | null = null

  /**
   * @constructor
   * @param {Partial<IOauthClient>} params (Optional) constructor parameters. The corresponding `.env` variables
   * expect to have correct values for the default values.
   * @param {ZodObjectBasicType} [schema] (Optional) zod Schema. Defaults to the `GmailOAuthClientSchema` if not provided.
   */
  constructor (params?: Partial<IOauthClient> | null, schema?: ZodObjectBasicType) {
    const clientId = params?.clientId || process.env.GOOGLE_CLIENT_ID
    const clientSecret = params?.clientSecret || process.env.GOOGLE_CLIENT_SECRET
    const redirectURI = params?.redirectURI || process.env.GOOGLE_REDIRECT_URI
    const refreshToken = params?.refreshToken || process.env.GOOGLE_REFRESH_TOKEN
    const userEmail = params?.userEmail || process.env.GOOGLE_USER_EMAIL

    this.#schema = new SchemaValidator(schema || GmailOAuthClientSchema)

    this.init(<IOauthClient>{
      clientId,
      clientSecret,
      redirectURI,
      refreshToken,
      userEmail
    })
  }

  init (params: IOauthClient): void {
    try {
      this.#schema?.validate({ data: { ...params } })

      const { clientId, clientSecret, redirectURI, refreshToken, userEmail } = params

      this.#client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectURI
      )

      this.#client.setCredentials({ refresh_token: refreshToken })

      this.#email = userEmail
      this.#refreshToken = refreshToken
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
    }
  }

  async getAccessToken (): Promise<GetAccessTokenResponse> {
    this.checkClient()
    return await this.#client!.getAccessToken()
  }

  async generateAccessToken (): Promise<void> {
    this.checkClient()
    this.#accessToken = await this.getAccessToken()
  }

  checkClient (): void {
    if (!this.#client) {
      throw new Error('Undefined OAuth2 client')
    }
  }

  set accessToken (accessToken: GetAccessTokenResponse | null) {
    this.#schema?.checkSchema()

    this.#schema?.validate({
      data: { accessToken },
      pick: true
    })

    this.#accessToken = accessToken
  }

  get schema (): SchemaValidator | null {
    return this.#schema
  }

  get client (): OAuth2Client | null {
    return this.#client
  }

  get email (): string | null {
    return this.#email
  }

  get refreshToken (): string | null {
    return this.#refreshToken
  }

  get accessToken (): GetAccessTokenResponse | null {
    return this.#accessToken
  }
}

export default GmailOAuthClient
