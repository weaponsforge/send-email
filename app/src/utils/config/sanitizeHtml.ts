import type { IOptions } from 'sanitize-html'

/**
 * Custom configuration settings for `sanitize-html`
 * https://www.npmjs.com/package/sanitize-html
 * (See Default options)
 */

const config: IOptions = {
  allowedAttributes: {
    '*': ['style'] // allow style attribute on all tags
  },
  allowedStyles: {
    // Allow specific CSS properties on specific tags
    '*': {
      // Layout & box model
      'width': [/^(\d+(?:px|%|em|rem|vh|vw))$/],
      'height': [/^(\d+(?:px|%|em|rem|vh|vw))$/],
      'border': [
        /^(\d+(?:px|em|rem)?\s+(solid|dashed|dotted|double|groove|ridge|inset|outset|none|hidden)\s+(?:#[0-9a-fA-F]{3,6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|[a-z]+))$/
      ],
      'border-radius': [/^(\d+(?:px|%|em|rem)?)$/],
      'padding': [/^(\d+(?:px|%|em|rem)?( ?\d+(?:px|%|em|rem)?)*)$/],
      'margin': [/^(\d+(?:px|%|em|rem|vh|vw)?( ?\d+(?:px|%|em|rem|vh|vw)?)*)$/],

      // Text alignment & color
      'text-align': [/^(left|right|center|justify)$/],
      'background-color': [
        /^(?:#[0-9a-fA-F]{3,6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|(?:transparent|white|black|red|green|blue|yellow|orange|purple|pink|gray|grey|brown|cyan|magenta|lime|navy|teal|olive|maroon|aqua|fuchsia|silver|azure))$/
      ],
      'color': [
        /^(?:#[0-9a-fA-F]{3,6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|(?:transparent|white|black|red|green|blue|yellow|orange|purple|pink|gray|grey|brown|cyan|magenta|lime|navy|teal|olive|maroon|aqua|fuchsia|silver))$/
      ],

      // Font styles
      'font-family': [/^[\w\s'",.-]+$/],
      'font-size': [/^(\d+(?:px|%|em|rem|pt))$/]
    }
  }
}

export default config
