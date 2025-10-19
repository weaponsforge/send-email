import path from 'node:path'
import { directory, copyFiles } from '@/utils/helpers.js'

/**
 * Copies the EJS email templates to the `/dist` directory
 */
const main = async () => {
  const currentPath = directory(import.meta.url)
  const outDir = path.resolve(currentPath, '../../../', 'dist', 'templates')
  const templatesDir = path.resolve(currentPath, '../../', 'templates')

  let errMsg

  try {
    await copyFiles(outDir, [
      path.join(templatesDir, 'email.ejs')
    ])
  } catch (err: unknown) {
    errMsg = (err instanceof Error) ? err.message : 'Something went wrong'
  } finally {
    const exitMsg = errMsg ?? 'Success copying files'
    const exitCode = errMsg ? 1 : 0

    console.log(exitMsg)
    process.exit(exitCode)
  }
}

main()
