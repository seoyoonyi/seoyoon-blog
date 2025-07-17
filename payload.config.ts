import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN, // 환경변수 존재 여부로 활성화
      collections: {
        media: true,
        'media-with-prefix': {
          prefix: 'my-prefix',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '', // 기본값 추가
    }),
  ],
  collections: [
    {
      slug: 'media',
      admin: {
        useAsTitle: 'filename',
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      upload: {
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 200,
            position: 'centre',
          },
          {
            name: 'card',
            width: 800,
            height: 400,
            position: 'centre',
          },
          {
            name: 'large',
            width: 1200,
            height: 600,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'name',
        description: '블로그 포스트 카테고리를 관리합니다',
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: '카테고리 이름 (예: JavaScript, React)',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL에 사용될 slug (예: javascript, react)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: '카테고리에 대한 설명 (선택사항)',
          },
        },
        {
          name: 'color',
          type: 'text',
          admin: {
            description: '카테고리 색상 (hex 코드, 예: #F7DF1E)',
          },
        },
      ],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'status', 'publishedAt'],
        livePreview: {
          url: ({ data }) =>
            `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/draft?secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}&url=/${data.slug}`,
        },
      },
      versions: {
        drafts: true,
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL에 사용될 slug (예: react-hooks-guide)',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'textarea',
          admin: {
            description:
              '포스트 요약 - 블로그 목록, 검색결과, 소셜미디어 공유시 표시됩니다 (150-300자 권장)',
          },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: '포스트 대표 이미지 (블로그 목록과 소셜 공유에 사용)',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          admin: {
            description: '포스트 카테고리 선택',
          },
        },
        {
          name: 'order',
          type: 'number',
          admin: {
            description: '카테고리 내에서의 순서 (1, 2, 3... 숫자가 작을수록 앞에 표시)',
            step: 1,
          },
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            description: '발행 날짜',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: '임시저장', value: 'draft' },
            { label: '발행됨', value: 'published' },
          ],
          defaultValue: 'draft',
        },
      ],
    },
  ],
})
