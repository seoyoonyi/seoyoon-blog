import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from '@/components/common/nav'
import ThemeToggle from '@/components/theme-toggle'
import logo from '@/public/smile.svg'
import { Github } from 'lucide-react'

const Header = () => {
  return (
    <header className='sticky top-0 z-10 border-b bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-[rgba(18,18,18,0.8)] dark:shadow-md'>
      <div className='flex max-w-screen-xl items-center px-4 md:mx-auto md:px-8 lg:px-20'>
        <div className='flex space-x-4'>
          <Link href='/' className='flex items-center space-x-3'>
            <Image src={logo} alt='logo' width={30} height={30} />
            <div className='relative'>
              <span className='block h-4 w-[1px] origin-center rotate-[17deg] bg-black dark:bg-white'></span>
            </div>
            <h1 className='text-2xl font-bold'>Blog</h1>
          </Link>

          <Navbar />
        </div>
        <div className='ml-auto flex space-x-2'>
          <ThemeToggle />
          <a
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/seoyoonyi'
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
