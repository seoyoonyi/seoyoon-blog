import { parseFrontmatter } from './parse'
import fs from 'fs'
import path from 'path'

export const getMDXFiles = (dir: string): string[] => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

export const readMDXFile = (filePath: string) => {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

export const getMDXData = (dir: string) => {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}
