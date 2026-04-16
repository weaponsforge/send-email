import { describe, expect, it } from 'vitest'
import EmailTransport from '@/lib/email/transport.js'

describe('EmailTransport test', () => {
  it('should initialize with a null transporter', () => {
    const transport = new EmailTransport()
    expect(transport.transporter).toBeNull()
  })

  it('should throw when getTransportOptions is called before createTransport3LO', () => {
    const transport = new EmailTransport()
    expect(() => transport.getTransportOptions()).toThrow('Transport not initialized')
  })

  it('should throw when googleUserEmail is not a valid email address', async () => {
    const transport = new EmailTransport()

    await expect(
      transport.createTransport3LO({
        googleUserEmail: 'not-an-email',
        googleClientId: 'some-client-id',
        googleClientSecret: 'some-secret',
        googleRefreshToken: 'some-refresh-token',
      }),
    ).rejects.toThrow()
  })

  it('should have a non-null transporter after createTransport3LO with valid credentials', async () => {
    const transport = new EmailTransport()

    await transport.createTransport3LO({
      googleUserEmail: process.env.GOOGLE_USER_EMAIL || 'user@gmail.com',
      googleClientId: process.env.GOOGLE_CLIENT_ID || 'client-id',
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client-secret',
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN || 'refresh-token',
    })

    expect(transport.transporter).not.toBeNull()
  })

  it('should expose transport options after createTransport3LO', async () => {
    const transport = new EmailTransport()

    await transport.createTransport3LO({
      googleUserEmail: process.env.GOOGLE_USER_EMAIL || 'user@gmail.com',
      googleClientId: process.env.GOOGLE_CLIENT_ID || 'client-id',
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client-secret',
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN || 'refresh-token',
    })

    const options = transport.getTransportOptions()
    expect(options).toBeDefined()
    expect(options.host).toBe('smtp.gmail.com')
    expect(options.port).toBe(465)
    expect(options.secure).toBe(true)
  })
})
