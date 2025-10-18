import type { HtmlEmailParams } from '@/types/email.schema.js'

/**
 * Checks for missing CommanderJS action parameters
 */
export const validateComonArgs = (options: HtmlEmailParams) => {
  const { subject, content, recipients } = options

  if (!subject || !content || !recipients) {
    throw new Error('Invalid agrument/s')
  }
}

/**
 * Formats a comma-separated email list into a string array.
 * @param {string} recipients - Comma-separated list of email addresses
 * @returns {string[]} Array of email addresses
 * @throws {Error} Throws an error if the resulting array has no email elements
 */
export const formatEmails = (recipients: string) => {
  const emails = String(recipients)
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0)

  if (emails.length === 0) {
    throw new Error('No valid email recipients provided')
  }

  return emails
}
