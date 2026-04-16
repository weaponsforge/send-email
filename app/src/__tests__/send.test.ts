import { describe, expect, test } from 'vitest'
import { send } from '@/lib/index.js'

const MAX_TIMEOUT = 10000
const TEST_RECIPIENT = 'tester@gmail.com'

describe('Send email test', () => {
  // Ensure .env file contains the required GOOGLE_* variables before running tests below
  test('Send a text email', async () => {
    await expect(send({
      recipient: TEST_RECIPIENT,
      subject: 'Test Simple Message',
      content: 'Henlo!',
    })).resolves.toBeUndefined()
  }, MAX_TIMEOUT)

  test('Send a text email to multiple recipients[]', async () => {
    await expect(
      send({
        recipients: ['student1@gmail.com', 'student2@gmail.com'],
        subject: 'Test Multiple Message',
        content: 'Henlo, hello!',
      }),
    ).resolves.toBeUndefined()
  }, MAX_TIMEOUT)

  test('should send email to recipient and recipients[]', async () => {
    await expect(
      send({
        recipients: ['person1@gmail.com', 'person2@gmail.com'],
        recipient: TEST_RECIPIENT,
        subject: 'Test Multiple Message 2',
        content: 'Hello there',
      }),
    ).resolves.toBeUndefined()
  }, MAX_TIMEOUT)
})
