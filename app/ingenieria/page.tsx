'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal } from '@/lib/hooks'
import Link from 'next/link'

export default function IngenieriaPage() {
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
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[10px] font-mono tracking-widest mb-8 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2 animate-pulse"></span>
                Proceso Certificado
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                Metodología de
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-white">
                  Implementación
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                Un proceso estructurado y probado para garantizar la máxima eficiencia,
                seguridad y retorno de inversión en cada proyecto.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-white mb-20">
              Nuestro Proceso en 4 Fases
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
                details: [
                  'Análisis histórico de recibos CFE',
                  'Medición en sitio con analizadores de red',
                  'Estudio de sombreado con drones',
                  'Modelado 3D de la instalación',
                ],
              },
              {
                step: '02',
                title: 'Ingeniería & Diseño',
                desc: 'Diseño CAD/BIM de la estructura, selección de inversores y cálculo de retorno de inversión.',
                details: [
                  'Diseño estructural certificado',
                  'Selección óptima de componentes',
                  'Simulación de producción energética',
                  'Análisis financiero y ROI',
                ],
              },
              {
                step: '03',
                title: 'Procura & Logística',
                desc: 'Importación directa de componentes Tier 1 para evitar intermediarios y asegurar garantía.',
                details: [
                  'Importación directa de fabricantes Tier 1',
                  'Control de calidad en origen',
                  'Logística especializada',
                  'Seguro de mercancía incluido',
                ],
              },
              {
                step: '04',
                title: 'Ejecución & Comisionamiento',
                desc: 'Instalación certificada bajo estándares NOM-001-SEDE. Pruebas de aislamiento y encendido.',
                details: [
                  'Instalación por personal certificado',
                  'Pruebas eléctricas completas',
                  'Interconexión con CFE',
                  'Capacitación al cliente',
                ],
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
                      <p className="text-gray-400 text-sm mb-6">{item.desc}</p>

                      <ul className={`space-y-2 text-sm text-gray-500 ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                        {item.details.map((detail, j) => (
                          <li key={j} className="flex items-center gap-2">
                            {i % 2 === 0 ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0"></span>
                                <span>{detail}</span>
                              </>
                            ) : (
                              <>
                                <span className="md:order-2 w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0"></span>
                                <span className="md:order-1">{detail}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
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

          {/* Additional Benefits */}
          <div className="mt-32">
            <Reveal>
              <h3 className="text-center text-2xl font-bold text-white mb-12">
                Garantías y Soporte Post-Instalación
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal delay={100}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all text-center">
                  <div className="text-4xl font-bold text-accent-gold mb-2">24 meses</div>
                  <h4 className="text-lg font-bold text-white mb-2">O&M Incluido</h4>
                  <p className="text-gray-400 text-sm">
                    Operación y mantenimiento completo incluido en todos nuestros proyectos
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all text-center">
                  <div className="text-4xl font-bold text-accent-gold mb-2">30 años</div>
                  <h4 className="text-lg font-bold text-white mb-2">Garantía de Producción</h4>
                  <p className="text-gray-400 text-sm">
                    Garantizamos que tu sistema producirá energía por encima del 85%
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all text-center">
                  <div className="text-4xl font-bold text-accent-gold mb-2">24/7</div>
                  <h4 className="text-lg font-bold text-white mb-2">Monitoreo NOC</h4>
                  <p className="text-gray-400 text-sm">
                    Centro de control operando 24/7 con alertas en tiempo real
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* CTA Section */}
          <Reveal delay={400}>
            <div className="mt-20 text-center bg-gradient-to-r from-black/80 to-black/60 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-white mb-4">
                ¿Listo para comenzar tu proyecto?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Agenda una sesión técnica con nuestros ingenieros senior para evaluar
                tu instalación y diseñar una solución a la medida.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Agendar Consultoría
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
