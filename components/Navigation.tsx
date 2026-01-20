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
        className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled
          ? 'bg-canvas/95 backdrop-blur-xl border-ink/8 shadow-card py-2'
          : 'bg-canvas/80 backdrop-blur border-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50" aria-label="FADEMEX - Inicio">
            <img
              src="/logos/FADEMEX LOGOTIPOS -03.svg"
              alt="FADEMEX"
              className="h-10 md:h-12 lg:h-16 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 bg-canvas-alt/80 backdrop-blur-md px-2 py-1.5 rounded-xl border border-ink/8 shadow-sm">
            {NAV_ITEMS.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 text-ink-light hover:text-ink hover:bg-accent-gold/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/portal/login"
              className="hidden lg:flex items-center px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 bg-ink text-canvas hover:bg-accent-gold hover:text-ink"
            >
              Ingresar
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 text-ink hover:bg-ink/5 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-canvas flex flex-col items-center justify-center space-y-6 overflow-y-auto py-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-ink hover:text-accent-gold-dark transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 pt-8 border-t border-ink/10">
            <Link
              href="/portal/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 rounded-xl bg-ink text-white hover:bg-accent-gold hover:text-ink font-bold transition-all"
            >
              Ingresar
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
