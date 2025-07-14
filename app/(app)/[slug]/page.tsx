import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { baseUrl } from '@/app/(app)/sitemap';
import BlogComments from '@/components/blog/blog-comments';
import { ViewCount } from '@/components/view-count';
import { getPostBySlug } from '@/lib/api/payload';
import { formatDate } from '@/lib/utils/date-utils';
import { RichText } from '@/components/RichText';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, excerpt: description, thumbnail } = post;
  const ogImage = typeof thumbnail === 'object' && thumbnail !== null && 'url' in thumbnail ? thumbnail.url : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

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
  };
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const ogImage = typeof post.thumbnail === 'object' && post.thumbnail !== null && 'url' in post.thumbnail ? post.thumbnail.url : `/og?title=${encodeURIComponent(post.title)}`;

  return (
    <article className="md:mx-auto md:max-w-[750px]">
      <section className="mb-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              datePublished: post.publishedAt,
              dateModified: post.publishedAt,
              description: post.excerpt,
              image: ogImage,
              url: `${baseUrl}/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'My Portfolio',
              },
            }),
          }}
        />
        <h1 className="title text-2xl font-semibold tracking-tighter">{post.title}</h1>
        <div className="mb-8 mt-2 flex items-center justify-between text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.publishedAt)}
          </p>
          <Suspense>
            <ViewCount slug={post.slug} />
          </Suspense>
        </div>

        <section className="prose dark:prose-invert">
          <RichText content={post.content} />
        </section>
      </section>

      <BlogComments />
    </article>
  );
}