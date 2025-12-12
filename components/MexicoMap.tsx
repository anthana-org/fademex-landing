'use client'

import { useState } from 'react'

interface ProjectPin {
    id: string
    x: number
    y: number
    city: string
    type: string
    stats?: string
}

export default function MexicoMap() {
    const [activePin, setActivePin] = useState<string | null>(null)

    // Coordinates calibrated for 793x498 SVG viewbox
    const projects: ProjectPin[] = [
        {
            id: 'leon',
            x: 390,
            y: 310,
            city: 'León',
            type: 'Industria Cuero Calzado',
            stats: '500 kWp',
        },
        {
            id: 'irapuato',
            x: 400,
            y: 318,
            city: 'Irapuato',
            type: 'Industrial',
            stats: '350 kWp',
        },
        {
            id: 'ags',
            x: 385,
            y: 295,
            city: 'Aguascalientes',
            type: 'Industrial Ensamblado',
            stats: '500 kWp',
        },
        {
            id: 'qro',
            x: 418,
            y: 315,
            city: 'Querétaro',
            type: 'Manufactura',
            stats: '2.5 MW',
        },
        {
            id: 'cdmx',
            x: 445,
            y: 338,
            city: 'CDMX',
            type: 'Proyecto Comercial',
            stats: '250 kWp',
        },
        {
            id: 'gdl',
            x: 345,
            y: 308,
            city: 'Guadalajara',
            type: 'Agroindustrial',
            stats: '500 kWp',
        },
        {
            id: 'mty',
            x: 430,
            y: 200,
            city: 'Monterrey',
            type: 'Industrial',
            stats: '1.2 MW',
        },
    ]

    return (
        <div className="relative w-full h-full text-ink group">
            <div className="w-full h-full flex items-center justify-center p-4">
                <svg
                    viewBox="0 0 793 498"
                    className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] filter"
                    preserveAspectRatio="xMidYMid meet"
                    aria-label="Map of Mexico"
                >
                    {/* Mexico Outline - Clean SVG from VictorCazanave/svg-maps */}
                    <path
                        d="M396.528,309.792l-2.34-2.26l-0.07-1.21l1.24-2.87l3.33-4.59l0.93-3.24l1.07-0.73l1.79-0.38l3.47-1.97l1.21-0.92l0.39-1.26l0.73-0.17l0.77,1.39l1.33,1.34l4.44,2.63l0.59,2.44l1.14,2.04l0.26,0.59l-0.24,1.6l1.96,2.14l-4.28,1.97l-2.55,3.55l-0.72,0.5l-3.02,1.04l-1.26,0.06l-2.17-1.02l-1.74-1.41l-4.21-0.38z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[1.5] transition-colors duration-500"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" }}
                    />
                    <path
                        d="M112.488,137.852l-0.65,0l-0.76,0.12l0.13,0.44l-0.82,0.41l-0.68,0.01l-0.75,0.86l-0.29-0.74l0.19-0.78l3.08-3.76l0.62-0.15l0.06,0.97l-0.8,0.76l-0.02,0.52l0.69,1.34z m-27.35-11.99l0.56,0.45l0.75,2.86l-0.25,1.02l0.38,2.42l-0.68,0.9l0.04,2.09l-0.62-0.19l-0.54,0.33l-0.65-0.31l-0.6-1.42l-0.58-0.18l-1,0.6l-0.37-0.15l0.07-0.78l2.73-3.03l0.15-0.68l-0.58-1.61l0.51-1.89l0.68-0.43z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[1.5] transition-colors duration-500"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" }}
                    />
                    <path
                        d="M91.058,397.562l1.49,0.37l-0.48,0.42l-1.32,0.17l-0.12-0.73l0.43-0.23z m93.9-12.95l1.03,0.69l0.7,1.07l-0.01,1.76l-0.83,0.41l-0.44-0.69l-1.15-0.2l-0.81-1.31l1.51-1.73z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[1.5] transition-colors duration-500"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" }}
                    />
                    <path
                        d="M671.968,386.932l0.5,0.79l-0.68,0.61l-0.54,0.22l-1.06-0.57l-0.38,0.33l0.39,0.33l-1.66,1.34l-0.54-0.67l-0.29,0.58l-2.12,0.86l-1.09,0.1l-0.54-0.57l0.27-0.32l2.42-0.39l5.32-2.64z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[1.5] transition-colors duration-500"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" }}
                    />
                    <path
                        d="M700.668,333.472l-0.16,7.3l4.12,0.51l0.97,2.01l0.45,0.18l1.11-0.35l0.94,0.99l0.48-0.09l0.4-1.01l0.79-0.73l0.42,0.28l1.03,1.76l-0.11,0.91l0.57,1.04l1.83,1.17l1.98,4.46l3.86,2.1l1.17,2.49l3.17,3.58l0.79,3.44l0.44,0.46l1.34,1.81l5.3,4.25l3.41,4.67l-0.18,5.85l-1.17,0.66l-0.41,0.67l0.22,2.52l-0.8,5.13l0.17,1.27l0.99,1.24l0.15,0.71l-0.51,1.37l0.82,0.46l-0.57,1.67l0.47,1.38l0.28,4.7l-0.57,1.26l-2.44,2.83l0.25,2.46l-0.02,3.33l-45.94-0.01l0.02-1.64l-3.98-1.58l-0.68,0.42l-0.77-0.9l-1.56-0.66l-1.64-1.55l-3.65-0.8l-2.79,0.13l-0.3,1.3l0.34,1.82l-0.3,0.72l-1.68,0.11l-1.29,0.64l-2.21-1.12l-1.5,0.15l-1.31-0.66l-0.87-1.43l-3.47-2.33l-1.22-1.83l-1.08-2.59l-0.45-0.32l0.18-1.97l-1.11-1.42l-0.36-0.16l-0.08,0.42l-0.53,0.13l-0.69-1.06l-0.99-0.05l-1.44-1l-0.63-0.91l-1.14-3.72l3.13-0.56l9.83-0.61l0.88,1.41l1.49,0.8l-0.6,1.18l-0.27-0.39l-0.31,0.34l-0.96-1.28l-0.73,0.85l-0.68-0.42l-0.24,0.18l0.17,0.72l-0.45,0.57l0.59,0.74l1.15-0.25l-0.45-1.12l0.79,0.04l0.28,0.46l0.57-0.14l1.1,0.72l0.16,0.56l6.79,1.67l1.43-0.13l0.16-0.7l0.73-0.7l4.45-1.53l0.82-2.92l0.63-0.32l0.35-1.32l-0.23-0.7l-1.1-1l-0.92,0.72l-1.15-0.61l-0.29-0.98l0.61-0.47l-0.07-0.79l0.97-1.04l-0.77,0.19l-0.7,1.33l-0.76,0.72l-0.52-0.05l-0.82,0.76l-0.12,0.56l-0.63,0.03l2.5-2.57l6.81-3.66l4.79-3.45l4.86-4.53l0.47-0.93l-0.08-1.02l0.52-2l-0.21-2.17l0.67-1.8l-0.51-0.56l-0.04-0.64l0.93-1.14l0.19-1.03l3.85-2.86l1.41-2.48l-0.98-2.71l0.3-1.37l-0.41-1.28l0.38-0.29l-0.39-4.48l0.3-0.78l-0.45-3.4l1.34-3.56l0.44-3.02l1.14-1.42z"
                        className="fill-canvas-alt stroke-accent-gold stroke-[1.5] transition-colors duration-500"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" }}
                    />

                    {/* SVG Pins Layer */}
                    <g>
                        {projects.map((proj) => (
                            <g
                                key={proj.id}
                                transform={`translate(${proj.x}, ${proj.y})`}
                                className="cursor-pointer group/pin"
                                onMouseEnter={() => setActivePin(proj.id)}
                                onMouseLeave={() => setActivePin(null)}
                            >
                                {/* Pulse */}
                                <circle
                                    r="12"
                                    className="fill-accent-gold/30 animate-ping opacity-75 origin-center"
                                />

                                {/* Pin Dot */}
                                <circle
                                    r="6"
                                    className={`stroke-2 stroke-ink shadow-sm transition-all duration-300 ${activePin === proj.id ? 'fill-accent-gold scale-125' : 'fill-highlight'}`}
                                />

                                {/* ForeignObject Tooltip */}
                                <foreignObject x="-100" y="-100" width="200" height="90"
                                    className={`pointer-events-none transition-all duration-300 ${activePin === proj.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                                >
                                    <div className="w-full h-full flex flex-col items-center justify-end pb-4">
                                        <div className="bg-ink/90 backdrop-blur-md text-canvas px-3 py-2 rounded-lg shadow-xl border border-accent-gold/20 flex flex-col items-center whitespace-nowrap">
                                            <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-0.5">{proj.city}</span>
                                            <span className="text-xs font-semibold">{proj.type}</span>
                                            {proj.stats && <span className="text-[10px] text-canvas/70">{proj.stats}</span>}
                                            <div className="w-2 h-2 bg-ink/90 rotate-45 absolute -bottom-1 border-r border-b border-accent-gold/20"></div>
                                        </div>
                                    </div>
                                </foreignObject>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    )
}
