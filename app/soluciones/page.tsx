'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal } from '@/lib/hooks'
import { Shield, BarChart3, Settings, Activity } from 'lucide-react'
import Link from 'next/link'

export default function SolucionesPage() {
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
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-canvas to-canvas"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-highlight/15 via-transparent to-accent-gold/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-gold bg-accent-gold/20 text-ink text-[11px] font-semibold tracking-[0.15em] mb-8 uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent-gold mr-2.5 animate-pulse"></span>
                Ventajas Competitivas
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink mb-8 leading-[1]">
                Ingeniería de Precisión.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold-dark via-accent-gold to-highlight">
                  Resultados Garantizados.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-ink-light mb-10 max-w-3xl mx-auto font-normal leading-relaxed">
                No solo instalamos paneles; desplegamos infraestructura
                energética crítica diseñada para durar décadas bajo condiciones
                extremas.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-accent-gold-dark text-ink font-bold rounded-xl transition-all shadow-button hover:shadow-button-hover"
                >
                  Agenda Consultoría
                </Link>
                <Link
                  href="/servicios"
                  className="px-8 py-4 bg-canvas-alt border border-ink/10 hover:border-ink/20 hover:bg-canvas text-ink font-semibold rounded-xl transition-all shadow-card hover:shadow-card-hover"
                >
                  Ver Servicios
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
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

          {/* CTA Section */}
          <Reveal delay={400}>
            <div className="mt-20 text-center glass-panel p-10 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-ink mb-4">
                ¿Listo para transformar tu infraestructura energética?
              </h3>
              <p className="text-ink-light mb-8 max-w-2xl mx-auto">
                Agenda una sesión técnica con nuestros ingenieros para evaluar tu consumo y diseñar una solución personalizada.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-accent-gold-dark text-ink font-bold rounded-xl transition-all shadow-button hover:shadow-button-hover"
                >
                  Iniciar Proyecto
                </Link>
                <Link
                  href="/proyectos"
                  className="px-8 py-4 bg-canvas-alt border border-ink/10 hover:border-ink/20 hover:bg-canvas text-ink font-semibold rounded-xl transition-all shadow-card hover:shadow-card-hover"
                >
                  Ver Proyectos Realizados
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
