// CLI metadata
const CLI_META = {
  PROGRAM: {
    NAME: 'send-email',
    DESCRIPTION: 'CLI for sending an email using Gmail SMTP and Google OAuth2'
  },
  CMD_SEND_TEXT: {
    NAME: 'text',
    DESCRIPTION: 'Send raw text email to one or multiple recipient/s'
  },
  CMD_SEND_HTML: {
    NAME: 'html',
    DESCRIPTION: 'Send paragraphs of text or WYSIWYG content as styled\nHTML email to one or multiple recipient/s.'
  }
} as const

// CLI command arguments
const CLI_ARGS = {
  // Common parameters
  COMMON: {
    SUBJECT: {
      OPTION: '-s, --subject <title>',
      DESCRIPTION: 'email subject or title enclosed in double-quotes'
    },
    RECIPIENTS: {
      OPTION: '-r, --recipients <emails>',
      DESCRIPTION: 'comma-separated list of email addresses'
    },
    ENV_FILE: {
      OPTION: '-e, --env <path>',
      DESCRIPTION: 'path to .env file (optional)'
    }
  },

  // Text content
  CMD_TEXT: {
    CONTENT: {
      OPTION: '-c, --content <text>',
      DESCRIPTION: 'email text content enclosed in double-quotes'
    }
  },

  // HTML content
  CMD_HTML: {
    CONTENT_HTML: {
      OPTION: '-c, --content <text...>',
      DESCRIPTION: 'whitespace-delimited list contaning text/paragraphs enclosed in double-quotes'
    },
    CONTENT_WYSIWYG: {
      OPTION: '-w, --wysiwyg [html]',
      DESCRIPTION: 'optional HTML tags that form a WYSIWYG layout enclosed in double-quotes'
    },
    TEMPLATE_FILE: {
      OPTIONS: '-t, --template [path]',
      DESCRIPTION: 'optional path to an EJS template file'
    }
  }
} as const

export {
  CLI_ARGS,
  CLI_META
}
