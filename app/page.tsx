'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ContactForm from '@/components/ContactForm'

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-[20px] bg-gray-900 flex items-center justify-center">
      <span className="text-gray-400">Cargando mapa...</span>
    </div>
  )
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* DYNAMIC BACKGROUND (Liquid Mesh) */}
      <div className="fixed inset-0 z-[-1] bg-[#050505]">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* NAVBAR (Floating Pill) */}
      <nav className="fixed w-full z-50 top-4 px-4">
        <div className="max-w-6xl mx-auto glass-panel rounded-full px-6 py-3 flex justify-between items-center border border-white/10 bg-black/30 backdrop-blur-xl">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-gold shadow-[0_0_10px_#FFD700]"></div>
            FADEMEX
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#solar" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Solar</a>
            <a href="#baterias" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Baterías</a>
            <a href="#iluminacion" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Iluminación</a>
            <a href="#mapa" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Proyectos</a>
            <a href="#contacto" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Cotizar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-4 right-4 glass-panel p-4 flex flex-col gap-4 z-50">
            <a href="#solar" className="text-gray-200 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Solar</a>
            <a href="#baterias" className="text-gray-200 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Baterías</a>
            <a href="#iluminacion" className="text-gray-200 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Iluminación</a>
            <a href="#contacto" className="bg-accent-gold text-black font-bold p-3 rounded-xl text-center" onClick={() => setMobileMenuOpen(false)}>Cotizar Ahora</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
            </span>
            <span className="text-xs font-medium tracking-wider uppercase text-gray-300">Innovación Energética 2025</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-glow leading-tight">
            Energía que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-accent-gold">fluye.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Consultoría y Energía Solar 360° para empresas en México.
            Tecnología líquida para un futuro sólido.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#contacto" className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105 gold-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">Iniciar Transformación</span>
            </a>
            <a href="#solar" className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:border-white/40">
              Explorar Sistema
            </a>
          </div>
        </div>

        {/* Background Decorative Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-[100px] -z-10"></div>
      </section>

      {/* COMPETITIVE ADVANTAGES (Glass Cards) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Garantía Total</h3>
              <p className="text-sm text-gray-400 leading-relaxed">30 años en generación y 15 años contra defectos. Seguridad absoluta.</p>
            </div>

            {/* Card 2 */}
            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6 relative z-10">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100 relative z-10">0% Intereses</h3>
              <p className="text-sm text-gray-400 leading-relaxed relative z-10">Financiamiento directo sin intervención bancaria. ROI optimizado.</p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Mtto. Incluido</h3>
              <p className="text-sm text-gray-400 leading-relaxed">2 años de protección preventiva y correctiva. Sin letra pequeña.</p>
            </div>

            {/* Card 4 */}
            <div className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Activación Flash</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Sin burocracia. Encendido inmediato post-instalación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (Liquid Grid) */}
      <section className="py-24" id="solar">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Ecosistema de Energía
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solar */}
            <div className="glass-panel p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full filter blur-[60px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest text-accent-gold mb-2 block">01</span>
                <h3 className="text-3xl font-semibold mb-4 text-white">Energía Solar</h3>
                <p className="text-gray-400 mb-6">Instalación premium llave en mano. Hardware Tier 1 para máxima eficiencia de conversión.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Longi</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Trina</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Fronius</span>
                </div>
              </div>
            </div>

            {/* Storage */}
            <div className="glass-panel p-10 relative overflow-hidden group" id="baterias">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[60px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest text-blue-400 mb-2 block">02</span>
                <h3 className="text-3xl font-semibold mb-4 text-white">Almacenamiento</h3>
                <p className="text-gray-400 mb-6">Peak Shaving y continuidad operativa. Inteligencia energética para reducir picos de demanda.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Fortress Power</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Backup</span>
                </div>
              </div>
            </div>

            {/* Lighting */}
            <div className="glass-panel p-10 relative overflow-hidden group" id="iluminacion">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-[60px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest text-purple-400 mb-2 block">03</span>
                <h3 className="text-3xl font-semibold mb-4 text-white">Iluminación</h3>
                <p className="text-gray-400 mb-6">Tecnología LED industrial de alto rendimiento. Garantías extendidas y certificaciones internacionales.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">High Bay</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">NOM</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="glass-panel p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full filter blur-[60px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest text-pink-400 mb-2 block">04</span>
                <h3 className="text-3xl font-semibold mb-4 text-white">Ingeniería</h3>
                <p className="text-gray-400 mb-6">Subestaciones y calidad de energía. Infraestructura crítica protegida y optimizada.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Media Tensión</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300 border border-white/10">Pararrayos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION (Dark Mode Interface) */}
      <section className="py-16 relative" id="mapa">
        <div className="max-w-7xl mx-auto px-4">
          <div className="glass-panel p-2 h-[600px] relative overflow-hidden">
            {/* UI Overlay */}
            <div className="absolute top-6 left-6 z-[400] glass-panel px-6 py-4 bg-black/50 backdrop-blur-xl border-white/10">
              <h3 className="text-white font-bold text-lg">Cobertura Bajío</h3>
              <p className="text-accent-gold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>
                +250 Sistemas Activos
              </p>
            </div>
            <Map />
          </div>
        </div>
      </section>

      {/* CONTACT (Floating Form) */}
      <section className="py-24 relative" id="contacto">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
            {/* Glow effects behind form */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-accent-gold/5 to-transparent pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-4xl font-bold mb-4">Inicia la Transición</h2>
              <p className="text-gray-400">Nuestros ingenieros diseñarán una solución a medida.</p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">FADEMEX</h2>
            <p className="text-sm text-gray-500">Ingeniería Energética de Próxima Generación.</p>
          </div>

          <div className="flex space-x-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-accent-gold transition-colors">Linkedin</a>
            <a href="#" className="hover:text-accent-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent-gold transition-colors">Facebook</a>
          </div>

          <p className="text-xs text-gray-600">© 2025 FADEMEX Labs.</p>
        </div>
      </footer>
    </>
  )
}
