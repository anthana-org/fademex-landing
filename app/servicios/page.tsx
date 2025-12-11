'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal } from '@/lib/hooks'
import { Zap, Check, Shield, Activity, Settings } from 'lucide-react'
import Link from 'next/link'

export default function ServiciosPage() {
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
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-canvas to-canvas"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-highlight/15 via-transparent to-accent-gold/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <span className="inline-block text-sm text-accent-gold font-semibold uppercase tracking-widest mb-3">
              Catálogo de Soluciones Energéticas 2025
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-ink mb-6">
              CATÁLOGO DE SERVICIOS
            </h1>
            <p className="text-lg md:text-xl text-ink-light max-w-3xl mx-auto">
              Consultoría y Energía Solar 360°
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          {/* 01. ENERGÍA SOLAR */}
          <div className="mb-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-6xl font-bold text-accent-gold/20 drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]">01.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-ink">
                  ENERGÍA SOLAR
                </h3>
              </div>
            </Reveal>

            {/* Main Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <Reveal delay={100}>
                <div className="bg-canvas-alt border border-ink/8 rounded-2xl p-8 shadow-card">
                  <h4 className="text-2xl font-bold text-ink mb-4">
                    ENERGÍA QUE TRANSFORMA.
                  </h4>
                  <p className="text-ink-light leading-relaxed mb-4">
                    Somos Fademex. Una empresa mexicana especializada en paneles
                    solares y consultoría energética 360°, ofrecemos soluciones
                    integrales para optimizar el consumo eléctrico en empresas y
                    fomentar el uso de energías limpias.
                  </p>
                  <p className="text-ink-light leading-relaxed">
                    Nos especializamos en hacer análisis energéticos en las empresas,
                    cada vez acercándonos más a ser referentes de sostenibilidad y
                    energía limpia en México.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-canvas-alt border border-ink/8 rounded-2xl p-8 shadow-card">
                  <h4 className="text-xl font-bold text-ink mb-6">
                    APLICACIONES DE ENERGÍA SOLAR
                  </h4>
                  <p className="text-ink-light leading-relaxed mb-6">
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
                  <div className="bg-canvas-alt border border-ink/8 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group">
                    <div className="w-11 h-11 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-4 border border-accent-gold/20 group-hover:bg-accent-gold/15 transition-colors">
                      <Zap className="w-5 h-5 text-accent-gold-dark" />
                    </div>
                    <h5 className="text-sm font-bold text-ink uppercase tracking-wide">
                      {service}
                    </h5>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Brands Section */}
            <Reveal>
              <div className="glass-panel p-8 md:p-12 mb-16">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent-gold font-bold tracking-widest text-sm drop-shadow-[0_1px_0_rgba(45,47,48,0.65)]">01. ENERGÍA SOLAR</span>
                </div>

                <h4 className="text-3xl md:text-4xl font-bold text-ink mb-12 max-w-2xl">
                  NUESTRAS MARCAS DE <span className="text-accent-gold">PANELES SOLARES</span> E INVERSORES
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">

                  {/* Center Divider for large screens */}
                  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent -translate-x-1/2"></div>

                  {/* Left Column: Solar Panels */}
                  <div>
                    <h5 className="text-sm text-ink/70 font-bold tracking-widest uppercase mb-8 border-b border-ink/10 pb-4">
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
                    <h5 className="text-sm text-ink/70 font-bold tracking-widest uppercase mb-8 border-b border-ink/10 pb-4">
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
                            <div className="text-[10px] font-bold text-ink/60 tracking-widest uppercase">
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
                <div className="bg-ink/5 border border-ink/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all">
                  <h4 className="text-2xl font-bold text-ink mb-4">
                    INSTALACIONES COMERCIALES
                  </h4>
                  <p className="text-ink/80 mb-6 leading-relaxed">
                    Seleccionamos la planificación de componentes óptima para
                    asegurar la máxima eficiencia y longevidad de tu sistema
                    comercial a lo largo de los años. Nuestras instalaciones
                    comerciales cumplen con nuestros estándares y directrices,
                    respetando las normativas actuales.
                  </p>
                  <ul className="space-y-2 text-sm text-ink/70">
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
                <div className="bg-ink/5 border border-ink/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all">
                  <h4 className="text-2xl font-bold text-ink mb-4">
                    INSTALACIONES INDUSTRIALES
                  </h4>
                  <p className="text-ink/80 mb-6 leading-relaxed">
                    Seleccionamos la planificación óptima de componentes para
                    asegurar la máxima eficiencia y durabilidad de tu sistema
                    industrial de alta resistencia.
                  </p>
                  <p className="text-ink/70 mb-6 text-sm leading-relaxed">
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
                <span className="text-6xl font-bold text-accent-gold/20 drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]">02.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-ink">
                  BATERÍAS
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <Reveal delay={100}>
                <div className="bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/30 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-ink mb-6">
                    SISTEMAS DE ALMACENAMIENTO DE ENERGÍA
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-bold text-accent-gold uppercase mb-2">
                        REDUCCIÓN DE PICOS DE DEMANDA (PEAK SHAVING - TIME SHIFTING)
                      </h5>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        Las baterías almacenan energía en períodos de bajo consumo y
                        la liberan en horarios punta, reduciendo costos operativos y
                        evitando cargos por alta demanda.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-accent-gold uppercase mb-2">
                        CONTINUIDAD OPERATIVA
                      </h5>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        Las baterías aseguran operación continua al activar energía de
                        respaldo inmediatamente ante cortes, protegiendo procesos
                        sensibles y evitando tiempos de inactividad.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-accent-gold uppercase mb-2">
                        AUTONOMÍA Y PROTECCIÓN ANTE VARIACIONES
                      </h5>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        Ofrecen respaldo en caso de fluctuaciones de voltaje,
                        garantizando estabilidad para equipos críticos y prolongando
                        la vida útil de la maquinaria.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-ink/5 border border-ink/10 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="inline-block px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 rounded-lg mb-4">
                      <span className="text-sm text-accent-gold font-bold uppercase">
                        Distribuidores Oficiales de Fortress Power
                      </span>
                    </div>
                  </div>
                  <div className="bg-ink/5 border border-ink/10 rounded-xl p-6 mb-6">
                    <h5 className="text-xl font-bold text-ink mb-2">
                      eSpire 280
                    </h5>
                    <p className="text-ink/70 text-sm">
                      Energía nominal 279,5 kWh
                    </p>
                  </div>
                  <h4 className="text-xl font-bold text-ink mb-4">
                    BATERÍAS COMERCIALES E INDUSTRIALES
                  </h4>
                  <p className="text-ink/80 mb-6">
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
                <span className="text-6xl font-bold text-accent-gold/20 drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]">03.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-ink">
                  TECNOLOGÍA LUMÍNICA
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Reveal delay={100}>
                <div className="bg-ink/5 border border-ink/10 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-ink mb-6">
                    APLICACIONES DE TECNOLOGÍA LUMÍNICA INDUSTRIAL Y COMERCIAL
                  </h4>
                  <p className="text-ink/80 leading-relaxed mb-6">
                    Soluciones profesionales en iluminación industrial y comercial
                    para todo tipo de espacios.
                  </p>
                  <p className="text-ink/70 leading-relaxed mb-8">
                    Junto a ello se ofrece servicios de instalaciones
                    electromecánicas para proyectos nuevos o existentes, estudios de
                    iluminación y consultoría energética y plataformas para
                    controlar, automatizar y monitorear equipos inteligentes.
                  </p>
                  <div className="bg-ink/5 border border-accent-gold/30 rounded-lg p-4">
                    <div className="text-xs text-accent-gold font-mono uppercase mb-2">
                      Certificaciones
                    </div>
                    <div className="flex gap-3">
                      <div className="px-3 py-1 bg-accent-gold/10 rounded text-sm text-ink">
                        UL Certified
                      </div>
                      <div className="px-3 py-1 bg-accent-gold/10 rounded text-sm text-ink">
                        DLC Listed
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/20 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-ink mb-6">
                    ILUMINACIÓN COMERCIAL E INDUSTRIAL
                  </h4>
                  <p className="text-ink/80 leading-relaxed mb-8">
                    Soluciones en tecnología lumínica para interiores y exteriores
                    diseñadas para maximizar el rendimiento laboral y garantizar
                    ahorros de operación.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-ink/5 border border-ink/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-ink/60 uppercase mb-1">
                            Garantía Limitada
                          </div>
                          <div className="text-2xl font-bold text-ink">
                            5 AÑOS
                          </div>
                        </div>
                        <Shield className="w-8 h-8 text-accent-gold drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]" />
                      </div>
                    </div>
                    <div className="bg-ink/5 border border-ink/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-ink/60 uppercase mb-1">
                            Garantía Limitada Extendida
                          </div>
                          <div className="text-2xl font-bold text-ink">
                            10 AÑOS
                          </div>
                        </div>
                        <Shield className="w-8 h-8 text-accent-gold drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]" />
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
                <span className="text-6xl font-bold text-accent-gold/20 drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]">04.</span>
                <h3 className="text-4xl md:text-5xl font-bold text-ink">
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
                  <div className="bg-ink/5 border border-ink/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all group h-full">
                    <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-gold/20 transition-colors">
                      <div className="text-accent-gold">{project.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-ink mb-4 uppercase">
                      {project.title}
                    </h4>
                    <p className="text-ink/70 leading-relaxed text-sm">
                      {project.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom Tagline */}
          <Reveal>
            <div className="text-center py-12 border-t border-ink/10">
              <div className="flex justify-center items-center gap-4 text-2xl font-bold mb-8">
                <span className="text-ink">ENERGÍA</span>
                <span className="text-accent-gold">/</span>
                <span className="text-ink">CONFIANZA</span>
                <span className="text-accent-gold">/</span>
                <span className="text-ink">FUTURO</span>
              </div>
              <Link
                href="/contacto"
                className="inline-block px-8 py-4 bg-accent-gold hover:bg-highlight text-ink font-extrabold rounded-md transition-all shadow-[0_20px_40px_rgba(225,235,163,0.35)]"
              >
                Solicitar Cotización
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
