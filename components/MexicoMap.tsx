'use client'

import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

interface ProjectPin {
    id: string
    longitude: number
    latitude: number
    city: string
    type: string
    stats?: string
}

export default function MexicoMap() {
    const [popupInfo, setPopupInfo] = useState<ProjectPin | null>(null)

    const projects: ProjectPin[] = [
        {
            id: 'leon',
            longitude: -101.6828,
            latitude: 21.1212,
            city: 'León',
            type: 'Industria Cuero Calzado',
            stats: '500 kWp',
        },
        {
            id: 'irapuato',
            longitude: -101.3475,
            latitude: 20.6767,
            city: 'Irapuato',
            type: 'Industrial',
            stats: '350 kWp',
        },
        {
            id: 'ags',
            longitude: -102.2916,
            latitude: 21.8853,
            city: 'Aguascalientes',
            type: 'Industrial Ensamblado',
            stats: '500 kWp',
        },
        {
            id: 'qro',
            longitude: -100.3899,
            latitude: 20.5888,
            city: 'Querétaro',
            type: 'Manufactura',
            stats: '2.5 MW',
        },
        {
            id: 'cdmx',
            longitude: -99.1332,
            latitude: 19.4326,
            city: 'CDMX',
            type: 'Proyecto Comercial',
            stats: '250 kWp',
        },
        {
            id: 'gdl',
            longitude: -103.3494,
            latitude: 20.6597,
            city: 'Guadalajara',
            type: 'Agroindustrial',
            stats: '500 kWp',
        },
        {
            id: 'mty',
            longitude: -100.3161,
            latitude: 25.6866,
            city: 'Monterrey',
            type: 'Industrial',
            stats: '1.2 MW',
        },
    ]

    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZmFkZW1leCIsImEiOiJjbTRyOGw4OTkwMDFqMmxzYmptcnVpNTFmIn0.dummy'}
                initialViewState={{
                    longitude: -102.5528,
                    latitude: 23.6345,
                    zoom: 4.5,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                interactive={true}
                scrollZoom={false}
                dragPan={true}
                dragRotate={false}
                touchZoomRotate={false}
            >
                {projects.map((project) => (
                    <Marker
                        key={project.id}
                        longitude={project.longitude}
                        latitude={project.latitude}
                        anchor="center"
                        onClick={(e: any) => {
                            e.originalEvent.stopPropagation()
                            setPopupInfo(project)
                        }}
                    >
                        <div className="relative cursor-pointer group">
                            {/* Pulse ring */}
                            <div className="absolute inset-0 -m-2 flex items-center justify-center animate-ping opacity-40">
                                <div className="w-6 h-6 rounded-full bg-accent-gold" />
                            </div>
                            {/* Pin dot */}
                            <div className="relative w-4 h-4 rounded-full bg-accent-gold border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-150" />
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        anchor="bottom"
                        onClose={() => setPopupInfo(null)}
                        closeButton={false}
                        className="mapbox-popup"
                    >
                        <div className="bg-ink/95 backdrop-blur-sm text-canvas px-4 py-3 rounded-lg border border-accent-gold/30 min-w-[200px]">
                            <div className="text-xs uppercase tracking-wider text-accent-gold font-bold mb-1">
                                {popupInfo.city}
                            </div>
                            <div className="text-sm font-medium mb-1">
                                {popupInfo.type}
                            </div>
                            {popupInfo.stats && (
                                <div className="text-xs text-canvas/70">
                                    {popupInfo.stats}
                                </div>
                            )}
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    )
}
