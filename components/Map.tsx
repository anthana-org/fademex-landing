'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: false
    }).setView([21.2, -101.5], 8)

    mapInstanceRef.current = map

    // Dark matter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    // Custom Glowing Icon
    const iconHtml = `
      <div style="
        position: relative;
        width: 16px;
        height: 16px;
      ">
        <div style="
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: #FFD700;
          border-radius: 50%;
          box-shadow: 0 0 15px #FFD700;
        "></div>
        <div style="
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          border: 1px solid #FFD700;
          border-radius: 50%;
          opacity: 0.5;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
      </div>
      <style>
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      </style>
    `

    const glowingIcon = L.divIcon({
      html: iconHtml,
      className: 'bg-transparent',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    })

    const locations = [
      { name: "Querétaro", lat: 20.5888, lng: -100.3899 },
      { name: "León, Gto", lat: 21.1221, lng: -101.6664 },
      { name: "Aguascalientes", lat: 21.8818, lng: -102.2916 },
      { name: "San Luis Potosí", lat: 22.1565, lng: -100.9855 },
      { name: "Guadalajara", lat: 20.6597, lng: -103.3496 },
      { name: "Irapuato", lat: 20.6736, lng: -101.3468 }
    ]

    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng], { icon: glowingIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: 'Inter'; color: #333; text-align: center;">
            <strong style="color: #D4AF37;">Proyecto Finalizado</strong><br>
            ${loc.name}
          </div>
        `)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full rounded-[20px]" />
}
