export type { OAuth2Client } from 'google-auth-library'
export type { GetAccessTokenResponse } from 'google-auth-library/build/src/auth/oauth2client.js'

/**
 * Optional properties of the `OAuthClient` class constructor.
 * The class constructor uses the values in the .env file by default.
 * @interface IOauth2Client
 * @param {string} [clientId] Google OAuth2 client ID
 * @param {string} [clientSecret] Google OAuth2 secret
 * @param {string} [redirectURI] Google OAuth2 redirect URI. This defaults to the Google OAuth2 Playground at "https://developers.google.com/oauthplayground."
 * @param {string} [refreshToken] Google OAuth2 refresh token retrieved from the Google OAuth2 Playground.
 * @param {string} [userEmail] Google email account that created the `clientId` and `clientSecret`
 */
export interface IOauthClient {
  clientId: string;
  clientSecret: string;
  redirectURI: string;
  refreshToken:string;
  userEmail: string;
}
