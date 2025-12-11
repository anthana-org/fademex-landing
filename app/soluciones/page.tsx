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
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-accent-gold/15 via-canvas to-canvas text-ink shadow-2xl rounded-b-xl border-b border-ink/10">
        <div className="absolute inset-0 bg-gradient-to-r from-highlight/20 via-accent-gold/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded-sm border border-accent-gold/60 bg-accent-gold/25 text-ink text-[10px] font-semibold tracking-[0.2em] mb-8 uppercase">
                <span className="w-1.5 h-1.5 rounded-sm bg-highlight mr-2 animate-pulse"></span>
                Ventajas Competitivas
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-ink mb-8 leading-[0.9]">
                Ingeniería de Precisión.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent-gold to-highlight">
                  Resultados Garantizados.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-ink/70 mb-10 max-w-3xl mx-auto font-normal leading-relaxed">
                No solo instalamos paneles; desplegamos infraestructura
                energética crítica diseñada para durar décadas bajo condiciones
                extremas.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-highlight text-ink font-extrabold rounded-md transition-all shadow-[0_20px_40px_rgba(225,235,163,0.35)]"
                >
                  Agenda Consultoría
                </Link>
                <Link
                  href="/servicios"
                  className="px-8 py-4 border border-ink/20 hover:bg-ink/5 text-ink font-semibold rounded-md transition-all"
                >
                  Ver Servicios
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
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
                <div className="group relative p-8 h-full rounded-2xl border border-ink/10 bg-ink/5 hover:bg-white/40 transition-all duration-500 overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-accent-gold/20"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center text-accent-gold border border-ink/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-mono text-2xl font-bold text-ink/60 group-hover:text-ink transition-colors">
                      {item.metric}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-ink mb-1">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-accent-gold/70 uppercase tracking-wide mb-4 block">
                    {item.subtitle}
                  </span>
                  <p className="text-ink/70 leading-relaxed text-sm">
                    {item.desc}
                  </p>

                  {/* Scanning line effect on hover */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-accent-gold w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA Section */}
          <Reveal delay={400}>
            <div className="mt-20 text-center bg-gradient-to-r from-accent-gold/10 via-white/70 to-white/80 border border-ink/10 rounded-3xl p-12 backdrop-blur-sm shadow-2xl">
              <h3 className="text-3xl font-bold text-ink mb-4">
                ¿Listo para transformar tu infraestructura energética?
              </h3>
              <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
                Agenda una sesión técnica con nuestros ingenieros para evaluar tu consumo y diseñar una solución personalizada.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-highlight text-ink font-extrabold rounded-md transition-all shadow-[0_20px_40px_rgba(225,235,163,0.35)]"
                >
                  Iniciar Proyecto
                </Link>
                <Link
                  href="/proyectos"
                  className="px-8 py-4 border border-ink/20 hover:bg-ink/5 text-ink font-semibold rounded-md transition-all"
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
