#!/usr/bin/env node

import { Command } from 'commander'
import dotenv from 'dotenv'
import { send } from '@/lib/index.js'

import packageJson from '../../../package.json' with { type: 'json' }
import { CLI_ARGS, CLI_META } from './meta.js'

const program = new Command()
  .exitOverride() // Throw errors instead of exiting

program
  .name(CLI_META.PROGRAM.NAME)
  .description(CLI_META.PROGRAM.DESCRIPTION)
  .version(packageJson.version)

// Send email command
program.command(CLI_META.CMD_SEND.NAME)
  .description(CLI_META.CMD_SEND.DESCRIPTION)
  .requiredOption(CLI_ARGS.SUBJECT.OPTION, CLI_ARGS.SUBJECT.DESCRIPTION)
  .requiredOption(CLI_ARGS.CONTENT.OPTION, CLI_ARGS.CONTENT.DESCRIPTION)
  .requiredOption(CLI_ARGS.RECIPIENTS.OPTION, CLI_ARGS.RECIPIENTS.DESCRIPTION)
  .option(CLI_ARGS.ENV_FILE.OPTION, CLI_ARGS.ENV_FILE.DESCRIPTION)
  .action(async (options: Record<string, string>) => {
    const { subject, content, recipients, env } = options

    if (!subject || !content || !recipients) {
      throw new Error('Invalid agrument/s')
    }

    // Load user-provided .env file
    if (env) {
      dotenv.config({
        path: env,
        quiet: true
      })
    }

    try {
      const emailRecipients = String(recipients)
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0)

      if (emailRecipients.length === 0) {
        throw new Error('No valid email recipients provided')
      }

      console.log(`Sending email to: ${recipients}`)

      await send({
        recipients: emailRecipients,
        subject,
        content
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`[ERROR]: ${err.message}`)
        throw err.message
      }
    }

    console.log('Process success')
  })

/**
 * Usage:
 * - npm run send-cli:dev -- send [options]
 * - npx vite-node src\scripts\cli\send.ts help send
 */
program.parse(process.argv)
