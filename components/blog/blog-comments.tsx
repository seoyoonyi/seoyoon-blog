'use client'

import { useEffect, useState } from 'react'

const BlogComments = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const getCurrentTheme = () => {
      const htmlClass = document.documentElement.classList
      return htmlClass.contains('dark') ? 'dark' : 'light'
    }

    const checkTheme = () => {
      setTheme(getCurrentTheme())
    }

    checkTheme()

    const observer = new MutationObserver(() => {
      checkTheme()
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
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
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', 'ko')
    script.crossOrigin = 'anonymous'
    script.async = true

    const commentsDiv = document.getElementById('comments-section')
    commentsDiv?.appendChild(script)

    return () => {
      if (commentsDiv?.contains(script)) {
        commentsDiv.removeChild(script)
      }
    }
  }, [theme])

  return <aside id='comments-section' className='giscus' />
}

export default BlogComments
