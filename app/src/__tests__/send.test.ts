import { describe, expect, test } from 'vitest'
import { send } from '@/lib/index.js'
import { GmailOAuthClient } from '@/lib/index.js'

const MAX_TIMEOUT = 10000
const TEST_RECIPIENT = 'tester@gmail.com'

describe('Send email test', () => {
  test('Send a text email', async () => {
    // Sending email this way auto-generates a fresh access token
    await expect(send({
      recipient: TEST_RECIPIENT,
      subject: 'Test Simple Message',
      content: 'Henlo!'
    })).resolves.toBeUndefined()
  }, MAX_TIMEOUT)

  test('Send a text email using pre-generated OAuth2 access token', async () => {
    const oauthClient = new GmailOAuthClient()
    await oauthClient.generateAccessToken()

    // Sending email this way does not regenerate an access token
    await expect(
      send(
        {
          recipient: TEST_RECIPIENT,
          subject: 'Test Simple Message',
          content: 'Henlo!'
        }, oauthClient
      )
    ).resolves.toBeUndefined()
  }, MAX_TIMEOUT)
})
