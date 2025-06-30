import { Suspense } from 'react'

import { notFound } from 'next/navigation'

import { baseUrl } from '@/app/(app)/sitemap'
import BlogComments from '@/components/blog/blog-comments'
import { MdxComponents } from '@/components/mdx/mdx-components'
import { ViewCount } from '@/components/view-count'
import { getBlogPosts } from '@/lib/api/mdx'
import { formatDate } from '@/lib/utils/date-utils'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className='md:mx-auto md:max-w-[750px]'>
      <section className='mb-10'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'My Portfolio',
              },
            }),
          }}
        />
        <h1 className='title text-2xl font-semibold tracking-tighter'>{post.metadata.title}</h1>
        <div className='mb-8 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(post.metadata.publishedAt)}
          </p>
          <Suspense>
            <ViewCount slug={post.slug} />
          </Suspense>
        </div>

        <section className='prose dark:prose-invert'>
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkA11yEmoji, remarkBreaks],
                rehypePlugins: [
                  [
                    // @ts-ignore
                    rehypePrettyCode,
                    {
                      theme: { dark: 'github-dark-dimmed', light: 'github-light' },
                      keepBackground: false,
                    },
                  ],
                  rehypeSlug,
                ],
              },
            }}
            components={MdxComponents}
          />
        </section>
      </section>

      <BlogComments />
    </article>
  )
}
