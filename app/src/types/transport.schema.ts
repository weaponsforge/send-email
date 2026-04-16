import { z } from 'zod'

/**
 * Google OAuth2 settings
 * Uses the `GOOGLE_*` values in the .env file by default.
 */
export const TransportOath2Schema = z.object({
  googleUserEmail: z.string().email().max(150),
  googleClientId: z.string().max(200),
  googleClientSecret: z.string().max(200),
  googleRereshToken: z.string().max(500),
})

export type TransportOath2SchemaType = z.infer<typeof TransportOath2Schema>;
