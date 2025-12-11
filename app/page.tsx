'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import DotMatrixMap from '@/components/DotMatrixMap'
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
    <div className="font-sans text-ink min-h-screen bg-canvas">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-0 w-[720px] h-[720px] bg-highlight/20 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[560px] h-[560px] bg-accent-gold/30 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden bg-gradient-to-br from-accent-gold/15 via-canvas to-canvas text-ink shadow-2xl rounded-b-xl border-b border-ink/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-highlight/20 via-accent-gold/10 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src="/logos/FADEMEX LOGOTIPOS -03.svg"
                    alt="FADEMEX"
                    className="h-24 sm:h-28 md:h-32 w-auto"
                  />
                </div>
              </Reveal>

              <Reveal>
                <div className="inline-flex items-center px-3 py-1 rounded-sm border border-accent-gold/60 bg-accent-gold/25 text-ink text-[10px] font-semibold tracking-[0.2em] mb-8 uppercase">
                  <span className="w-1.5 h-1.5 rounded-sm bg-highlight mr-2 animate-pulse"></span>
                  Sistema Operacional
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink mb-8 leading-[0.9]">
                  Energía{' '}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent-gold to-highlight">
                    Que Transforma.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-xl text-ink/70 mb-10 max-w-lg font-normal leading-relaxed border-l-4 border-accent-gold/80 pl-6">
                  Sistemas solares de grado industrial, almacenamiento inteligente y
                  gestión basada en datos.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4 relative z-30">
                  <a
                    href="#contacto"
                    className="px-8 py-4 bg-accent-gold hover:bg-highlight text-ink font-extrabold rounded-md transition-all flex items-center gap-2 group shadow-[0_20px_40px_rgba(225,235,163,0.35)]"
                  >
                    Inicia Proyecto{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="/soluciones"
                    className="px-8 py-4 border border-ink/20 hover:bg-ink/5 text-ink font-semibold rounded-md transition-all"
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
                      className={`absolute border border-dashed border-ink/15 rounded-full`}
                      style={{
                        inset: `${i * 10}%`,
                        animation: `spin ${30 + i * 10}s linear infinite`,
                      }}
                    ></div>
                  ))}

                  {/* Central Core */}
                  <div className="absolute inset-0 m-auto w-64 h-64 bg-gradient-to-br from-accent-gold/30 to-transparent rounded-full blur-3xl animate-pulse"></div>

                  {/* Floating Cards */}
                  <div
                    className="hidden sm:block absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 lg:top-1/4 lg:right-0 bg-canvas backdrop-blur border border-ink/10 p-2 sm:p-3 md:p-4 rounded-md md:rounded-lg shadow-xl z-20 max-w-[120px] sm:max-w-[140px] md:max-w-none"
                    style={{
                      animation: 'bounce-mobile 4s ease-in-out infinite',
                    }}
                  >
                    <div className="text-[10px] sm:text-xs text-ink/60 uppercase mb-0.5 sm:mb-1 tracking-widest">
                      Potencia Actual
                    </div>
                    <div className="text-base sm:text-xl md:text-2xl text-ink font-bold">
                      8.4 MW
                    </div>
                  </div>

                  <div
                    className="hidden sm:block absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-1/4 lg:left-10 bg-canvas backdrop-blur border border-ink/10 p-3 md:p-4 rounded-md md:rounded-lg shadow-xl z-20 max-w-[140px] md:max-w-none"
                    style={{
                      animation: 'bounce-mobile 5s ease-in-out infinite',
                    }}
                  >
                    <div className="text-xs text-ink/60 uppercase mb-1 tracking-widest">
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce text-ink/60">
          <span className="text-[10px] uppercase tracking-widest mb-2">
            Explora
          </span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Ticker/Stats Strip */}
      <div className="border-y border-ink/10 bg-ink/5 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto flex whitespace-nowrap py-4 overflow-hidden">
          <div
            className="flex gap-16 items-center opacity-70 hover:opacity-100 transition-opacity"
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
                className="flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <Zap className="w-3 h-3 text-ink" /> {tag}
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
                className="flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <Zap className="w-3 h-3 text-ink" /> {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            <Reveal>
              <h2 className="text-sm text-ink font-semibold uppercase tracking-[0.2em] mb-3">
                Ventajas Competitivas
              </h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
                Ingeniería de Precisión.
                <br />
                Resultados Garantizados.
              </h3>
              <p className="text-ink/70 text-lg">
                No solo instalamos paneles; desplegamos infraestructura
                energética crítica diseñada para durar décadas bajo condiciones
                extremas.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '30 Años de Garantía',
                subtitle: 'Generation Performance',
                desc: 'Aseguramos contractualmente que tu sistema producirá energía por encima del 85% incluso después de tres décadas de operación continua.',
                icon: <Shield />,
                metric: '30yr',
              },
              {
                title: 'Financiamiento 0%',
                subtitle: 'Direct Capital Access',
                desc: 'Elimina la barrera de entrada. Modelos de financiamiento directo que permiten que el ahorro energético pague la infraestructura.',
                icon: <BarChart3 />,
                metric: '0% APR',
              },
              {
                title: 'Mantenimiento Integral',
                subtitle: 'Full Service O&M',
                desc: 'Dos años de operación y mantenimiento (O&M) incluidos. Limpieza, termografía de drones y ajuste de torque sin costo adicional.',
                icon: <Settings />,
                metric: '24mo',
              },
              {
                title: 'Plug & Play',
                subtitle: 'Seamless Integration',
                desc: 'Interconexión sin fricción con la red de CFE. Nos encargamos de toda la gestoría, trámites y certificación UVIE.',
                icon: <Activity />,
                metric: '100%',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative p-8 h-full rounded-lg border border-ink/10 bg-canvas shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/20 rounded-bl-xl -mr-8 -mt-8 transition-all group-hover:bg-highlight/25"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-md bg-ink/5 flex items-center justify-center text-ink border border-ink/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-extrabold text-ink/40 group-hover:text-ink transition-colors">
                      {item.metric}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-ink mb-1">
                    {item.title}
                  </h4>
                  <span className="text-xs font-semibold text-ink uppercase tracking-[0.2em] mb-4 block">
                    {item.subtitle}
                  </span>
                  <p className="text-ink/70 leading-relaxed text-sm">
                    {item.desc}
                  </p>

                  {/* Scanning line effect on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-accent-gold w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid - Gateway to all pages */}
      <section className="py-32 relative border-t border-ink/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-sm text-ink font-semibold uppercase tracking-[0.2em] mb-3">
                Nuestras Soluciones
              </h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
                Energía Solar de Grado Industrial
              </h3>
              <p className="text-ink/70 text-lg">
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
                color: 'from-highlight/40 to-transparent',
              },
              {
                title: 'Servicios',
                subtitle: 'Catálogo Completo',
                desc: 'Energía solar, baterías, tecnología lumínica y proyectos especiales.',
                icon: <Zap />,
                href: '/servicios',
                color: 'from-ink/20 to-transparent',
              },
              {
                title: 'Tecnología',
                subtitle: 'Especificaciones Técnicas',
                desc: 'Componentes Tier 1, monitoreo 24/7 y certificaciones internacionales.',
                icon: <Cpu />,
                href: '/tecnologia',
                color: 'from-accent-gold/40 to-transparent',
              },
              {
                title: 'Proyectos',
                subtitle: 'Casos de Éxito',
                desc: 'Más de 450 MW instalados en toda la República Mexicana.',
                icon: <MapPin />,
                href: '/proyectos',
                color: 'from-ink/15 to-transparent',
              },
              {
                title: 'Ingeniería',
                subtitle: 'Metodología',
                desc: 'Proceso certificado en 4 fases: auditoría, diseño, procura y ejecución.',
                icon: <Wrench />,
                href: '/ingenieria',
                color: 'from-highlight/25 to-transparent',
              },
              {
                title: 'Contacto',
                subtitle: 'Agenda Consultoría',
                desc: 'Habla con nuestros ingenieros y obtén una propuesta personalizada.',
                icon: <Activity />,
                href: '/contacto',
                color: 'from-accent-gold/40 to-transparent',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <Link href={item.href}>
                  <div className="group relative p-8 h-full rounded-lg border border-ink/10 bg-canvas shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-md bg-ink/5 flex items-center justify-center text-ink border border-ink/10 group-hover:scale-110 transition-transform mb-6">
                        {item.icon}
                      </div>

                      <h4 className="text-2xl font-extrabold text-ink mb-1">
                        {item.title}
                      </h4>
                      <span className="text-xs font-semibold text-ink uppercase tracking-[0.2em] mb-4 block">
                        {item.subtitle}
                      </span>
                      <p className="text-ink/70 leading-relaxed text-sm mb-6">
                        {item.desc}
                      </p>

                      <div className="flex items-center text-ink text-sm font-semibold group-hover:translate-x-2 transition-transform">
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
      <section className="py-20 bg-canvas text-ink border border-ink/15 rounded-xl mx-4 lg:mx-10 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-ink mb-2">450+</div>
                <div className="text-sm text-ink/60">MW Instalados</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-ink mb-2">150+</div>
                <div className="text-sm text-ink/60">Proyectos Completados</div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-ink mb-2">30</div>
                <div className="text-sm text-ink/60">Años de Garantía</div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-ink mb-2">24/7</div>
                <div className="text-sm text-ink/60">Monitoreo NOC</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-2xl mx-auto text-center">
            <Reveal>
              <h2 className="text-sm text-ink font-semibold uppercase tracking-[0.2em] mb-3">
                Presencia Nacional
              </h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
                Proyectos en Toda la República
              </h3>
              <p className="text-ink/70 text-lg">
                Más de 450 MW instalados en proyectos industriales y comerciales
                a lo largo de México.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="w-full h-[500px] md:h-[600px]">
              <DotMatrixMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-32 border-t border-ink/10 bg-canvas"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-canvas backdrop-blur-xl border border-ink/15 rounded-xl p-8 md:p-16 relative overflow-hidden shadow-2xl text-ink">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/25 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="text-center mb-12 relative z-10">
              <Reveal>
                <h2 className="text-4xl font-extrabold text-ink mb-4">
                  Comienza la Transición
                </h2>
                <p className="text-ink/70">
                  Agenda una sesión técnica con nuestros ingenieros senior.
                </p>
              </Reveal>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
