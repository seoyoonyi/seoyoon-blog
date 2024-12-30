import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import fs from 'fs'
import path from 'path'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

type Metadata = {
  category: string
  title: string
  publishedAt: string
  summary: string
  image?: string
}

const parseFrontmatter = (fileContent: string) => {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

const getMDXFiles = (dir) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

const readMDXFile = (filePath) => {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

const getMDXData = (dir) => {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export const getBlogPosts = () => {
  return getMDXData(path.join(process.cwd(), 'posts'))
}

export const formatDate = (date: string, includeRelative = false) => {
  const targetDate = dayjs.tz(date, 'Asia/Seoul').locale('en') // 로케일을 'en'으로 설정
  const fullDate = targetDate.format('MMMM DD, YYYY') // 영어로 월 표시

  return fullDate
}
