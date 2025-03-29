
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
   * Generates a Google OAuth2 access token, storing it in the local `this.#accessToken`
   * @returns {Promise<void>}
   */
  generateAccessToken (): Promise<void>;

  /**
   * Validates that the OAuth2 client is initialized
   * @throws {Error} When the OAuth2 client is null
   */
  checkClient (): void;

  /**
   * Sets the value of the local access token
   */
  set accessToken (accessToken: GetAccessTokenResponse | null);

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

  /**
   * Retrieves the local access token if initialized
   * @returns {GetAccessTokenResponse | null} Google Oauth2 access token
   */
  get accessToken (): GetAccessTokenResponse | null;
}

