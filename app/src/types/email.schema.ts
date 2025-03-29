import { z } from 'zod'

export enum EmailSchemaMessages {
  RECIPIENT_EMAIL = 'Please enter a valid email address',
  RECIPIENT_EMAIL_LENGTH = 'Email address cannot be longer than 150 characters',
  SUBJECT = 'Subject/title cannot be longer than 200 characters',
  CONTENT = 'Email content cannot be longer than 1500 characters'
}

/**
 * Schema for email validation within the `EmailTransport.sendEmail()` method
 * @property {string} recipient Email address that will receive an email
 * @property {stirng} subject Email message title (max 100 characters)
 * @property {string} content Email message cotent can can be a simple text or HTML string (max 1500 characters)
 */
export const EmailSchema = z.object({
  recipient: z.string()
    .email({ message: EmailSchemaMessages.RECIPIENT_EMAIL })
    .max(150, { message: EmailSchemaMessages.RECIPIENT_EMAIL_LENGTH }),

  subject: z.string()
    .max(200, { message: EmailSchemaMessages.SUBJECT }),

  content: z.string()
    .max(1500, { message: EmailSchemaMessages.CONTENT })
})

/**
 * Type representing a validated email object
 * @typedef {Object} EmailSenderType
 * @property {string} recipient - Email address that will receive an email
 * @property {string} subject - Email message title (max 100 characters)
 * @property {string} content - Email message cotent can can be a simple text or HTML string (max 1500 characters)
 */
export type EmailType = z.infer<typeof EmailSchema>
