import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()

import type { IGmailOAuthClient } from '@/types/oauth2client.interface.js'
import type {
  GetAccessTokenResponse,
  IOauthClient,
  OAuth2Client
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

  /**
   * @constructor
   * @param {Partial<IOauthClient>} params (Optional) constructor parameters. The corresponding `.env` variables
   * expect to have correct values for the default values.
   */
  constructor (params?: Partial<IOauthClient>) {
    const clientId = params?.clientId || process.env.GOOGLE_CLIENT_ID
    const clientSecret = params?.clientSecret || process.env.GOOGLE_CLIENT_SECRET
    const redirectURI = params?.redirectURI || process.env.GOOGLE_REDIRECT_URI
    const refreshToken = params?.refreshToken || process.env.GOOGLE_REFRESH_TOKEN
    const userEmail = params?.userEmail || process.env.GOOGLE_USER_EMAIL

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
      const { clientId, clientSecret, redirectURI, refreshToken, userEmail } = params

      if (!userEmail) {
        throw new Error('Undefined sender email')
      }

      if (!refreshToken) {
        throw new Error('Undefined refresh token')
      }

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
    this.#accessToken = accessToken
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
