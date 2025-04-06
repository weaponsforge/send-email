import { z } from 'zod'

export const GmailOAuthAccessTokenSchema = z.object({
  token: z.string(),
  res: z.record(z.any())
})

export const GmailOAuthClientSchema = z.object({
  clientId: z.string().max(200),
  clientSecret: z.string().max(200),
  redirectURI: z.string().max(300),
  refreshToken: z.string().max(500),
  userEmail: z.string().email().max(150),
  accessToken: GmailOAuthAccessTokenSchema.optional()
})
