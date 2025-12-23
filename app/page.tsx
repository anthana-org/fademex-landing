'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import MexicoMap from '@/components/MexicoMap'
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
        className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden"
      >
        {/* Enhanced Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-canvas to-canvas"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-highlight/15 via-transparent to-accent-gold/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 mt-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <Reveal>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-gold bg-accent-gold/20 text-ink text-[11px] font-semibold tracking-[0.15em] mb-8 uppercase shadow-sm relative z-30">
                  <span className="w-2 h-2 rounded-full bg-accent-gold mr-2.5 animate-pulse"></span>
                  Sistema Operacional
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-4 leading-[1.1]">
                  Energía{' '}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold-dark via-accent-gold to-highlight">
                    Que Transforma.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/logos/FADEMEX LOGOTIPOS -03.svg"
                    alt="FADEMEX"
                    className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto"
                  />
                </div>
              </Reveal>

              <Reveal delay={200}>
                <p className="flex items-start gap-3 text-base md:text-lg text-ink/70 mb-6 max-w-xl font-normal leading-relaxed">
                  <span className="mt-0.5 w-1.5 h-10 bg-accent-gold rounded-full flex-shrink-0 shadow-[0_2px_6px_rgba(45,47,48,0.25)]"></span>
                  <span>
                    Sistemas solares de grado industrial, almacenamiento inteligente y
                    gestión basada en datos.
                  </span>
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4 relative z-30">
                  <a
                    href="#contacto"
                    className="px-8 py-4 bg-accent-gold hover:bg-accent-gold-dark text-ink font-bold rounded-xl transition-all flex items-center gap-2 group shadow-button hover:shadow-button-hover"
                  >
                    Inicia Proyecto{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="/soluciones"
                    className="px-8 py-4 bg-canvas-alt border border-ink/10 hover:border-ink/20 hover:bg-canvas text-ink font-semibold rounded-xl transition-all shadow-card hover:shadow-card-hover"
                  >
                    Ver Soluciones
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Hero Visual */}
            <div className="lg:w-1/2 relative">
              <Reveal delay={400}>
                <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
                  {/* Hero Image - Solar Panels */}
                  <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 ease-out group">
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent z-10"></div>
                    <img
                      src="/hero-solar.png"
                      alt="Instalación Solar Industrial"
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    />
                  </div>

                  {/* Floating Cards - Enhanced */}
                  <div
                    className="hidden sm:block absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 lg:top-1/4 lg:right-0 bg-canvas-alt/90 backdrop-blur-lg border border-ink/8 p-3 sm:p-4 md:p-5 rounded-2xl shadow-card-lg z-20 max-w-[130px] sm:max-w-[150px] md:max-w-none"
                    style={{
                      animation: 'bounce-mobile 4s ease-in-out infinite',
                    }}
                  >
                    <div className="text-[10px] sm:text-xs text-ink-light uppercase mb-1 sm:mb-1.5 tracking-wider font-medium">
                      Potencia Actual
                    </div>
                    <div className="text-lg sm:text-2xl md:text-3xl text-ink font-bold">
                      8.4 <span className="text-accent-gold text-sm font-semibold">MW</span>
                    </div>
                  </div>

                  <div
                    className="hidden sm:block absolute bottom-4 left-4 md:bottom-12 md:left-0 lg:bottom-20 lg:-left-12 bg-canvas-alt/90 backdrop-blur-lg border border-ink/8 p-3 md:p-5 rounded-2xl shadow-card-lg z-20 max-w-[180px] md:max-w-[220px]"
                    style={{
                      animation: 'bounce-mobile 5s ease-in-out infinite',
                    }}
                  >
                    <div className="text-xs text-ink-light uppercase mb-1.5 tracking-wider font-medium">
                      Impacto Ambiental
                    </div>
                    <div className="flex flex-col text-accent-gold-dark text-sm font-bold leading-tight">
                      <span className="text-2xl md:text-3xl font-extrabold text-ink">CO2</span>
                      <span>Impacto Positivo</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce text-ink-light">
          <span className="text-[10px] uppercase tracking-widest mb-2 font-medium">
            Explora
          </span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Ticker/Stats Strip */}
      <div className="border-y border-ink/8 bg-canvas-alt/50 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto flex whitespace-nowrap py-5 overflow-hidden">
          <div
            className="flex gap-16 items-center"
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
                className="flex items-center gap-2.5 text-sm font-medium text-ink-light"
              >
                <Zap className="w-3.5 h-3.5 text-accent-gold" /> {tag}
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
                className="flex items-center gap-2.5 text-sm font-medium text-ink-light"
              >
                <Zap className="w-3.5 h-3.5 text-accent-gold" /> {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <Reveal>
              <span className="inline-block text-sm text-accent-gold font-semibold uppercase tracking-widest mb-4">
                Ventajas Competitivas
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-6 leading-tight">
                Ingeniería de Precisión.
                <br />
                Resultados Garantizados.
              </h3>
              <p className="text-ink-light text-lg leading-relaxed">
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
                icon: <Shield className="w-5 h-5" />,
                metric: '30yr',
              },
              {
                title: 'Financiamiento 0%',
                subtitle: 'Direct Capital Access',
                desc: 'Elimina la barrera de entrada. Modelos de financiamiento directo que permiten que el ahorro energético pague la infraestructura.',
                icon: <BarChart3 className="w-5 h-5" />,
                metric: '0% APR',
              },
              {
                title: 'Mantenimiento Integral',
                subtitle: 'Full Service O&M',
                desc: 'Dos años de operación y mantenimiento (O&M) incluidos. Limpieza, termografía de drones y ajuste de torque sin costo adicional.',
                icon: <Settings className="w-5 h-5" />,
                metric: '24mo',
              },
              {
                title: 'Plug & Play',
                subtitle: 'Seamless Integration',
                desc: 'Interconexión sin fricción con la red de CFE. Nos encargamos de toda la gestoría, trámites y certificación UVIE.',
                icon: <Activity className="w-5 h-5" />,
                metric: '100%',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative p-7 h-full rounded-2xl border border-ink/8 bg-canvas-alt shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-gold/15 to-transparent rounded-bl-3xl -mr-4 -mt-4 transition-all group-hover:from-accent-gold/25"></div>

                  <div className="flex justify-between items-start mb-5">
                    <div className="w-11 h-11 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold-dark border border-accent-gold/20 group-hover:scale-110 group-hover:bg-accent-gold/15 transition-all">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-bold text-ink/30 group-hover:text-accent-gold transition-colors">
                      {item.metric}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-ink mb-1">
                    {item.title}
                  </h4>
                  <span className="text-xs font-medium text-ink-light uppercase tracking-wider mb-4 block">
                    {item.subtitle}
                  </span>
                  <p className="text-ink-light leading-relaxed text-sm">
                    {item.desc}
                  </p>

                  {/* Accent line on hover */}
                  <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent-gold to-highlight w-0 group-hover:w-full transition-all duration-500"></div>
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
                desc: 'Proyectos instalados en toda la República Mexicana.',
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
      </section >

      {/* Quick Stats */}
      < section className="py-20 bg-canvas text-ink border border-ink/15 rounded-xl mx-4 lg:mx-10 shadow-2xl" >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-ink mb-2">8.4</div>
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
      </section >

      {/* Interactive Map Section */}
      < section className="py-32 relative" >
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
                Proyectos industriales y comerciales a lo largo de México.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="w-full h-[500px] md:h-[600px]">
              <MexicoMap />
            </div>
          </Reveal>
        </div>
      </section >

      {/* Contact Section */}
      < section
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
      </section >

      <Footer />
    </div >
  )
}
