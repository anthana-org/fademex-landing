'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProjectPin {
    id: string
    x: string
    y: string
    city: string
    type: string
    stats?: string
}

export default function MexicoMap() {
    const [activePin, setActivePin] = useState<string | null>(null)

    // Coordinates as percentages for responsive positioning
    const projects: ProjectPin[] = [
        {
            id: 'leon',
            x: '48%',
            y: '40%',
            city: 'León',
            type: 'Industria Cuero Calzado',
            stats: '500 kWp',
        },
        {
            id: 'irapuato',
            x: '50%',
            y: '42%',
            city: 'Irapuato',
            type: 'Industrial',
            stats: '350 kWp',
        },
        {
            id: 'ags',
            x: '47%',
            y: '37%',
            city: 'Aguascalientes',
            type: 'Industrial Ensamblado',
            stats: '500 kWp',
        },
        {
            id: 'qro',
            x: '52%',
            y: '41%',
            city: 'Querétaro',
            type: 'Manufactura',
            stats: '2.5 MW',
        },
        {
            id: 'cdmx',
            x: '55%',
            y: '45%',
            city: 'CDMX',
            type: 'Proyecto Comercial',
            stats: '250 kWp',
        },
        {
            id: 'gdl',
            x: '42%',
            y: '40%',
            city: 'Guadalajara',
            type: 'Agroindustrial',
            stats: '500 kWp',
        },
        {
            id: 'mty',
            x: '54%',
            y: '25%',
            city: 'Monterrey',
            type: 'Industrial',
            stats: '1.2 MW',
        },
    ]

    return (
        <div className="relative w-full h-full group">
            {/* Map Image */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="relative w-full h-full max-w-5xl">
                    <Image
                        src="/mexico-outline.png"
                        alt="Mexico Map"
                        fill
                        className="object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.2)]"
                        priority
                    />

                    {/* Project Pins Overlay */}
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            className="absolute cursor-pointer group/pin z-10"
                            style={{ left: proj.x, top: proj.y, transform: 'translate(-50%, -50%)' }}
                            onMouseEnter={() => setActivePin(proj.id)}
                            onMouseLeave={() => setActivePin(null)}
                        >
                            {/* Pulse Animation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-8 h-8 rounded-full bg-accent-gold/20 animate-ping ${activePin === proj.id ? 'opacity-100' : 'opacity-50'}`} />
                            </div>

                            {/* Pin Dot */}
                            <div className="relative flex items-center justify-center">
                                <div className={`w-4 h-4 rounded-full border-2 shadow-lg transition-all duration-300 ${activePin === proj.id
                                        ? 'bg-accent-gold border-accent-gold scale-150 shadow-accent-gold/50'
                                        : 'bg-highlight border-accent-gold/60'
                                    }`} />
                            </div>

                            {/* Tooltip */}
                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none transition-all duration-300 z-20 ${activePin === proj.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                <div className="bg-ink/95 backdrop-blur-sm text-canvas px-4 py-2.5 rounded-lg shadow-2xl border border-accent-gold/30 whitespace-nowrap">
                                    <div className="text-[11px] uppercase tracking-wider text-accent-gold font-bold mb-1">{proj.city}</div>
                                    <div className="text-sm font-medium">{proj.type}</div>
                                    {proj.stats && <div className="text-xs text-canvas/80 mt-0.5">{proj.stats}</div>}
                                    <div className="w-3 h-3 bg-ink/95 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b border-accent-gold/30" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
