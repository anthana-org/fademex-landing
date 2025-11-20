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
          <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-2">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all placeholder-gray-600"
            placeholder="Tu nombre"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-2">Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all placeholder-gray-600"
            placeholder="Empresa"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-2">Contacto</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all placeholder-gray-600"
            placeholder="Teléfono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-2">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all placeholder-gray-600"
            placeholder="email@empresa.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-2">Mensaje</label>
        <textarea
          rows={4}
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all placeholder-gray-600 resize-none"
          placeholder="Detalles del proyecto..."
        />
      </div>

      {status === 'success' && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300 text-center">
          ¡Mensaje enviado! Te hemos enviado un correo de confirmación. Nos pondremos en contacto pronto.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 text-center">
          {errorMessage || 'Error al enviar el mensaje. Por favor intenta de nuevo.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold text-lg rounded-2xl py-4 hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
      </button>
    </form>
  )
}
