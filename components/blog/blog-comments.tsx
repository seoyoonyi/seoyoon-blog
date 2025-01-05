'use client'

import { useEffect } from 'react'

import { useTheme } from 'next-themes'

const BlogComments = () => {
  const { theme } = useTheme()

  useEffect(() => {
    const commentsDiv = document.getElementById('comments-section')
    if (commentsDiv) {
      commentsDiv.innerHTML = ''
    }

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'seoyoonyi/seoyoon-blog')
    script.setAttribute('data-repo-id', 'R_kgDONhQ84g')
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', 'DIC_kwDONhQ84s4CltrM')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', theme ?? 'light') // null 방지
    script.setAttribute('data-lang', 'ko')
    script.crossOrigin = 'anonymous'
    script.async = true

    commentsDiv?.appendChild(script)
  }, [theme])

  return <aside id='comments-section' className='giscus' />
}

export default BlogComments
