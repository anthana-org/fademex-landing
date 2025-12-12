'use client'

import { useState } from 'react'

interface ProjectPin {
    id: string
    x: number // Percentage from left
    y: number // Percentage from top
    city: string
    type: string
    stats?: string
}

export default function MexicoMap() {
    const [activePin, setActivePin] = useState<string | null>(null)

    // Coordinates calibrated for this specific SVG projection
    // León/Irapuato are in Guanajuato (Central Mexico)
    const projects: ProjectPin[] = [
        {
            id: 'leon',
            x: 48,
            y: 58,
            city: 'León',
            type: 'Industria Cuero Calzado',
            stats: '500 kWp',
        },
        {
            id: 'irapuato',
            x: 49,
            y: 60,
            city: 'Irapuato',
            type: 'Industrial',
            stats: '350 kWp',
        },
        {
            id: 'ags',
            x: 46,
            y: 55,
            city: 'Aguascalientes',
            type: 'Industrial Ensamblado',
            stats: '500 kWp',
        },
        {
            id: 'qro',
            x: 52,
            y: 61,
            city: 'Querétaro',
            type: 'Manufactura',
            stats: '2.5 MW',
        },
        {
            id: 'cdmx',
            x: 55,
            y: 68,
            city: 'CDMX',
            type: 'Proyecto Comercial',
            stats: '250 kWp',
        },
        {
            id: 'gdl',
            x: 42,
            y: 62,
            city: 'Guadalajara',
            type: 'Agroindustrial',
            stats: '500 kWp',
        },
        {
            id: 'mty',
            x: 52,
            y: 35,
            city: 'Monterrey',
            type: 'Industrial',
            stats: '1.2 MW',
        },
    ]

    return (
        <div className="relative w-full h-full text-ink group">
            {/* SVG Map */}
            <div className="w-full h-full flex items-center justify-center p-4">
                <svg
                    viewBox="0 0 100 70"
                    className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] filter"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path
                        d="M17.4,12.6 C18.1,13.2 19.3,15.6 19.8,17.1 C20.3,18.6 20.8,24.3 21.0,26.4 C21.2,28.5 22.8,32.4 23.9,34.2 C25.0,36.0 27.2,38.1 29.5,39.6 C31.8,41.1 36.3,42.9 39.0,43.2 C41.7,43.5 45.4,45.0 46.9,46.5 C48.4,48.0 49.3,51.0 49.9,53.4 C50.5,55.8 52.6,57.3 54.4,57.6 C56.2,57.9 61.3,57.3 63.4,56.4 C65.5,55.5 70.0,52.5 72.1,51.0 C74.2,49.5 78.4,46.5 80.5,45.0 C82.6,43.5 86.8,39.0 87.7,37.8 C88.6,36.6 92.2,34.5 93.4,34.2 C94.6,33.9 95.8,33.0 95.2,31.8 C94.6,30.6 91.9,30.9 90.4,32.1 C88.9,33.3 86.8,34.8 84.7,35.4 C82.6,36.0 77.5,34.8 75.4,33.6 C73.3,32.4 70.3,27.0 69.4,25.5 C68.5,24.0 64.9,18.0 63.4,16.5 C61.9,15.0 57.1,14.4 54.7,14.7 C52.3,15.0 48.1,16.5 45.4,16.2 C42.7,15.9 36.4,12.3 34.3,11.4 C32.2,10.5 28.3,10.2 26.2,10.8 C24.1,11.4 19.3,9.9 17.8,10.2 C16.3,10.5 14.2,11.1 14.8,12.0 C15.4,12.9 16.7,12.0 17.4,12.6 Z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[0.5] hover:fill-accent-gold/10 transition-colors duration-500"
                        style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))" }}
                    />

                    {/* Baja Separate for detail */}
                    <path
                        d="M8.7,9.6 C9.3,10.2 11.4,14.1 12.0,16.5 C12.6,18.9 13.8,24.0 14.1,26.4 C14.4,28.8 15.6,32.4 16.2,33.6 C16.8,34.8 17.7,35.1 17.4,34.2 C17.1,33.3 16.2,28.5 15.6,26.4 C15.0,24.3 14.1,18.0 13.8,16.5 C13.5,15.0 12.0,11.4 11.4,10.5 C10.8,9.6 9.3,8.7 8.7,9.0 C8.1,9.3 8.1,9.0 8.7,9.6 Z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[0.5] hover:fill-accent-gold/10 transition-colors duration-500"
                    />
                </svg>

                {/* Pins Layer - Absolute positioned over the SVG container */}
                <div className="absolute inset-0 w-full h-full">
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            className="absolute group/pin cursor-pointer"
                            style={{
                                left: `${proj.x}%`,
                                top: `${proj.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            onMouseEnter={() => setActivePin(proj.id)}
                            onMouseLeave={() => setActivePin(null)}
                        >
                            <div className="relative">
                                {/* Pulse */}
                                <div className="absolute -inset-2 bg-accent-gold/30 rounded-full animate-ping opacity-75"></div>

                                {/* Pin Dot */}
                                <div className={`w-2.5 h-2.5 rounded-full border border-ink shadow-sm transition-all duration-300 ${activePin === proj.id ? 'bg-accent-gold scale-125' : 'bg-highlight'}`}></div>

                                {/* Tooltip */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max z-50 transition-all duration-300 ${activePin === proj.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                    <div className="bg-ink/90 backdrop-blur-md text-canvas px-3 py-2 rounded-lg shadow-xl border border-accent-gold/20 flex flex-col items-center">
                                        <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-0.5">{proj.city}</span>
                                        <span className="text-xs font-semibold">{proj.type}</span>
                                        {proj.stats && <span className="text-[10px] text-canvas/70">{proj.stats}</span>}
                                        {/* Arrow */}
                                        <div className="w-2 h-2 bg-ink/90 rotate-45 absolute -bottom-1 border-r border-b border-accent-gold/20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
