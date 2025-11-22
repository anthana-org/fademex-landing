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

// Navigation configuration - matches page section order
const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Tecnología', href: '#tecnologia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Ingeniería', href: '#ingenieria' },
  { label: 'Contacto', href: '#contacto' },
] as const

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
    window.addEventListener('scroll', handleScroll, { passive: true })
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
          <a href="#inicio" className="relative z-50" aria-label="FADEMEX - Inicio">
            <FademexLogo className="h-8" />
          </a>

          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wide text-gray-400 hover:bg-white/10 hover:text-accent-gold transition-all duration-300"
              >
                {item.label}
              </a>
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
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-light text-white hover:text-accent-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

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

      {/* Services Catalog Section */}
      <section id="servicios" className="py-32 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          {/* Main Title */}
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm text-accent-gold font-mono uppercase tracking-widest mb-3">
                Catálogo de Soluciones Energéticas 2025
              </h2>
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-6">
                CATÁLOGO DE SERVICIOS
              </h3>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Consultoría y Energía Solar 360°
              </p>
            </Reveal>
          </div>

          {/* 01. ENERGÍA SOLAR */}
          <div className="mb-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-6xl font-bold text-accent-gold/20">01.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  ENERGÍA SOLAR
                </h3>
              </div>
            </Reveal>

            {/* Main Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <Reveal delay={100}>
                <div className="bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/20 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    ENERGÍA QUE TRANSFORMA.
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Somos Fademex. Una empresa mexicana especializada en paneles
                    solares y consultoría energética 360°, ofrecemos soluciones
                    integrales para optimizar el consumo eléctrico en empresas y
                    fomentar el uso de energías limpias.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Nos especializamos en hacer análisis energéticos en las empresas,
                    cada vez acercándonos más a ser referentes de sostenibilidad y
                    energía limpia en México.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-6">
                    APLICACIONES DE ENERGÍA SOLAR
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Impulsamos la transición energética de las empresas a través de
                    la venta e instalación de paneles solares de alto rendimiento.
                    Más que un proveedor, somos una consultoría energética 360° que
                    analiza a fondo el consumo y las oportunidades de cada cliente
                    para diseñar soluciones personalizadas que maximizan el ahorro,
                    optimizan la eficiencia y contribuyen a un futuro más sustentable.
                  </p>
                  <p className="text-sm text-accent-gold">
                    A continuación te mostramos los servicios que ofrecemos en
                    energía solar.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Solar Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                'CONSULTORÍA ENERGÉTICA',
                'INSTALACIÓN DE PANELES SOLARES',
                'MONITOREO Y SISTEMAS INTELIGENTES',
                'FINANCIAMIENTO Y GESTIÓN ENERGÉTICA',
              ].map((service, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all group">
                    <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors">
                      <Zap className="w-6 h-6 text-accent-gold" />
                    </div>
                    <h5 className="text-sm font-bold text-white uppercase tracking-wide">
                      {service}
                    </h5>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Brands Section */}
            <Reveal>
              <div className="bg-gradient-to-r from-black/80 to-black/60 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl mb-16">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent-gold font-bold tracking-widest text-sm">01. ENERGÍA SOLAR</span>
                </div>

                <h4 className="text-3xl md:text-4xl font-bold text-white mb-12 max-w-2xl">
                  NUESTRAS MARCAS DE <span className="text-accent-gold">PANELES SOLARES</span> E INVERSORES
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">

                  {/* Center Divider for large screens */}
                  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>

                  {/* Left Column: Solar Panels */}
                  <div>
                    <h5 className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-8 border-b border-white/10 pb-4">
                      PANELES SOLARES DE 580 W A 660W
                    </h5>

                    {/* Solar Logos Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { name: 'Longi', url: 'https://logo.clearbit.com/longi.com' },
                        { name: 'Trina Solar', url: 'https://logo.clearbit.com/trinasolar.com' },
                        { name: 'Jinko Solar', url: 'https://logo.clearbit.com/jinkosolar.com' },
                        { name: 'JA Solar', url: 'https://logo.clearbit.com/jasolar.com' },
                        { name: 'Canadian Solar', url: 'https://logo.clearbit.com/canadiansolar.com' },
                        { name: 'First Solar', url: 'https://logo.clearbit.com/firstsolar.com' },
                      ].map((brand, i) => (
                        <div
                          key={i}
                          className="group bg-white rounded-xl p-4 flex items-center justify-center h-20 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                          <img
                            src={brand.url}
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity filter contrast-125"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "https://via.placeholder.com/150x50?text=" + brand.name
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Inverters */}
                  <div>
                    <h5 className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-8 border-b border-white/10 pb-4">
                      INVERSORES
                    </h5>

                    {/* Inverter List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                      {[
                        {
                          name: 'Fronius',
                          url: 'https://logo.clearbit.com/fronius.com',
                          origin: 'MADE IN AUSTRIA',
                          flag: '🇦🇹'
                        },
                        {
                          name: 'Huawei',
                          url: 'https://logo.clearbit.com/huawei.com',
                          origin: 'MADE IN CHINA',
                          flag: '🇨🇳'
                        },
                        {
                          name: 'SMA',
                          url: 'https://logo.clearbit.com/sma.de',
                          origin: 'MADE IN GERMANY',
                          flag: '🇩🇪'
                        },
                      ].map((inv, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                          <div className="bg-white rounded-xl p-4 w-full h-24 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <img
                              src={inv.url}
                              alt={inv.name}
                              className="max-h-12 max-w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://via.placeholder.com/150x50?text=" + inv.name
                              }}
                            />
                          </div>

                          {/* Flag and Text */}
                          <div className="space-y-1">
                            <div className="text-2xl">{inv.flag}</div>
                            <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                              {inv.origin}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </Reveal>

            {/* Installation Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Reveal delay={100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    INSTALACIONES COMERCIALES
                  </h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Seleccionamos la planificación de componentes óptima para
                    asegurar la máxima eficiencia y longevidad de tu sistema
                    comercial a lo largo de los años. Nuestras instalaciones
                    comerciales cumplen con nuestros estándares y directrices,
                    respetando las normativas actuales.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-gold" />
                      Instalaciones en lámina, losa, sin perforaciones, terracería
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-gold" />
                      Disponible como Carport y BIPV (Building Integrated
                      Photovoltaic)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-gold" />
                      Componentes de máxima eficiencia
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    INSTALACIONES INDUSTRIALES
                  </h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Seleccionamos la planificación óptima de componentes para
                    asegurar la máxima eficiencia y durabilidad de tu sistema
                    industrial de alta resistencia.
                  </p>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    Nuestras instalaciones comerciales cumplen con los estándares y
                    lineamientos de conformidad con las normativas actuales vigentes.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 rounded text-sm text-accent-gold font-bold">
                      Fronius Symo
                    </div>
                    <div className="px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 rounded text-sm text-accent-gold font-bold">
                      SMA CORE1
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 02. BATERÍAS */}
          <div className="mb-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-6xl font-bold text-accent-gold/20">02.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  BATERÍAS
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <Reveal delay={100}>
                <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-white mb-6">
                    SISTEMAS DE ALMACENAMIENTO DE ENERGÍA
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-bold text-accent-gold uppercase mb-2">
                        REDUCCIÓN DE PICOS DE DEMANDA (PEAK SHAVING - TIME SHIFTING)
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Las baterías almacenan energía en períodos de bajo consumo y
                        la liberan en horarios punta, reduciendo costos operativos y
                        evitando cargos por alta demanda.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-accent-gold uppercase mb-2">
                        CONTINUIDAD OPERATIVA
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Las baterías aseguran operación continua al activar energía de
                        respaldo inmediatamente ante cortes, protegiendo procesos
                        sensibles y evitando tiempos de inactividad.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-accent-gold uppercase mb-2">
                        AUTONOMÍA Y PROTECCIÓN ANTE VARIACIONES
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Ofrecen respaldo en caso de fluctuaciones de voltaje,
                        garantizando estabilidad para equipos críticos y prolongando
                        la vida útil de la maquinaria.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="inline-block px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 rounded-lg mb-4">
                      <span className="text-sm text-accent-gold font-bold uppercase">
                        Distribuidores Oficiales de Fortress Power
                      </span>
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-6">
                    <h5 className="text-xl font-bold text-white mb-2">
                      eSpire 280
                    </h5>
                    <p className="text-gray-400 text-sm">
                      Energía nominal 279,5 kWh
                    </p>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    BATERÍAS COMERCIALES E INDUSTRIALES
                  </h4>
                  <p className="text-gray-300 mb-6">
                    Almacenamiento inteligente y limpio para energías renovables.
                  </p>
                  <div className="space-y-2 text-sm">
                    {[
                      'AUTONOMÍA Y PROTECCIÓN ANTE VARIACIONES',
                      'CONTINUIDAD OPERATIVA',
                      'REDUCCIÓN DE PICOS DE DEMANDA',
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-accent-gold"
                      >
                        <Check className="w-4 h-4" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 03. TECNOLOGÍA LUMÍNICA */}
          <div className="mb-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-6xl font-bold text-accent-gold/20">03.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  TECNOLOGÍA LUMÍNICA
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Reveal delay={100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-white mb-6">
                    APLICACIONES DE TECNOLOGÍA LUMÍNICA INDUSTRIAL Y COMERCIAL
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Soluciones profesionales en iluminación industrial y comercial
                    para todo tipo de espacios.
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Junto a ello se ofrece servicios de instalaciones
                    electromecánicas para proyectos nuevos o existentes, estudios de
                    iluminación y consultoría energética y plataformas para
                    controlar, automatizar y monitorear equipos inteligentes.
                  </p>
                  <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-4">
                    <div className="text-xs text-accent-gold font-mono uppercase mb-2">
                      Certificaciones
                    </div>
                    <div className="flex gap-3">
                      <div className="px-3 py-1 bg-accent-gold/10 rounded text-sm text-white">
                        UL Certified
                      </div>
                      <div className="px-3 py-1 bg-accent-gold/10 rounded text-sm text-white">
                        DLC Listed
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/20 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-white mb-6">
                    ILUMINACIÓN COMERCIAL E INDUSTRIAL
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    Soluciones en tecnología lumínica para interiores y exteriores
                    diseñadas para maximizar el rendimiento laboral y garantizar
                    ahorros de operación.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 uppercase mb-1">
                            Garantía Limitada
                          </div>
                          <div className="text-2xl font-bold text-white">
                            5 AÑOS
                          </div>
                        </div>
                        <Shield className="w-8 h-8 text-accent-gold" />
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 uppercase mb-1">
                            Garantía Limitada Extendida
                          </div>
                          <div className="text-2xl font-bold text-white">
                            10 AÑOS
                          </div>
                        </div>
                        <Shield className="w-8 h-8 text-accent-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 04. PROYECTOS ESPECIALES */}
          <div className="mb-16">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-6xl font-bold text-accent-gold/20">04.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  PROYECTOS ESPECIALES
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'SUBESTACIONES',
                  desc: 'Contamos con transformadores y subestaciones que complementen la instalación eléctrica de tu hogar y empresa.',
                  icon: <Activity />,
                },
                {
                  title: 'INGENIERÍAS ELÉCTRICAS',
                  desc: 'Contamos con el servicio de desarrollo de ingeniería eléctrica para tu nuevo proyecto para que solo tengas un proveedor que te asegure que, desde la planeación hasta la instalación, se haga con la mejor calidad.',
                  icon: <Settings />,
                },
                {
                  title: 'PARARRAYOS',
                  desc: 'Sistemas de protección contra descargas atmosféricas para tu personal y activos.',
                  icon: <Shield />,
                },
              ].map((project, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all group h-full">
                    <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-gold/20 transition-colors">
                      <div className="text-accent-gold">{project.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4 uppercase">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {project.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom Tagline */}
          <Reveal>
            <div className="text-center py-12 border-t border-white/10">
              <div className="flex justify-center items-center gap-4 text-2xl font-bold">
                <span className="text-white">ENERGÍA</span>
                <span className="text-accent-gold">/</span>
                <span className="text-white">CONFIANZA</span>
                <span className="text-accent-gold">/</span>
                <span className="text-white">FUTURO</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Technical Specifications */}
      <section
        id="tecnologia"
        className="py-32 bg-black/30 border-y border-white/5"
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
                  <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>{' '}
                  ACTIVOS
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
      <section id="ingenieria" className="py-32 relative">
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
                    href="#soluciones"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Solar Industrial
                  </a>
                </li>
                <li>
                  <a
                    href="#soluciones"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Almacenamiento (BESS)
                  </a>
                </li>
                <li>
                  <a
                    href="#soluciones"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Microgrids
                  </a>
                </li>
                <li>
                  <a
                    href="#tecnologia"
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
                    href="#inicio"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#proyectos"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Casos de Éxito
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="hover:text-accent-gold transition-colors"
                  >
                    Carreras
                  </a>
                </li>
                <li>
                  <a
                    href="#proyectos"
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
              <a href="#inicio" className="hover:text-gray-400 transition-colors">
                Privacidad
              </a>
              <a href="#inicio" className="hover:text-gray-400 transition-colors">
                Términos
              </a>
              <a href="#inicio" className="hover:text-gray-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
