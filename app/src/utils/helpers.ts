import { promises as fs } from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'

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

/**
 * @interface IRandomTextArrayParams
 * @param {number} length Number of text elements to create in the array
 * @param {string} [prefix] (Optional) Short text to append at the beginning of each array element
 * @param {string} [suffix] (Optional) Short text to append at the end of each array element
 */
interface IRandomTextArrayParams {
  length: number;
  prefix?: string;
  suffix?: string;
}

/**
 * Creates a variable length Array of strings[] with optional prefix and suffix
 * @param {IRandomTextArrayParams} params Input properties for creating a random string array
 * @returns {string[]} Array of random strings
 */
export const createRandomTextArray = (params: IRandomTextArrayParams) => {
  const { length = 1, prefix = '', suffix = '' } = params

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Array.from({ length }).map(_ =>
    `${prefix}${Math.random().toString(36).substring(2, 8)}${suffix}`
  )
}

/**
 * Get the full file path of the current directory of a module file equivalent to `"__dirname"`
 * @param {string} moduleFile - File URL of the current module being executed: `"import.meta.url"`
 * @returns {string} Full file path to the directory of the calling file/module also know as `__dirname` in CommonJS
 */
export const directory = (moduleFile: string) => {
  return dirname(fileURLToPath(moduleFile))
}

/**
 * Copies files to an output directory
 * @param outDir File path to the output directory
 * @param files Array containing a list of file paths
 */
export const copyFiles = async (outDir: string, files: string[]) => {
  await fs.mkdir(outDir, { recursive: true })

  for (const src of files) {
    const dest = path.join(outDir, path.basename(src))
    await fs.copyFile(src, dest)
    console.log(`Copied to ${dest}`)
  }
}
