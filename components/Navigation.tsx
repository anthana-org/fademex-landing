'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
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
  const [loginMenuOpen, setLoginMenuOpen] = useState(false)
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
            <div className="relative hidden lg:block">
              <button
                onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 bg-ink text-canvas hover:bg-accent-gold hover:text-ink"
              >
                Ingresar
                <ChevronDown className={`w-3 h-3 transition-transform ${loginMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {loginMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setLoginMenuOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-ink/5 overflow-hidden py-1 z-40">
                    <Link
                      href="/portal/login"
                      onClick={() => setLoginMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-ink hover:bg-accent-gold/10 transition-colors"
                    >
                      Portal Clientes
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setLoginMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-ink hover:bg-accent-gold/10 border-t border-ink/5 transition-colors"
                    >
                      Administración
                    </Link>
                  </div>
                </>
              )}
            </div>

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

          <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-ink/10 w-64">
            <span className="text-xs font-bold uppercase tracking-widest text-ink/40">Acceso</span>
            <Link
              href="/portal/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 w-full text-center rounded-xl bg-ink/5 hover:bg-accent-gold text-ink font-bold transition-all"
            >
              Portal Clientes
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 w-full text-center rounded-xl bg-ink text-white hover:bg-ink/80 font-bold transition-all"
            >
              Administración
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
