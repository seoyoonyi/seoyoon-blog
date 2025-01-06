'use client'

import { useRef, useState } from 'react'

interface PreProps {
  children?: React.ReactNode
  props?: React.HTMLAttributes<HTMLPreElement>
}

const CodeBlock = ({ children, ...props }: PreProps) => {
  const preRef = useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyText = async () => {
    const text = preRef.current?.innerText
    await navigator.clipboard.writeText(text ?? '')

    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <div className='group relative'>
      <pre {...props} ref={preRef}>
        {children}
      </pre>
      <button
        onClick={handleCopyText}
        className='absolute right-2 top-2 hidden rounded bg-neutral-200 px-2 py-1 text-xs group-hover:block dark:bg-neutral-600'
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

export default CodeBlock
