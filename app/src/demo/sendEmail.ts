import { send } from '@/lib/index.js'

(async () => {
  // TO-DO: Send a text-email from commandline for Issue #8
  await send({
    recipient: 'tester@gmail.com',
    subject: 'Test Message',
    content: 'How are you?'
  })
})()
