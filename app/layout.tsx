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
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head></head>
      <body className='font-sans antialiased'>
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
