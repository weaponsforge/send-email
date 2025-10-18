#!/usr/bin/env node

import { Command } from 'commander'
import dotenv from 'dotenv'

import packageJson from '../../../package.json' with { type: 'json' }
import { CLI_ARGS, CLI_META } from './lib/meta.js'

import { handleSendTextEmail } from './lib/sendText.js'
import type { HtmlEmailParams } from '@/types/email.schema.js'

const program = new Command()

program
  .name(CLI_META.PROGRAM.NAME)
  .description(CLI_META.PROGRAM.DESCRIPTION)
  .version(packageJson.version)
  .option(CLI_ARGS.ENV_FILE.OPTION, CLI_ARGS.ENV_FILE.DESCRIPTION)

// Send text email command
program.command(CLI_META.CMD_SEND_TEXT.NAME)
  .description(CLI_META.CMD_SEND_TEXT.DESCRIPTION)
  .requiredOption(CLI_ARGS.SUBJECT.OPTION, CLI_ARGS.SUBJECT.DESCRIPTION)
  .requiredOption(CLI_ARGS.CONTENT.OPTION, CLI_ARGS.CONTENT.DESCRIPTION)
  .requiredOption(CLI_ARGS.RECIPIENTS.OPTION, CLI_ARGS.RECIPIENTS.DESCRIPTION)
  .action(async (options: HtmlEmailParams) => {
    const { env } = options

    // Load user-provided .env file
    if (env) {
      dotenv.config({
        path: env,
        quiet: true
      })
    }

    try {
      await handleSendTextEmail(options)
    } catch (err: unknown) {
      const errMsg = (err instanceof Error) ? err.message : 'An unknown error occured.'
      console.log(`[ERROR]: ${errMsg}`)
    }
  })

/**
 * Usage:
 * - npm run send-cli:dev -- send [options]
 * - npx vite-node src\scripts\cli\send.ts help send
 */
program.parse(process.argv)
