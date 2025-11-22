'use client'

import { useState } from 'react'

interface FormData {
  nombre: string
  empresa: string
  telefono: string
  email: string
  mensaje: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    mensaje: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario')
      }

      setStatus('success')
      setFormData({
        nombre: '',
        empresa: '',
        telefono: '',
        email: '',
        mensaje: ''
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-500 uppercase ml-1">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
            placeholder="Ej. Roberto Sánchez"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-500 uppercase ml-1">Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
            placeholder="Ej. Industria S.A."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-500 uppercase ml-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
            placeholder="Ej. +52 (55) 1234-5678"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-500 uppercase ml-1">Correo Corporativo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
            placeholder="nombre@empresa.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono text-gray-500 uppercase ml-1">Detalles del Proyecto (Opcional)</label>
        <textarea
          rows={4}
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10 resize-none"
          placeholder="Consumo actual, ubicación, objetivos..."
        />
      </div>

      {status === 'success' && (
        <div className="bg-accent-gold/20 border border-accent-gold/50 rounded-lg p-4 text-accent-gold text-center flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ¡Mensaje enviado! Te hemos enviado un correo de confirmación.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-center">
          {errorMessage || 'Error al enviar el mensaje. Por favor intenta de nuevo.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-accent-gold hover:bg-yellow-300 text-black font-bold py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-gold"
      >
        {status === 'loading' ? 'Enviando...' : 'Solicitar Propuesta Técnica'}
        {status !== 'loading' && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </button>
    </form>
  )
}
