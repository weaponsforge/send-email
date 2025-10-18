import { send } from '@/lib/index.js'
import { buildHtml } from '@/lib/index.js'

import dataJson from '../templates/data.json' with { type: 'json' }

(async () => {
  if (!process.env.GOOGLE_USER_EMAIL) {
    throw new Error('GOOGLE_USER_EMAIL .env variable is required')
  }

  // Build the HTML email content
  const emailContent = await buildHtml({
    subject: dataJson.subject,
    content: [dataJson.content],
    recipients: dataJson.recipients,
    sender: process.env.GOOGLE_USER_EMAIL
  })

  // Send the email
  await send({
    subject: dataJson.subject,
    content: emailContent,
    recipients: dataJson.recipients,
    isHtml: true
  })
})()
