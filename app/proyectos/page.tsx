'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DotMatrixMap from '@/components/DotMatrixMap'
import { Reveal } from '@/lib/hooks'
import { BarChart3, Zap, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ProyectosPage() {
  return (
    <div className="font-sans text-ink min-h-screen bg-[#050505]">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[10px] font-mono tracking-widest mb-8 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2 animate-pulse"></span>
                Cobertura Nacional
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-ink mb-8 leading-[0.9]">
                Red de Proyectos
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-white">
                  Activos
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-ink/70 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                Monitoreamos más de 450 MW de capacidad instalada desde
                nuestro Centro de Control en tiempo real.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-ink/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal>
              <div className="text-center p-8 bg-ink/5 border border-ink/10 rounded-2xl hover:border-accent-gold/30 transition-all">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-accent-gold" />
                </div>
                <div className="text-4xl font-bold text-ink mb-2">450+ MW</div>
                <div className="text-sm text-ink/70">Capacidad Instalada</div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="text-center p-8 bg-ink/5 border border-ink/10 rounded-2xl hover:border-accent-gold/30 transition-all">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-accent-gold" />
                </div>
                <div className="text-4xl font-bold text-ink mb-2">150+</div>
                <div className="text-sm text-ink/70">Proyectos Completados</div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="text-center p-8 bg-ink/5 border border-ink/10 rounded-2xl hover:border-accent-gold/30 transition-all">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-accent-gold" />
                </div>
                <div className="text-4xl font-bold text-ink mb-2">20+</div>
                <div className="text-sm text-ink/70">Estados Cubiertos</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Reveal>
                <h2 className="text-sm text-accent-gold font-mono uppercase tracking-widest mb-3">
                  Cobertura Nacional
                </h2>
                <h3 className="text-4xl font-bold text-ink mb-4">
                  Mapa de Proyectos en Operación
                </h3>
                <p className="text-ink/70 max-w-lg">
                  Nuestros proyectos están distribuidos estratégicamente en todo México,
                  con monitoreo continuo desde nuestro Centro de Operaciones.
                </p>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="flex gap-6 text-xs font-mono text-ink/70 border border-ink/10 px-4 py-2 rounded-lg bg-ink/5">
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
              <div className="bg-ink/5 border border-ink/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                <div className="text-xs text-accent-gold font-mono mb-2">INDUSTRIAL</div>
                <h4 className="text-xl font-bold text-ink mb-2">
                  Planta Manufacturera - Querétaro
                </h4>
                <p className="text-ink/70 text-sm mb-4">
                  Sistema de 2.5 MW con almacenamiento de 500 kWh. Reducción de 40% en costos energéticos.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-accent-gold/10 rounded text-accent-gold">2.5 MW</span>
                  <span className="px-2 py-1 bg-accent-gold/10 rounded text-accent-gold">40% Ahorro</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-ink/5 border border-ink/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                <div className="text-xs text-accent-gold font-mono mb-2">COMERCIAL</div>
                <h4 className="text-xl font-bold text-ink mb-2">
                  Centro Comercial - CDMX
                </h4>
                <p className="text-ink/70 text-sm mb-4">
                  Instalación de 1.8 MW en azotea con sistema de monitoreo inteligente.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-accent-gold/10 rounded text-accent-gold">1.8 MW</span>
                  <span className="px-2 py-1 bg-accent-gold/10 rounded text-accent-gold">35% Ahorro</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="bg-ink/5 border border-ink/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                <div className="text-xs text-accent-gold font-mono mb-2">AGROINDUSTRIAL</div>
                <h4 className="text-xl font-bold text-ink mb-2">
                  Complejo Agrícola - Jalisco
                </h4>
                <p className="text-ink/70 text-sm mb-4">
                  Sistema híbrido de 3.2 MW con capacidad de isla para operación continua.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-accent-gold/10 rounded text-accent-gold">3.2 MW</span>
                  <span className="px-2 py-1 bg-accent-gold/10 rounded text-accent-gold">45% Ahorro</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CTA Section */}
          <Reveal delay={600}>
            <div className="mt-20 text-center bg-gradient-to-r from-black/80 to-black/60 border border-ink/10 rounded-3xl p-12 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-ink mb-4">
                ¿Listo para ser parte de nuestra red?
              </h3>
              <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
                Únete a más de 150 empresas que ya confiaron en FADEMEX para transformar su infraestructura energética.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-ink font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Iniciar Mi Proyecto
                </Link>
                <Link
                  href="/ingenieria"
                  className="px-8 py-4 border border-ink/20 hover:bg-ink/5 text-ink font-medium rounded-lg transition-all"
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
