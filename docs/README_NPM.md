## @weaponsforge/sendemail

NPM library for sending text and HTML emails using Gmail SMTP with Google OAuth2.

### CLI Available

> - **Pre-compiled Windows binaries**<br>
>    Pre-compiled [Windows binaries](https://github.com/weaponsforge/send-email?tab=readme-ov-file#%EF%B8%8F-building-the-windows-executable-file) are available for download in the latest [Releases](https://github.com/weaponsforge/send-email/releases) download page.
>
> - **Docker image**<br>
>   A Docker image is available at https://hub.docker.com/r/weaponsforge/sendemail

### Table of Contents

- [Requirements](#-requirements)
- [Quickstart](#-quickstart)
- [Code Samples](#-code-samples)

## 📋 Requirements

<details>
<summary>👉 Click to expand the list of requirements</summary>

1. NodeJS LTS v24.11.0 or higher
   ```text
   Recommended:
   node: 24.11.0
   npm: 10.9.2
   ```
2. Gmail Account
   - Google Cloud Platform project configured with [OAuth2](https://developers.google.com/workspace/guides/configure-oauth-consent) settings and [credentials](https://developers.google.com/workspace/guides/manage-credentials)
   - Read on the Google [Gmail](https://developers.google.com/gmail/api/guides), [SMTP and OAuth2 Setup](https://github.com/weaponsforge/email-sender?tab=readme-ov-file#using-the-oauth-20-playground) sections for more information

### Core Libraries/Frameworks

(Installed via npm)

1. [googleapis](https://www.npmjs.com/package/googleapis) `v171.4.0` - Manages Gmail token access
2. [nodemailer](https://www.npmjs.com/package/nodemailer) `v8.0.1` - Sends emails using various transport options
3. [commander](https://www.npmjs.com/package/commander) `v14.0.3` - CLI library
4. [sanitize-html](https://www.npmjs.com/package/sanitize-html) `v2.17.1` - Sanitizes WYSIWYG HTML input
5. [zod](https://www.npmjs.com/package/zod) `v3.24.2` - Run-time input validation
6. [ejs](https://www.npmjs.com/package/ejs) `v4.0.1` - Composes HTML with dynamic text content

</details>
<br>

## 🆕 Quickstart

1. Install library.
   ```bash
   npm i @weaponsforge/sendemail
   ```

2. Set up the environment variables. Create a `.env` file in your root project directory with the following:

   <details>
   <summary>👉 Click to view the environment variable definitions</summary>

   | Variable Name | Description |
   | --- | --- |
   | GOOGLE_USER_EMAIL | Your Google email that you've configured for Gmail SMTP and Google OAuth2. |
   | GOOGLE_CLIENT_ID | Google OAuth2 client ID linked with your Google Cloud Platform project. |
   | GOOGLE_CLIENT_SECRET | Google OAuth2 client secret associated with the `GOOGLE_CLIENT_ID`. |
   | GOOGLE_REDIRECT_URI | Allowed Google API redirect URI. Its value is `https://developers.google.com/oauthplayground` by default. |
   | GOOGLE_REFRESH_TOKEN | The initial (or any) refresh token obtained from the [OAuthPlayground](https://developers.google.com/oauthplayground).<br><br>Read on [Using the OAuth 2.0 Playground](https://github.com/weaponsforge/email-sender?tab=readme-ov-file#using-the-oauth-20-playground) for more information about generating a refresh token using the Google OAuth Playground.<br><br><blockquote>_(⚠️ **INFO:** This is an older note; some steps may vary this 2025)_</blockquote> |

   </details>
   <br>

3. Send emails programmatically via code. See the examples under the [Code Samples](#-code-samples) section for more information.

<br>

## 🧾 Code Samples

### A. Send a Text-format Email

```typescript
import { send } from '@weaponsforge/sendemail'

const main = async () => {
   await send({
      recipient: 'tester@gmail.com',
      subject: 'Test Message',
      content: 'How are you?'
   })
}

main()
```

### B. Send an HTML-format Email

```typescript
import { buildHtml, send } from '@weaponsforge/sendemail'

const emails = ['tester@gmail.com', 'admin@gmail.com']

const main = async () => {
   // Build the HTML email content
   const emailContent = await buildHtml({
      content: ['Lorem ipsum dolor sit amet...', 'paragraph #2', 'paragraph #3'],
      recipients: emails,
      sender: process.env.GOOGLE_USER_EMAIL
   })

   // Send the email
   await send({
      subject: 'Welcome Aboard!',
      content: emailContent,
      recipients: emails,
      isHtml: true
   })
}

main()
```

### C. Extend Classes

These are classes that manage the email-sending processes and configurations.

```typescript

// Sends emails using a Nodemailer transporter
import { EmailSender } from '@weaponsforge/sendemail'

// Initializes the Nodemailer transport with Google OAuth2
import { EmailTransport } from '@weaponsforge/sendemail'

// Manages API keys, methods and properties of the Google `OAuth2Client`
import { GmailOAuthClient } from '@weaponsforge/sendemail'

// Wrapper around `ZodObject` and `ZodEffects` zod schemas
import { SchemaValidator } from '@weaponsforge/sendemail'

// eg., extend (or override) the EmailSender class
class MyOAuthClient extends GmailOAuthClient {
  sayHello (name = '') {
    console.log(`Hello, ${name}!`)
  }
}

const client = new MyOAuthClient()

const token = await client.getAccessToken()
client.sayHello('Tester')
```

## References

- Gmail API <sup>[[1]](https://developers.google.com/gmail/api/guides) [[2]](https://github.com/googleapis/google-api-nodejs-client)</sup>
- Gmail Quickstart <sup>[[3]](https://developers.google.com/gmail/api/quickstart/js)</sup>
- AMP for Gmail <sup>[[4]](https://developers.google.com/gmail/ampemail)</sup>
- Google Workspace Guide <sup>[[5]](https://developers.google.com/workspace/guides/get-started)</sup>

@weaponsforge<br>
20260225
