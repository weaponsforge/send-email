import { z } from 'zod'

/**
 * Schema for email validation within the `EmailTransport.sendEmail()` method
 * @property {string} recipient Email address that will receive an email
 * @property {stirng} subject Email message title (max 100 characters)
 * @property {string} content Email message cotent can can be a simple text or HTML string (max 1500 characters)
 */
export const EmailSchema = z.object({
  recipient: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().max(200),
  content: z.string().max(1500)
})

/**
 * Type representing a validated email object
 * @typedef {Object} EmailSenderType
 * @property {string} recipient - Email address that will receive an email
 * @property {string} subject - Email message title (max 100 characters)
 * @property {string} content - Email message cotent can can be a simple text or HTML string (max 1500 characters)
 */
export type EmailType = z.infer<typeof EmailSchema>
