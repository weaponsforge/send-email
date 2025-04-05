import { beforeAll, describe, expect, it } from 'vitest'

import { GmailOAuthClient, send } from '@/lib/index.js'
import { createLongString, createRandomTextArray } from '@/utils/helpers.js'

import { EmailSchemaMessages } from '@/types/email.schema.js'

const MAX_TIMEOUT = 10000
const TEST_RECIPIENT = 'tester@gmail.com'
const TEST_SUBJECT = 'Test Simple Message'

describe('Email format test', () => {
  const oauthClient = new GmailOAuthClient()

  // Generates an access token to use for the succeeding tests
  beforeAll(async () => {
    await oauthClient.generateAccessToken()
  })

  // Testing email formats
  it('should reject invalid email address format', async () => {
    const invalidEmail = 'tester!#5@.4/'

    await expect(
      send(
        {
          recipient: invalidEmail,
          subject: TEST_SUBJECT,
          content: 'Henlo!'
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_EMAIL)
  }, MAX_TIMEOUT)

  // Testing long email addresses
  it('should reject email addresses longer than 150 characters', async () => {
    const longRecipientEmail = createLongString(150) + '@gmail.com'

    await expect(
      send(
        {
          recipient: longRecipientEmail,
          subject: TEST_SUBJECT,
          content: 'Henlo!'
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_EMAIL_LENGTH)
  }, MAX_TIMEOUT)

  // Testing long subject/title content
  it('should reject subject/title longer that 200 characters', async () => {
    const longTitle = createLongString(201)

    await expect(
      send(
        {
          recipient: TEST_RECIPIENT,
          subject: longTitle,
          content: 'Henlo!'
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.SUBJECT)
  }, MAX_TIMEOUT)

  // Testing long email message content
  it('should reject email message content longer than 1500 characters', async () => {
    const longContent = createLongString(1501)

    await expect(
      send(
        {
          recipient: TEST_RECIPIENT,
          subject: TEST_SUBJECT,
          content: longContent
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.CONTENT)
  }, MAX_TIMEOUT)

  // Testing missing recipient AND recipients[]
  it('should reject if recipient or recipients[] are missing', async () => {
    await expect(
      send(
        {
          subject: TEST_SUBJECT,
          content: 'Hello there'
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_REQUIRED)
  }, MAX_TIMEOUT)

  // Test maximum 20 recipients
  it('should reject if recipients[] are more than 20', async () => {
    const emailList = createRandomTextArray({ length: 21, suffix: '@gmail.com' })

    await expect(
      send(
        {
          recipients: emailList,
          subject: TEST_SUBJECT,
          content: 'Hello there'
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_EMAIL_MAX)
  }, MAX_TIMEOUT)

  it('should reject if recipient and recipients[] are more than 20', async () => {
    const emailList = createRandomTextArray({ length: 20, suffix: '@gmail.com' })

    await expect(
      send(
        {
          recipients: emailList,
          recipient: TEST_RECIPIENT,
          subject: TEST_SUBJECT,
          content: 'Hello there'
        },
        oauthClient
      )
    ).rejects.toThrow(EmailSchemaMessages.RECIPIENT_EMAIL_MAX)
  }, MAX_TIMEOUT)
})
