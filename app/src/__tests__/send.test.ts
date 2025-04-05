import { beforeAll, describe, expect, test } from 'vitest'
import { send } from '@/lib/index.js'
import { GmailOAuthClient } from '@/lib/index.js'

const MAX_TIMEOUT = 10000
const TEST_RECIPIENT = 'tester@gmail.com'

describe('Send email test', () => {
  const oauthClient = new GmailOAuthClient()

  // Generates an access token to use for the succeeding tests
  beforeAll(async () => {
    await oauthClient.generateAccessToken()
  })

  test('Send a text email', async () => {
    // Sending email this way auto-generates a fresh access token
    await expect(send({
      recipient: TEST_RECIPIENT,
      subject: 'Test Simple Message',
      content: 'Henlo!'
    })).resolves.toBeUndefined()
  }, MAX_TIMEOUT)

  test('Send a text email using pre-generated OAuth2 access token', async () => {
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

  test('Send a text email to multiple recipients[]', async () => {
    await expect(
      send(
        {
          recipients: ['student1@gmail.com', 'student2@gmail.com'],
          subject: 'Test Multiple Message',
          content: 'Henlo, hello!'
        }, oauthClient
      )
    ).resolves.toBeUndefined()
  }, MAX_TIMEOUT)

  test('should send email if there are both recipient and recipients[]', async () => {
    await expect(
      send(
        {
          recipients: ['person1@gmail.com', 'person2@gmail.com'],
          recipient: TEST_RECIPIENT,
          subject: 'Test Multiple Message 2',
          content: 'Hello there'
        },
        oauthClient
      )
    ).resolves.toBeUndefined()
  }, MAX_TIMEOUT)
})
