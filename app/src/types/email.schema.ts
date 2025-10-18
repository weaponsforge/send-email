import { z } from 'zod'

export enum EmailSchemaMessages {
  RECIPIENT_EMAIL = 'Please enter valid email address',
  RECIPIENT_EMAIL_LENGTH = 'Email address cannot be longer than 150 characters',
  RECIPIENT_EMAIL_MAX = 'Maximum of 20 recipients allowed',
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
  ).max(20, { message: EmailSchemaMessages.RECIPIENT_EMAIL_MAX })
    .optional(),

  subject: z.string()
    .max(200, { message: EmailSchemaMessages.SUBJECT }),

  content: z.string()
    .max(1500, { message: EmailSchemaMessages.CONTENT }),

  isHtml: z.boolean()
    .default(false)
    .optional()
}).refine(
  (data: IOptionalParams) =>
    data.recipient !== undefined || (data.recipients !== undefined && data.recipients.length > 0),
  { message: EmailSchemaMessages.RECIPIENT_REQUIRED }
)

/**
 * Type representing a validated email object
 * @typedef {object} EmailSenderType
 * @property {string} [recipient] - (Optional) Email address of a recipient that will receive an email. Required if `recipients[]` is undefined.
 * @property {string[]} [recipients] - (Optional) One (1) or more comma-separated email addresses of recipients that will receive an email. Required if `recipient` is undefined.
 * @property {string} subject - Email message title (max 100 characters)
 * @property {string} content - Email message content can can be a simple text or HTML string (max 1500 characters)
 * @property {boolean} isHtml - Flag indicating if the `content` field is in HTML format. Defaults to `false`.
 */
export type EmailType = z.infer<typeof EmailSchema>

/**
 * CommanderJS action parameter types for sending email messages
 * @typedef {object} HtmlEmailParams
 * @property {string} subject - Email subject or title
 * @property {string[]} content - Email message content (text-based)
 * @property {string} recipients - Comma-separated list of email addresses
 */
export interface HtmlEmailParams {
  subject: string;
  content: string;
  recipients: string;
  env?: string;
}

/**
 * Parameter types for building an HTML-form email message
 * @property {string[]} content - List of email message text content in a `string[]` array
 * @property {string[]} recipients - List of email addresses in a `string[]` array
 * @property {string} sender - Sender email address
 */
export interface HtmlEmailBuild extends Omit<
  HtmlEmailParams, 'recipients' | 'content' | 'env'
> {
  content: string[];
  recipients: string[];
  sender: string;
}
