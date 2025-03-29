import { describe, expect, test } from 'vitest'
import { send } from '@/lib'

const MAX_TIMEOUT = 10000
const TEST_RECIPIENT = 'tester@gmail.com'

describe('Send email test', () => {
  test('Send a raw text email', async () => {
    await expect(send({
      recipient: TEST_RECIPIENT,
      subject: 'Test Simple Message',
      content: 'Henlo!'
    })).resolves.toBeUndefined()
  }, MAX_TIMEOUT)
})
