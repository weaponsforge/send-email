import EmailTransport from '@/lib/email/transport.js'
import EmailSender from '@/lib/email/sender.js'
import GmailOAuthClient from '@/lib/google/oauth2client.js'
import SchemaValidator from '@/lib/validator/schemavalidator.js'

export { send } from '@/lib/email/send.js'
export { buildHtml } from '@/lib/email/build.js'

export {
  EmailSender,
  EmailTransport,
  GmailOAuthClient,
  SchemaValidator
}
