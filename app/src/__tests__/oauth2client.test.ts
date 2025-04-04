import { describe, expect, it } from 'vitest'
import { GmailOAuthClient } from '@/lib/index.js'

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
})
