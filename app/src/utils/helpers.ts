import type { ZodIssue } from 'zod'

/**
 * Converts one or more arrays of `ZodError[].message` into one (1) string
 * @param {ZodError[]} errors List of error data from zod `parse` or `safeParse` validation
 * @returns {string} Zod error message(s) in string format
 */
export const zodErrorsToString = (errors: ZodIssue[]): string => {
  return errors.reduce((list, item) => list + item.message + '\n', '')
}

/**
 * Creates a sequence of N-length `"a"` characters
 * @param {number} length String length
 * @returns {string} Long string
 */
export const createLongString = (length: number = 10): string => {
  return Array.from({ length }).map(() => 'a').join('')
}

/**
  * Joins one (1) or more strings into an aray of strings
  * @param {string} text String of text
  * @param {string[]} texts Array containing strings of text
  * @returns {string[]} Array of strings containing the combined parameters
  */
export const stringsToArray = (text: string | undefined, texts: string[] = []): string[] => {
  return [...texts, text]
    .filter(item => item !== undefined)
}
