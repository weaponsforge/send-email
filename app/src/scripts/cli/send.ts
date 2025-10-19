#!/usr/bin/env node

import { Command } from 'commander'
import dotenv from 'dotenv'

import packageJson from '../../../package.json' with { type: 'json' }
import { CLI_ARGS, CLI_META } from './lib/meta.js'

import { handleSendTextEmail } from './lib/handleText.js'
import { handleSendHtmlEmail } from './lib/handleHtml.js'
import type { EmailHtmlOptions, EmailTextOptions } from '@/types/email.schema.js'

const program = new Command()

program
  .name(CLI_META.PROGRAM.NAME)
  .description(CLI_META.PROGRAM.DESCRIPTION)
  .version(packageJson.version)

// Send text email command
program.command(CLI_META.CMD_SEND_TEXT.NAME)
  .description(CLI_META.CMD_SEND_TEXT.DESCRIPTION)
  .requiredOption(CLI_ARGS.COMMON.SUBJECT.OPTION, CLI_ARGS.COMMON.SUBJECT.DESCRIPTION)
  .requiredOption(CLI_ARGS.CMD_TEXT.CONTENT.OPTION, CLI_ARGS.CMD_TEXT.CONTENT.DESCRIPTION)
  .option(CLI_ARGS.COMMON.ENV_FILE.OPTION, CLI_ARGS.COMMON.ENV_FILE.DESCRIPTION)
  .requiredOption(
    CLI_ARGS.COMMON.RECIPIENTS.OPTION,
    CLI_ARGS.COMMON.RECIPIENTS.DESCRIPTION,
    (val) => val.split(',').map(s => s.trim()).filter(Boolean)
  )
  .action(async (options: EmailTextOptions) => {
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
      const errMsg = (err instanceof Error) ? err.message : 'An unknown error occurred.'
      console.log(`[ERROR]: ${errMsg}`)
    }
  })

// Send HTML-form email command
program.command(CLI_META.CMD_SEND_HTML.NAME)
  .description(CLI_META.CMD_SEND_HTML.DESCRIPTION)
  .requiredOption(CLI_ARGS.COMMON.SUBJECT.OPTION, CLI_ARGS.COMMON.SUBJECT.DESCRIPTION)
  .requiredOption(
    CLI_ARGS.COMMON.RECIPIENTS.OPTION,
    CLI_ARGS.COMMON.RECIPIENTS.DESCRIPTION,
    (val) => val.split(',').map(s => s.trim()).filter(Boolean)
  )
  .option(CLI_ARGS.CMD_HTML.CONTENT_HTML.OPTION, CLI_ARGS.CMD_HTML.CONTENT_HTML.DESCRIPTION)
  .option(CLI_ARGS.CMD_HTML.CONTENT_WYSIWYG.OPTION, CLI_ARGS.CMD_HTML.CONTENT_WYSIWYG.DESCRIPTION)
  .option(CLI_ARGS.COMMON.ENV_FILE.OPTION, CLI_ARGS.COMMON.ENV_FILE.DESCRIPTION)
  .action(async (options: EmailHtmlOptions) => {
    const { env } = options

    // Load user-provided .env file
    if (env) {
      dotenv.config({
        path: env,
        quiet: true
      })
    }

    try {
      await handleSendHtmlEmail(options)
    } catch (err) {
      const errMsg = (err instanceof Error) ? err.message : 'An unknown error occurred.'
      console.log(`[ERROR]: ${errMsg}`)
    }
  })

/**
 * Usage:
 * - npm run send-cli:dev -- send [options]
 * - npx vite-node src\scripts\cli\send.ts help send
 */
program.parse(process.argv)
