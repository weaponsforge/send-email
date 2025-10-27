/**
 * Custom configuration settings for `sanitize-html`
 * https://www.npmjs.com/package/sanitize-html
 * (See Default options)
 */

const config = {
  allowedAttributes: {
    '*': ['style'] // allow style attribute on all tags
  },
  allowedStyles: {
    // Allow specific CSS properties on specific tags
    '*': {
      // Layout & box model
      'width': [/^(\d+(?:px|%|em|rem|vh|vw))$/],
      'height': [/^(\d+(?:px|%|em|rem|vh|vw))$/],
      'border': [/^[\w\s#().-]+$/],
      'border-radius': [/^(\d+(?:px|%|em|rem)?)$/],
      'padding': [/^(\d+(?:px|%|em|rem)?)$/],
      'margin': [/^(\d+(?:px|%|em|rem|vh|vw)?( ?\d+(?:px|%|em|rem|vh|vw)?)*)$/],

      // Text alignment & color
      'text-align': [/^(left|right|center|justify)$/],
      'background-color': [/^[\w\s#().-]+$/],
      'color': [/^[\w\s#().-]+$/],

      // Font styles
      'font-family': [/^[\w\s'",.-]+$/],
      'font-size': [/^(\d+(?:px|%|em|rem|pt))$/]
    }
  }
}

export default config
