import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from '@/components/common/nav'
import ThemeToggle from '@/components/theme-toggle'
import logo from '@/public/smile.svg'
import { Github } from 'lucide-react'

const Header = () => {
  return (
    <header className='border-b-1 p-y-2 border px-4'>
      <div className='my-4 flex max-w-xl items-center md:mx-auto'>
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
