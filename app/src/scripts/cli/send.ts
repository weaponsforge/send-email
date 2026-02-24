#!/usr/bin/env node

import sea from 'node:sea'
import { Command } from 'commander'

import packageJson from '../../../package.json' with { type: 'json' }
import { CLI_ARGS, CLI_META } from './lib/meta.js'

import { handleSendTextEmail } from './lib/handleText.js'
import { handleSendHtmlEmail } from './lib/handleHtml.js'
import type { EmailHtmlOptions, EmailTextOptions } from '@/types/email.schema.js'
import { loadEnv, directory } from '@/utils/helpers.js'

const isSea = sea.isSea()

globalThis.__dirname = isSea
  ? process.cwd()
  : directory(import.meta.url)

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
    loadEnv(env)

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
    loadEnv(env)

    try {
      await handleSendHtmlEmail(options)
    } catch (err: unknown) {
      const errMsg = (err instanceof Error) ? err.message : 'An unknown error occurred.'
      console.log(`[ERROR]: ${errMsg}`)
    }
  })

/**
 * Usage:
 * - npm run send-cli:dev -- text [options]
 * - npm run send-cli:dev -- html [options]
 * - npx tsx src\scripts\cli\send.ts help text
 * - npx tsx src\scripts\cli\send.ts help html
 */
program.parse(process.argv)
