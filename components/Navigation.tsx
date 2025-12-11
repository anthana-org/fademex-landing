'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

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
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-canvas/95 backdrop-blur-xl border-ink/10 shadow-sm py-3'
            : 'bg-canvas/80 backdrop-blur border-ink/5 py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50" aria-label="FADEMEX - Inicio">
            <img
              src="/logos/FADEMEX ISOTIPOS-02.svg"
              alt="FADEMEX"
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 bg-ink/5 backdrop-blur-md px-2 py-1.5 rounded-md border border-ink/10 shadow-sm">
            {NAV_ITEMS.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide transition-all duration-300 text-ink/70 hover:text-ink hover:bg-ink/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink"
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
        <div className="fixed inset-0 z-40 bg-canvas flex flex-col items-center justify-center space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-semibold text-ink hover:text-accent-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
