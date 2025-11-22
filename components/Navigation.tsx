'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

// Logo Component
const FademexLogo = ({ className = 'h-8' }: { className?: string }) => (
  <svg
    viewBox="0 0 300 80"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M60 25 L30 50 L0 50 L30 25 Z" fill="#FFD700" />
    <path d="M75 10 L45 35 L15 35 L45 10 Z" fill="#FFC700" />
    <path d="M45 35 L60 25 L90 25 L75 35 Z" fill="#FFB600" />
    <text
      x="100"
      y="52"
      fontFamily="Inter, sans-serif"
      fontWeight="700"
      fontSize="38"
      fill="#FFFFFF"
      letterSpacing="2"
    >
      FADEMEX
    </text>
  </svg>
)

// Navigation configuration
const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Soluciones', href: '/soluciones' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Tecnología', href: '/tecnologia' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Ingeniería', href: '/ingenieria' },
  { label: 'Contacto', href: '/contacto' },
] as const

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 border-b border-transparent ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-white/10 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50" aria-label="FADEMEX - Inicio">
            <FademexLogo className="h-8" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
            {NAV_ITEMS.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wide text-gray-400 hover:bg-white/10 hover:text-accent-gold transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-light text-white hover:text-accent-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
