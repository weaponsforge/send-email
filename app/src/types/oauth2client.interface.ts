
import type {
  GetAccessTokenResponse,
  IOauthClient,
  OAuth2Client
} from '@/types/oauth2client.types.js'

/**
 * Public properties and methods types of the `GmailOAuthClient` class
 * @interface IGmailOAuthClient
 */
export interface IGmailOAuthClient {
  /**
   * Initializes the Google OAuth2 local client.
   * Keeps track of the client email and initial refresh token from the `.env` file.
   * @param {IOauthClient} params Parsed and formatted constructor parameters
   * @returns {void}
   */
  init (params: IOauthClient): void;

  /**
   * Generates a new Google OAuth2 access token using the refresh token
   * @returns {Promise<GetAccessTokenResponse>} Promise that resolves to the `GetAccessTokenResponse` Google OAuth2 access token
   */
  getAccessToken (): Promise<GetAccessTokenResponse>;

  /**
   * Retrieves the local-initialized Google OAuth2 client
   * @returns {OAuth2Client | null} local Google OAuth2 client
   */
  get client (): OAuth2Client | null;

  /**
   * Retrieves the email associated with the Google OAuth2 client
   * @returns {string | null} Google OAuth2 client email
   */
  get email (): string | null;

  /**
   * Retrieves the refresh token originally generated from the Google OAuth2 Playground at
   * https://developers.google.com/oauthplayground
   * @returns {string | null} Google OAuth2 refresh token
   */
  get refreshToken (): string | null;
}

