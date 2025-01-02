'use client'

import { useEffect, useState } from 'react'
import React from 'react'

import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'system'
    setTheme(storedTheme as 'light' | 'dark' | 'system')
    if (
      storedTheme === 'dark' ||
      (storedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Button
      onClick={toggleTheme}
      variant='ghost'
      className='flex items-center space-x-2 px-2 [&_svg]:size-auto'
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  )
}

export default ThemeToggle
