'use client'

import React from 'react'

import Link from 'next/link'

import ThemeToggle from '@/components/theme-toggle'
import { Github } from 'lucide-react'

const Header = () => {
  return (
    <header className='h-[72px] bg-white px-4 dark:bg-black'>
      <div className='flex h-full max-w-screen-xl items-center px-4 md:mx-auto md:px-8 lg:px-20'>
        {/* 왼쪽: 이름 + 네비게이션 */}
        <div className='flex items-center gap-2 text-sm'>
          <Link href='/' className='font-semibold hover:text-neutral-600 dark:hover:text-neutral-300'>
            이서윤
          </Link>
          <span className='text-neutral-400'>|</span>
          <Link href='/' className='hover:text-neutral-600 dark:hover:text-neutral-300'>
            Home
          </Link>
          <span className='text-neutral-400'>|</span>
          <Link href='/about' className='hover:text-neutral-600 dark:hover:text-neutral-300'>
            About
          </Link>
          <span className='text-neutral-400'>|</span>
          <Link href='/' className='hover:text-neutral-600 dark:hover:text-neutral-300'>
            Blog
          </Link>
        </div>

        {/* 오른쪽: 테마 토글 + GitHub */}
        <div className='ml-auto flex items-center gap-3'>
          <a
            className='transition-colors hover:text-neutral-600 dark:hover:text-neutral-300'
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/seoyoonyi'
            aria-label='GitHub'
          >
            <Github size={18} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
