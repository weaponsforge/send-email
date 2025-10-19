import path from 'node:path'
import { directory, copyFiles } from '@/utils/helpers.js'

/**
 * Copies the EJS email templates to the `/dist` directory
 */
const main = () => {
  const currentPath = directory(import.meta.url)
  const outDir = path.resolve(currentPath, '../../../', 'dist', 'templates')
  const templatesDir = path.resolve(currentPath, '../../', 'templates')

  copyFiles(outDir, [
    path.join(templatesDir, 'email.ejs')
  ])
}

main()
