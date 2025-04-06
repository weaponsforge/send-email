import { z } from 'zod'
import { describe, expect, it } from 'vitest'
import { GmailOAuthClient } from '@/lib/index.js'
import type { GetAccessTokenResponse } from '@/types/oauth2client.types.js'

describe('Google OAuth2 Client class test', () => {
  it('should generate an access token', async () => {
    const oauthClient = new GmailOAuthClient()
    const token = await oauthClient.getAccessToken()

    expect(token).toHaveProperty('token')
    expect(token).toHaveProperty('res')
  })

  it('should generate and store a new access token', async () => {
    const oauthClient = new GmailOAuthClient()
    await oauthClient.generateAccessToken()

    expect(oauthClient.accessToken).toHaveProperty('token')
    expect(oauthClient.accessToken).toHaveProperty('res')
  })

  it ('should generate an access token using class constructor parameters', async () => {
    const oauthClient = new GmailOAuthClient({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: process.env.GOOGLE_REDIRECT_URI,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      userEmail: process.env.GOOGLE_USER_EMAIL
    })

    const token = await oauthClient.getAccessToken()

    expect(token).toHaveProperty('token')
    expect(token).toHaveProperty('res')
  })

  it ('should throw an error if incorrect schema is provided', async () => {
    // See @/types/oauth2client.schema.ts for the correct schema
    const wrongSchema = z.object({
      hello: z.string(),
      world: z.number()
    })

    expect(() => new GmailOAuthClient(null, wrongSchema)).toThrow()
  })

  it ('should throw an error when manually setting an incorrect access token', async () => {
    const oauthClient = new GmailOAuthClient()

    const accessToken = {
      token: 123, // Expected to be a string
      res: 'hello' // Expected to be an object
    } as unknown as GetAccessTokenResponse

    expect(() =>
      oauthClient.accessToken = accessToken
    ).toThrow()
  })
})
