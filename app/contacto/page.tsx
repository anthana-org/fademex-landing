'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { Reveal } from '@/lib/hooks'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactoPage() {
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
      <section className="relative min-h-[40vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[10px] font-mono tracking-widest mb-8 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2 animate-pulse"></span>
                Contacto Directo
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                Comienza la
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-white">
                  Transición
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                Agenda una sesión técnica con nuestros ingenieros senior.
                Te responderemos en menos de 24 horas.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Reveal>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Información de Contacto
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Oficina Principal</h3>
                      <p className="text-gray-400 text-sm">
                        Querétaro, México
                        <br />
                        Centro de Operaciones
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Teléfono</h3>
                      <p className="text-gray-400 text-sm">
                        +52 (442) 123-4567
                        <br />
                        Lunes a Viernes
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Email</h3>
                      <p className="text-gray-400 text-sm">
                        info@fademex.com
                        <br />
                        Respuesta en 24hrs
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent-gold/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Horario</h3>
                      <p className="text-gray-400 text-sm">
                        Lun - Vie: 9:00 - 18:00
                        <br />
                        Sábado: 10:00 - 14:00
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Reveal delay={200}>
                <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

                  <div className="mb-8 relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Solicita una Consultoría
                    </h2>
                    <p className="text-gray-400">
                      Completa el formulario y un ingeniero se pondrá en contacto contigo.
                    </p>
                  </div>

                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Additional Info */}
          <Reveal delay={500}>
            <div className="bg-gradient-to-r from-black/80 to-black/60 border border-white/10 rounded-3xl p-12 backdrop-blur-sm text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Tienes un proyecto grande o necesitas soporte técnico?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Para proyectos de más de 5 MW o soporte técnico urgente,
                contáctanos directamente al departamento de ingeniería.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="tel:+524421234567"
                  className="px-8 py-4 bg-accent-gold hover:bg-yellow-300 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Llamar Ahora
                </a>
                <a
                  href="mailto:ingenieria@fademex.com"
                  className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
                >
                  Email Ingeniería
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
