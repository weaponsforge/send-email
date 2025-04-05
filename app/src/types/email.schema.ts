import { z } from 'zod'

export enum EmailSchemaMessages {
  RECIPIENT_EMAIL = 'Please enter a valid email address',
  RECIPIENT_EMAIL_LENGTH = 'Email address cannot be longer than 150 characters',
  RECIPIENT_REQUIRED = 'Either recipient or recipients must be provided',
  SUBJECT = 'Subject/title cannot be longer than 200 characters',
  CONTENT = 'Email content cannot be longer than 1500 characters'
}

interface IOptionalParams {
  recipient?: string;
  recipients?: string[];
}

/**
 * Schema for email validation within the `EmailTransport.sendEmail()` method
 * @property {string} [recipient] - (Optional) Email address of a recipient that will receive an email. Required if `recipients[]` is undefined.
 * @property {string[]} [recipients] - (Optional) One (1) or more comma-separated email addresses of of recipients that will receive an email. Required if `recipient` is undefined.
 * @property {string} subject Email message title (max 100 characters)
 * @property {string} content Email message content can can be a simple text or HTML string (max 1500 characters)
 */
export const EmailSchema = z.object({
  recipient: z.string()
    .email({ message: EmailSchemaMessages.RECIPIENT_EMAIL })
    .max(150, { message: EmailSchemaMessages.RECIPIENT_EMAIL_LENGTH })
    .optional(),

  recipients: z.array(
    z.string()
      .email({ message: EmailSchemaMessages.RECIPIENT_EMAIL })
      .max(150, { message: EmailSchemaMessages.RECIPIENT_EMAIL_LENGTH })
  ).optional(),

  subject: z.string()
    .max(200, { message: EmailSchemaMessages.SUBJECT }),

  content: z.string()
    .max(1500, { message: EmailSchemaMessages.CONTENT })
}).refine(
  (data: IOptionalParams) =>
    data.recipient !== undefined || (data.recipients !== undefined && data.recipients.length > 0),
  { message: EmailSchemaMessages.RECIPIENT_REQUIRED }
)

/**
 * Type representing a validated email object
 * @typedef {Object} EmailSenderType
 * @property {string} [recipient] - (Optional) Email address of a recipient that will receive an email. Required if `recipients[]` is undefined.
 * @property {string[]} [recipients] - (Optional) One (1) or more comma-separated email addresses of recipients that will receive an email. Required if `recipient` is undefined.
 * @property {string} subject - Email message title (max 100 characters)
 * @property {string} content - Email message content can can be a simple text or HTML string (max 1500 characters)
 */
export type EmailType = z.infer<typeof EmailSchema>
