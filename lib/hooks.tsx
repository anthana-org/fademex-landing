'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

export const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold }
    )

    const current = domRef.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [threshold])

  return [domRef, isVisible] as const
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const [ref, isVisible] = useScrollReveal()
  const delayStyle = { transitionDelay: `${delay}ms` }

  return (
    <div
      ref={ref}
      style={delayStyle}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  )
}
