'use client'

import { useEffect, useState } from 'react'

import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Placeholder to prevent layout shift
  if (!mounted) {
    return (
      <Button variant='ghost' className='flex h-9 w-9 items-center justify-center px-2'>
        <div className='h-5 w-5' />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      onClick={toggleTheme}
      variant='ghost'
      className='flex h-9 w-9 items-center justify-center px-2'
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}

export default ThemeToggle
