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
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-4xl">
                    <Image
                        src="/mexico-map.png"
                        alt="Mexico Map"
                        fill
                        className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] opacity-90"
                        priority
                    />

                    {/* Project Pins Overlay */}
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            className="absolute cursor-pointer group/pin"
                            style={{ left: proj.x, top: proj.y, transform: 'translate(-50%, -50%)' }}
                            onMouseEnter={() => setActivePin(proj.id)}
                            onMouseLeave={() => setActivePin(null)}
                        >
                            {/* Pulse Animation */}
                            <div className="absolute inset-0 -m-3">
                                <div className="w-6 h-6 rounded-full bg-accent-gold/30 animate-ping" />
                            </div>

                            {/* Pin Dot */}
                            <div className={`relative w-3 h-3 rounded-full border-2 border-ink shadow-lg transition-all duration-300 ${activePin === proj.id ? 'bg-accent-gold scale-150' : 'bg-highlight'
                                }`} />

                            {/* Tooltip */}
                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none transition-all duration-300 ${activePin === proj.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                <div className="bg-ink/90 backdrop-blur-md text-canvas px-3 py-2 rounded-lg shadow-xl border border-accent-gold/20 whitespace-nowrap">
                                    <div className="text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-0.5">{proj.city}</div>
                                    <div className="text-xs font-semibold">{proj.type}</div>
                                    {proj.stats && <div className="text-[10px] text-canvas/70">{proj.stats}</div>}
                                    <div className="w-2 h-2 bg-ink/90 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-accent-gold/20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
