'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal } from '@/lib/hooks'
import { Zap } from 'lucide-react'
import Link from 'next/link'

export default function TecnologiaPage() {
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
    <div className="font-sans text-ink min-h-screen bg-canvas">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-0 w-[720px] h-[720px] bg-highlight/20 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[560px] h-[560px] bg-accent-gold/30 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden bg-gradient-to-br from-accent-gold/15 via-canvas to-canvas text-ink shadow-2xl rounded-b-xl border-b border-ink/10">
        <div className="absolute inset-0 bg-gradient-to-r from-highlight/20 via-accent-gold/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded-sm border border-accent-gold/60 bg-accent-gold/25 text-ink text-[10px] font-semibold tracking-[0.2em] mb-8 uppercase drop-shadow-[0_1px_0_rgba(45,47,48,0.65)]">
                <span className="w-1.5 h-1.5 rounded-sm bg-highlight mr-2 animate-pulse"></span>
                Tecnología de Vanguardia
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-ink mb-8 leading-[0.9]">
                Especificaciones
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent-gold to-highlight">
                  Técnicas
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-ink/70 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                Utilizamos componentes Tier 1 clasificados por Bloomberg NEF.
                Cada inversor, panel y estructura es auditada para cumplir
                con estándares internacionales IEC y UL.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ticker/Stats Strip */}
      <div className="border-y border-ink/10 bg-ink/5 backdrop-blur-sm overflow-hidden">
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
                className="flex items-center gap-2 text-sm font-mono text-accent-gold/80 drop-shadow-[0_1px_0_rgba(45,47,48,0.65)]"
              >
                <Zap className="w-3 h-3 text-accent-gold drop-shadow-[0_2px_6px_rgba(45,47,48,0.35)]" /> {tag}
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

      {/* Technical Specifications */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Specs Cards */}
            <div className="lg:w-1/3">
              <Reveal>
                <h3 className="text-3xl font-bold text-ink mb-6">
                  Especificaciones Técnicas
                </h3>
                <p className="text-ink/70 mb-8 leading-relaxed">
                  Cada componente es seleccionado bajo criterios rigurosos de eficiencia, durabilidad y certificación internacional.
                </p>
                <div className="space-y-4">
                  {technicalSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-4 rounded-lg bg-ink/5 border border-ink/10 hover:border-accent-gold/30 transition-all"
                    >
                      <div>
                        <div className="text-xs text-ink/60 uppercase">
                          {spec.label}
                        </div>
                        <div className="text-xs text-accent-gold/70">
                          {spec.desc}
                        </div>
                      </div>
                      <div className="text-xl font-mono font-bold text-ink">
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
                <div className="relative rounded-xl overflow-hidden border border-ink/10 shadow-2xl bg-white">
                  <div className="bg-ink/5 px-4 py-2 flex items-center gap-2 border-b border-ink/10">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="ml-4 px-3 py-0.5 rounded bg-ink/5 text-[10px] text-ink/70 font-mono border border-ink/10 flex-1 text-center">
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-ink/60 opacity-0 group-hover:opacity-100 transition-opacity">
                              {Math.floor(Math.random() * 100)}kW
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded bg-ink/5 border border-ink/10">
                        <div className="text-[10px] text-ink/60 uppercase">
                          Frecuencia de Red
                        </div>
                        <div className="text-lg text-ink font-mono">
                          60.02 Hz
                        </div>
                      </div>
                      <div className="p-4 rounded bg-ink/5 border border-ink/10">
                        <div className="text-[10px] text-ink/60 uppercase">
                          Factor de Potencia
                        </div>
                        <div className="text-lg text-ink font-mono">
                          0.98 PF
                        </div>
                      </div>
                      <div className="p-4 rounded bg-ink/5 border border-ink/10">
                        <div className="text-[10px] text-ink/60 uppercase">
                          Temperatura
                        </div>
                        <div className="text-lg text-ink font-mono">
                          32°C
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Reveal delay={300}>
                  <div className="bg-ink/5 border border-ink/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                    <h4 className="text-lg font-bold text-ink mb-3">
                      Monitoreo en Tiempo Real
                    </h4>
                    <p className="text-ink/70 text-sm leading-relaxed">
                      Sistema de monitoreo 24/7 con alertas automáticas y análisis predictivo de fallas.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="bg-ink/5 border border-ink/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                    <h4 className="text-lg font-bold text-ink mb-3">
                      Certificaciones Internacionales
                    </h4>
                    <p className="text-ink/70 text-sm leading-relaxed">
                      Todos nuestros componentes cumplen con IEC 61215, IEC 61730 y estándares UL.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <Reveal delay={500}>
            <div className="mt-20 text-center bg-gradient-to-r from-accent-gold/10 via-white/70 to-white/80 border border-ink/10 rounded-3xl p-12 backdrop-blur-sm shadow-2xl">
              <h3 className="text-3xl font-bold text-ink mb-4">
                ¿Quieres conocer más detalles técnicos?
              </h3>
              <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
                Descarga nuestras especificaciones técnicas completas o agenda una sesión con nuestros ingenieros.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-highlight text-ink font-extrabold rounded-md transition-all shadow-[0_20px_40px_rgba(225,235,163,0.35)]"
                >
                  Consultar con Ingeniero
                </Link>
                <Link
                  href="/servicios"
                  className="px-8 py-4 border border-ink/20 hover:bg-ink/5 text-ink font-semibold rounded-md transition-all"
                >
                  Ver Catálogo de Servicios
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
