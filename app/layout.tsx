import type { Metadata } from 'next'

import './global.css'
import { baseUrl } from './sitemap'
import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '이서윤 개발 블로그',
    template: '%s | 이서윤 개발 블로그',
  },
  description:
    '배움을 통해 성장하는 프론트엔드 개발자 이서윤의 개발 여정을 공유합니다. 최신 프론트엔드 기술과 작은 프로젝트 경험을 기록하며 발전해 나가고 있습니다.',
  openGraph: {
    title: '이서윤 개발 블로그',
    description:
      '배우고 성장하는 프론트엔드 개발자 이서윤의 기술 블로그입니다. 작은 경험에서 얻은 노하우와 배움을 기록합니다.',
    url: baseUrl,
    siteName: '이서윤 개발 블로그',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '_I4nNbXFbohPBvAiA3d7F7e_59lNJFJ2Lma3KGa5v0w',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head></head>
      <body className='antialiased'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <main className='mb-20 mt-10 flex max-w-screen-xl flex-auto flex-col px-4 md:mx-auto md:px-8 lg:px-20'>
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
