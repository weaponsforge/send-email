// CLI metadata
const CLI_META = {
  PROGRAM: {
    NAME: 'send-email',
    DESCRIPTION: 'CLI for sending an email using Gmail SMTP and Google OAuth2'
  },
  CMD_SEND_TEXT: {
    NAME: 'text',
    DESCRIPTION: 'Send a text email to one or multiple recipient/s'
  }
} as const

// CLI command arguments
const CLI_ARGS = {
  SUBJECT: {
    OPTION: '-s, --subject <title>',
    DESCRIPTION: 'email subject or title enclosed in double-quotes'
  },
  CONTENT: {
    OPTION: '-c, --content <text>',
    DESCRIPTION: 'email text content or message enclosed in double-quotes'
  },
  RECIPIENTS: {
    OPTION: '-r, --recipients <emails...>',
    DESCRIPTION: 'comma-separated list of email addresses'
  },
  ENV_FILE: {
    OPTION: '-e, --env <path>',
    DESCRIPTION: 'path to .env file (optional)'
  }
} as const

export {
  CLI_ARGS,
  CLI_META
}
