import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='mb-16 max-w-xl md:mx-auto'>
      <ul className='font-sm flex space-x-2 text-neutral-600 dark:text-neutral-300'>
        <li>
          <a
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/seoyoonyi'
          >
            <Github />
          </a>
        </li>
        <li>
          <a
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            rel='noopener noreferrer'
            target='_blank'
            href='https://www.linkedin.com/in/seoyoonyi/'
          >
            <Linkedin />
          </a>
        </li>
      </ul>
      <p className='mt-8 text-neutral-600 dark:text-neutral-300'>
        © {new Date().getFullYear()} Powered by Next.js | MIT Licensed
      </p>
    </footer>
  )
}
