'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal } from '@/lib/hooks'
import {
  Check,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Settings,
  Activity,
  Cpu,
  MapPin,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="font-sans text-gray-200 min-h-screen bg-[#050505]">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <Reveal>
                <div className="inline-flex items-center px-3 py-1 rounded border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[10px] font-mono tracking-widest mb-8 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2 animate-pulse"></span>
                  Sistema Operacional
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                  Energía{' '}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-white">
                    Inteligente.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-xl text-gray-400 mb-10 max-w-lg font-light leading-relaxed border-l border-accent-gold/30 pl-6">
                  Diseñamos la infraestructura energética del futuro. Sistemas
                  solares de grado industrial, almacenamiento inteligente y
                  gestión basada en datos.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contacto"
                    className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  >
                    Inicia Proyecto{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/soluciones"
                    className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
                  >
                    Ver Soluciones
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Hero Visual */}
            <div className="lg:w-1/2 relative">
              <Reveal delay={400}>
                <div className="relative w-full aspect-square max-w-[600px]">
                  {/* Rotating Rings */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`absolute border border-dashed border-white/10 rounded-full`}
                      style={{
                        inset: `${i * 10}%`,
                        animation: `spin ${30 + i * 10}s linear infinite`,
                      }}
                    ></div>
                  ))}

                  {/* Central Core */}
                  <div className="absolute inset-0 m-auto w-64 h-64 bg-gradient-to-br from-accent-gold/20 to-transparent rounded-full blur-3xl animate-pulse"></div>

                  {/* Floating Cards */}
                  <div
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 lg:top-1/4 lg:right-0 bg-gray-900/90 backdrop-blur border border-white/10 p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl shadow-2xl z-20 max-w-[120px] sm:max-w-[140px] md:max-w-none"
                    style={{
                      animation: 'bounce-mobile 4s ease-in-out infinite',
                    }}
                  >
                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase mb-0.5 sm:mb-1">
                      Potencia Actual
                    </div>
                    <div className="text-base sm:text-xl md:text-2xl text-white font-mono font-bold">
                      8.4 MW
                    </div>
                  </div>

                  <div
                    className="hidden sm:block absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-1/4 lg:left-10 bg-gray-900/90 backdrop-blur border border-white/10 p-3 md:p-4 rounded-lg md:rounded-xl shadow-2xl z-20 max-w-[140px] md:max-w-none"
                    style={{
                      animation: 'bounce-mobile 5s ease-in-out infinite',
                    }}
                  >
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Estado de Red
                    </div>
                    <div className="flex items-center text-accent-gold text-sm font-bold">
                      <Check className="w-4 h-4 mr-1" /> ESTABLE
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce text-gray-500">
          <span className="text-[10px] uppercase tracking-widest mb-2">
            Explora
          </span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Ticker/Stats Strip */}
      <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto flex whitespace-nowrap py-4 overflow-hidden">
          <div
            className="flex gap-16 items-center opacity-60 hover:opacity-100 transition-opacity"
            style={{
              animation: 'translateX 30s linear infinite',
            }}
          >
            {[
              'ISO 9001 Certified',
              'Tier 1 Manufacturers',
              '24/7 Monitoreo NOC',
              'Zero Export Capability',
              'Peak Shaving Algorithms',
              'Estándares UL',
            ].map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-mono text-accent-gold/80"
              >
                <Zap className="w-3 h-3" /> {tag}
              </div>
            ))}
            {[
              'ISO 9001 Certified',
              'Tier 1 Manufacturers',
              '24/7 Monitoreo NOC',
              'Zero Export Capability',
              'Peak Shaving Algorithms',
              'Estándares UL',
            ].map((tag, i) => (
              <div
                key={`dup-${i}`}
                className="flex items-center gap-2 text-sm font-mono text-accent-gold/80"
              >
                <Zap className="w-3 h-3" /> {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Services Grid - Gateway to all pages */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-sm text-accent-gold font-mono uppercase tracking-widest mb-3">
                Nuestras Soluciones
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Energía Solar de Grado Industrial
              </h3>
              <p className="text-gray-400 text-lg">
                Explora nuestras soluciones integrales de energía renovable
                diseñadas para empresas que buscan eficiencia y sostenibilidad.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Soluciones',
                subtitle: 'Ventajas Competitivas',
                desc: 'Garantía de 30 años, financiamiento 0%, mantenimiento integral y plug & play.',
                icon: <Shield />,
                href: '/soluciones',
                color: 'from-yellow-500/10 to-transparent',
              },
              {
                title: 'Servicios',
                subtitle: 'Catálogo Completo',
                desc: 'Energía solar, baterías, tecnología lumínica y proyectos especiales.',
                icon: <Zap />,
                href: '/servicios',
                color: 'from-blue-500/10 to-transparent',
              },
              {
                title: 'Tecnología',
                subtitle: 'Especificaciones Técnicas',
                desc: 'Componentes Tier 1, monitoreo 24/7 y certificaciones internacionales.',
                icon: <Cpu />,
                href: '/tecnologia',
                color: 'from-purple-500/10 to-transparent',
              },
              {
                title: 'Proyectos',
                subtitle: 'Casos de Éxito',
                desc: 'Más de 450 MW instalados en toda la República Mexicana.',
                icon: <MapPin />,
                href: '/proyectos',
                color: 'from-green-500/10 to-transparent',
              },
              {
                title: 'Ingeniería',
                subtitle: 'Metodología',
                desc: 'Proceso certificado en 4 fases: auditoría, diseño, procura y ejecución.',
                icon: <Wrench />,
                href: '/ingenieria',
                color: 'from-red-500/10 to-transparent',
              },
              {
                title: 'Contacto',
                subtitle: 'Agenda Consultoría',
                desc: 'Habla con nuestros ingenieros y obtén una propuesta personalizada.',
                icon: <Activity />,
                href: '/contacto',
                color: 'from-accent-gold/10 to-transparent',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <Link href={item.href}>
                  <div className="group relative p-8 h-full rounded-2xl border border-white/10 bg-[#0A0A0A] hover:bg-white/5 transition-all duration-500 overflow-hidden cursor-pointer">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-accent-gold border border-white/5 group-hover:scale-110 transition-transform mb-6">
                        {item.icon}
                      </div>

                      <h4 className="text-2xl font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono text-accent-gold/70 uppercase tracking-wide mb-4 block">
                        {item.subtitle}
                      </span>
                      <p className="text-gray-400 leading-relaxed text-sm mb-6">
                        {item.desc}
                      </p>

                      <div className="flex items-center text-accent-gold text-sm font-medium group-hover:translate-x-2 transition-transform">
                        Explorar <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>

                    {/* Scanning line effect on hover */}
                    <div className="absolute bottom-0 left-0 h-[1px] bg-accent-gold w-0 group-hover:w-full transition-all duration-700"></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-black/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">450+</div>
                <div className="text-sm text-gray-400">MW Instalados</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">150+</div>
                <div className="text-sm text-gray-400">Proyectos Completados</div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">30</div>
                <div className="text-sm text-gray-400">Años de Garantía</div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">24/7</div>
                <div className="text-sm text-gray-400">Monitoreo NOC</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl text-center">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  ¿Listo para transformar tu infraestructura energética?
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                  Agenda una sesión técnica con nuestros ingenieros senior y obtén
                  una propuesta personalizada en menos de 48 horas.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contacto"
                    className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  >
                    Iniciar Proyecto
                  </Link>
                  <Link
                    href="/servicios"
                    className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
                  >
                    Ver Catálogo de Servicios
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
