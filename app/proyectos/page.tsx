'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DotMatrixMap from '@/components/DotMatrixMap'
import { Reveal } from '@/lib/hooks'
import { BarChart3, Zap, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ProyectosPage() {
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

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-gold bg-accent-gold/20 text-ink text-[11px] font-semibold tracking-[0.15em] mb-8 uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent-gold mr-2.5 animate-pulse"></span>
                Cobertura Nacional
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink mb-8 leading-[1]">
                Red de Proyectos
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold-dark via-accent-gold to-highlight">
                  Activos
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-ink-light mb-10 max-w-3xl mx-auto leading-relaxed">
                Monitoreamos más de 450 MW de capacidad instalada desde
                nuestro Centro de Control en tiempo real.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-ink/8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal>
              <div className="text-center p-8 bg-canvas-alt border border-ink/8 rounded-2xl shadow-card hover:shadow-card-hover transition-all">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-accent-gold/20">
                  <Zap className="w-6 h-6 text-accent-gold-dark" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-ink mb-2">450+ MW</div>
                <div className="text-sm text-ink-light">Capacidad Instalada</div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="text-center p-8 bg-canvas-alt border border-ink/8 rounded-2xl shadow-card hover:shadow-card-hover transition-all">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-accent-gold/20">
                  <BarChart3 className="w-6 h-6 text-accent-gold-dark" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-ink mb-2">150+</div>
                <div className="text-sm text-ink-light">Proyectos Completados</div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="text-center p-8 bg-canvas-alt border border-ink/8 rounded-2xl shadow-card hover:shadow-card-hover transition-all">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-accent-gold/20">
                  <MapPin className="w-6 h-6 text-accent-gold-dark" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-ink mb-2">20+</div>
                <div className="text-sm text-ink-light">Estados Cubiertos</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Reveal>
                <span className="inline-block text-sm text-accent-gold font-semibold uppercase tracking-widest mb-3">
                  Cobertura Nacional
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-ink mb-4">
                  Mapa de Proyectos en Operación
                </h3>
                <p className="text-ink-light max-w-lg">
                  Nuestros proyectos están distribuidos estratégicamente en todo México,
                  con monitoreo continuo desde nuestro Centro de Operaciones.
                </p>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="flex gap-6 text-xs font-medium text-ink-light border border-ink/8 px-4 py-2.5 rounded-xl bg-canvas-alt shadow-sm">
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

          {/* Project Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <Reveal delay={300}>
              <div className="bg-canvas-alt border border-ink/8 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
                <div className="text-xs text-accent-gold font-semibold mb-2 uppercase tracking-wider">INDUSTRIAL</div>
                <h4 className="text-lg font-bold text-ink mb-2">
                  Planta Manufacturera - Querétaro
                </h4>
                <p className="text-ink-light text-sm mb-4">
                  Sistema de 2.5 MW con almacenamiento de 500 kWh. Reducción de 40% en costos energéticos.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-accent-gold/10 rounded-lg text-accent-gold-dark font-medium border border-accent-gold/20">2.5 MW</span>
                  <span className="px-2.5 py-1 bg-accent-gold/10 rounded-lg text-accent-gold-dark font-medium border border-accent-gold/20">40% Ahorro</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-canvas-alt border border-ink/8 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
                <div className="text-xs text-accent-gold font-semibold mb-2 uppercase tracking-wider">COMERCIAL</div>
                <h4 className="text-lg font-bold text-ink mb-2">
                  Centro Comercial - CDMX
                </h4>
                <p className="text-ink-light text-sm mb-4">
                  Instalación de 1.8 MW en azotea con sistema de monitoreo inteligente.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-accent-gold/10 rounded-lg text-accent-gold-dark font-medium border border-accent-gold/20">1.8 MW</span>
                  <span className="px-2.5 py-1 bg-accent-gold/10 rounded-lg text-accent-gold-dark font-medium border border-accent-gold/20">35% Ahorro</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="bg-canvas-alt border border-ink/8 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
                <div className="text-xs text-accent-gold font-semibold mb-2 uppercase tracking-wider">AGROINDUSTRIAL</div>
                <h4 className="text-lg font-bold text-ink mb-2">
                  Complejo Agrícola - Jalisco
                </h4>
                <p className="text-ink-light text-sm mb-4">
                  Sistema híbrido de 3.2 MW con capacidad de isla para operación continua.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-accent-gold/10 rounded-lg text-accent-gold-dark font-medium border border-accent-gold/20">3.2 MW</span>
                  <span className="px-2.5 py-1 bg-accent-gold/10 rounded-lg text-accent-gold-dark font-medium border border-accent-gold/20">45% Ahorro</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CTA Section */}
          <Reveal delay={600}>
            <div className="mt-20 text-center glass-panel p-10 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-ink mb-4">
                ¿Listo para ser parte de nuestra red?
              </h3>
              <p className="text-ink-light mb-8 max-w-2xl mx-auto">
                Únete a más de 150 empresas que ya confiaron en FADEMEX para transformar su infraestructura energética.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-accent-gold-dark text-ink font-bold rounded-xl transition-all shadow-button hover:shadow-button-hover"
                >
                  Iniciar Mi Proyecto
                </Link>
                <Link
                  href="/ingenieria"
                  className="px-8 py-4 bg-canvas-alt border border-ink/10 hover:border-ink/20 hover:bg-canvas text-ink font-semibold rounded-xl transition-all shadow-card hover:shadow-card-hover"
                >
                  Ver Metodología
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}

