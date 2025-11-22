'use client'

import { useState, useEffect } from 'react'
import ContactForm from '@/components/ContactForm'
import DotMatrixMap from '@/components/DotMatrixMap'
import { Reveal } from '@/lib/hooks'
import {
  Menu,
  X,
  Shield,
  BarChart3,
  Settings,
  Activity,
  Zap,
  Check,
  ChevronDown,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const technicalSpecs = [
    {
      label: 'Eficiencia Panel',
      val: '22.8%',
      desc: 'N-Type TOPCon Technology',
    },
    {
      label: 'Degradación Anual',
      val: '<0.4%',
      desc: 'Garantizada por 30 años',
    },
    {
      label: 'Latencia Monitoreo',
      val: '20ms',
      desc: 'Actualización en tiempo real',
    },
    {
      label: 'Densidad Batería',
      val: '280Ah',
      desc: 'LFP Prismatic Cells',
    },
  ]

  return (
    <div className="font-sans text-gray-200 min-h-screen bg-[#050505]">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 border-b border-transparent ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-white/10 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="relative z-50">
            <FademexLogo className="h-8" />
          </a>

          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
            {[
              'Tecnología',
              'Soluciones',
              'Ingeniería',
              'Proyectos',
              'Contacto',
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wide text-gray-400 hover:bg-white/10 hover:text-accent-gold transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8">
          {[
            'Tecnología',
            'Soluciones',
            'Ingeniería',
            'Proyectos',
            'Contacto',
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-light text-white hover:text-accent-gold"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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
                  <a
                    href="#contacto"
                    className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  >
                    Inicia Proyecto{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#soluciones"
                    className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
                  >
                    Ver Soluciones
                  </a>
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-gray-500">
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

      {/* Competitive Advantages */}
      <section id="soluciones" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            <Reveal>
              <h2 className="text-sm text-accent-gold font-mono uppercase tracking-widest mb-3">
                Ventajas Competitivas
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ingeniería de Precisión.
                <br />
                Resultados Garantizados.
              </h3>
              <p className="text-gray-400 text-lg">
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
                <div className="group relative p-8 h-full rounded-2xl border border-white/10 bg-[#0A0A0A] hover:bg-white/5 transition-all duration-500 overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-accent-gold/20"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-accent-gold border border-white/5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-mono text-2xl font-bold text-gray-600 group-hover:text-white transition-colors">
                      {item.metric}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-accent-gold/70 uppercase tracking-wide mb-4 block">
                    {item.subtitle}
                  </span>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>

                  {/* Scanning line effect on hover */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-accent-gold w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section
        id="tecnología"
        className="py-24 bg-black/30 border-y border-white/5"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Context */}
            <div className="lg:w-1/3">
              <Reveal>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Especificaciones Técnicas
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Utilizamos componentes Tier 1 clasificados por Bloomberg NEF.
                  Cada inversor, panel y estructura es auditada para cumplir
                  con estándares internacionales IEC y UL.
                </p>
                <div className="space-y-4">
                  {technicalSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div>
                        <div className="text-xs text-gray-500 uppercase">
                          {spec.label}
                        </div>
                        <div className="text-xs text-accent-gold/70">
                          {spec.desc}
                        </div>
                      </div>
                      <div className="text-xl font-mono font-bold text-white">
                        {spec.val}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="lg:w-2/3">
              <Reveal delay={200}>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F0F0F]">
                  <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="ml-4 px-3 py-0.5 rounded bg-black/50 text-[10px] text-gray-400 font-mono border border-white/5 flex-1 text-center">
                      dashboard.fademex.cloud/live-view
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Chart Simulation */}
                    <div className="flex items-end justify-between h-48 gap-1 mb-6">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-accent-gold/20 hover:bg-accent-gold transition-colors w-full rounded-t-sm relative group"
                          style={{ height: `${30 + Math.random() * 70}%` }}
                        >
                          {i % 5 === 0 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              {Math.floor(Math.random() * 100)}kW
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded bg-black/40 border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase">
                          Frecuencia de Red
                        </div>
                        <div className="text-lg text-white font-mono">
                          60.02 Hz
                        </div>
                      </div>
                      <div className="p-4 rounded bg-black/40 border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase">
                          Factor de Potencia
                        </div>
                        <div className="text-lg text-white font-mono">
                          0.98 PF
                        </div>
                      </div>
                      <div className="p-4 rounded bg-black/40 border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase">
                          Temperatura
                        </div>
                        <div className="text-lg text-white font-mono">
                          32°C
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="proyectos" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Reveal>
                <h2 className="text-sm text-accent-gold font-mono uppercase tracking-widest mb-3">
                  Cobertura Nacional
                </h2>
                <h3 className="text-4xl font-bold text-white mb-4">
                  Red de Proyectos Activos
                </h3>
                <p className="text-gray-400 max-w-lg">
                  Monitoreamos más de 450 MW de capacidad instalada desde
                  nuestro Centro de Control.
                </p>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="flex gap-6 text-xs font-mono text-gray-400 border border-white/10 px-4 py-2 rounded-lg bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>{' '}
                  OFFLINE
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>{' '}
                  ONLINE
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="w-full aspect-[16/9] md:aspect-[2/1] relative">
              <DotMatrixMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process Timeline */}
      <section id="ingeniería" className="py-24 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-white mb-20">
              Metodología de Implementación
            </h2>
          </Reveal>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-gold/50 to-transparent hidden md:block"></div>

            {[
              {
                step: '01',
                title: 'Auditoría Energética',
                desc: 'Análisis de patrones de consumo (Código de Red 2.0), termografía y modelado de sombras.',
              },
              {
                step: '02',
                title: 'Ingeniería & Diseño',
                desc: 'Diseño CAD/BIM de la estructura, selección de inversores y cálculo de retorno de inversión.',
              },
              {
                step: '03',
                title: 'Procura & Logística',
                desc: 'Importación directa de componentes Tier 1 para evitar intermediarios y asegurar garantía.',
              },
              {
                step: '04',
                title: 'Ejecución & Comisionamiento',
                desc: 'Instalación certificada bajo estándares NOM-001-SEDE. Pruebas de aislamiento y encendido.',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`flex flex-col md:flex-row items-center mb-16 ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="md:w-1/2 p-8">
                    <div
                      className={`bg-white/5 border border-white/10 p-8 rounded-2xl relative hover:border-accent-gold/30 transition-colors ${
                        i % 2 === 0 ? 'text-left' : 'text-left md:text-right'
                      }`}
                    >
                      <span className="absolute -top-4 bg-black border border-white/20 px-3 py-1 rounded text-accent-gold font-mono text-sm font-bold">
                        {item.step}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-black border-2 border-accent-gold rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-32 border-t border-white/5 bg-gradient-to-b from-[#050505] to-[#0a0a0a]"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="text-center mb-12 relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Comienza la Transición
              </h2>
              <p className="text-gray-400">
                Agenda una sesión técnica con nuestros ingenieros senior.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <FademexLogo className="h-6 mb-6" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Soluciones de ingeniería energética para el sector industrial y
                comercial de México.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Soluciones</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Solar Industrial
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Almacenamiento (BESS)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Microgrids
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Consultoría Código de Red
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Compañía</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Casos de Éxito
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Carreras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Noticias
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contacto</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Querétaro, México
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +52 (442) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> info@fademex.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              © 2025 FADEMEX Energy Systems. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400">
                Privacidad
              </a>
              <a href="#" className="hover:text-gray-400">
                Términos
              </a>
              <a href="#" className="hover:text-gray-400">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
