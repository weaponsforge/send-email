#!/usr/bin/env node

import { Command } from 'commander'
import dotenv from 'dotenv'
import { send } from '@/lib/index.js'

import packageJson from '../../../package.json' with { type: 'json' }
import { CLI_ARGS, CLI_META } from './meta.js'

const program = new Command()

program
  .name(CLI_META.PROGRAM.NAME)
  .description(CLI_META.PROGRAM.DESCRIPTION)
  .version(packageJson.version)

// Send enail command
program.command(CLI_META.CMD_SEND.NAME)
  .description(CLI_META.CMD_SEND.DESCRIPTION)
  .requiredOption(CLI_ARGS.SUBJECT.OPTION, CLI_ARGS.SUBJECT.DESCRIPTION)
  .requiredOption(CLI_ARGS.CONTENT.OPTION, CLI_ARGS.CONTENT.DESCRIPTION)
  .requiredOption(CLI_ARGS.RECIPIENTS.OPTION, CLI_ARGS.RECIPIENTS.DESCRIPTION)
  .option(CLI_ARGS.ENV_FILE.OPTION, CLI_ARGS.ENV_FILE.DESCRIPTION)
  .action(async (options) => {
    let errorMsg
    const { subject, content, recipients, env } = options

    // Load user-provided .env file
    if (env) {
      dotenv.config({ path: env })
    }

    try {
      if (!recipients) {
        throw new Error('Invalid email recipients format')
      }

      const emailRecipients = String(recipients).split(',')
      console.log(`Sending email to: ${recipients}`)

      await send({
        recipients: emailRecipients,
        subject,
        content
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorMsg = `[ERROR]: ${err.message}`
      }
    } finally {
      const exitCode = errorMsg ? 1 : 0
      const exitMsg = errorMsg ?? 'Process success'
      console.log(exitMsg)

      process.exit(exitCode)
    }
  })

/**
 * Usage:
 * - npm run send-cli:dev -- send [options]
 * - npx vite-node src\scripts\cli\send.ts help send
 */
program.parse(process.argv)
