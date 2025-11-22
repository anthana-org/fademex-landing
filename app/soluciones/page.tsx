'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal } from '@/lib/hooks'
import { Shield, BarChart3, Settings, Activity } from 'lucide-react'
import Link from 'next/link'

export default function SolucionesPage() {
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
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[10px] font-mono tracking-widest mb-8 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2 animate-pulse"></span>
                Ventajas Competitivas
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                Ingeniería de Precisión.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-white">
                  Resultados Garantizados.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                No solo instalamos paneles; desplegamos infraestructura
                energética crítica diseñada para durar décadas bajo condiciones
                extremas.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Agenda Consultoría
                </Link>
                <Link
                  href="/servicios"
                  className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
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

          {/* CTA Section */}
          <Reveal delay={400}>
            <div className="mt-20 text-center bg-gradient-to-r from-black/80 to-black/60 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-white mb-4">
                ¿Listo para transformar tu infraestructura energética?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Agenda una sesión técnica con nuestros ingenieros para evaluar tu consumo y diseñar una solución personalizada.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Iniciar Proyecto
                </Link>
                <Link
                  href="/proyectos"
                  className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
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
