'use client'

export default function DotMatrixMap() {
  // Simplified coordinate approximation for Mexico shape using a grid system
  const points = [
    // Baja
    [15, 10], [18, 15], [20, 20], [22, 25], [24, 30], [26, 35],
    // Sonora/Chihuahua/North
    [30, 12], [35, 10], [40, 10], [45, 12], [50, 14], [55, 16], [60, 18], [65, 20],
    [32, 18], [38, 18], [44, 18], [50, 20], [56, 22], [62, 24], [68, 26],
    // Central/West
    [35, 25], [40, 25], [45, 26], [50, 28], [55, 30], [60, 32], [65, 34],
    [40, 32], [45, 34], [50, 36], [55, 38], [60, 40], [65, 42],
    // South/East
    [48, 42], [52, 44], [58, 46], [62, 48], [66, 50], [70, 48], [75, 44],
    [55, 52], [60, 54], [65, 56], [70, 54], [76, 50], [80, 46], [84, 42],
    // Yucatan
    [82, 38], [86, 36], [90, 36], [92, 40],
  ]

  const activeProjects = [
    { x: 60, y: 40, city: 'Querétaro', type: 'Sistema Industrial' },
    { x: 38, y: 18, city: 'León', type: 'Solar + BESS' },
    { x: 45, y: 34, city: 'San Luis Potosí', type: 'Smart Grid' },
    { x: 90, y: 36, city: 'Aguascalientes', type: 'Solar Comercial' },
    { x: 32, y: 18, city: 'Irapuato', type: 'Industrial' },
    { x: 55, y: 30, city: 'Guadalajara', type: 'Microgrids' },
  ]

  return (
    <div className="relative w-full h-full bg-canvas rounded-xl overflow-hidden border border-ink/15 shadow-2xl group">
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,47,48,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(45,47,48,0.07) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Scanning Line */}
      <div className="absolute inset-0 w-full h-1 bg-highlight/40 shadow-[0_0_20px_rgba(243,224,104,0.45)] animate-scan pointer-events-none z-0 blur-[1px]"></div>

      {/* Map Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80%] h-[80%]">
          {/* Render Dot Grid Map */}
          {points.map((p, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-ink/20 rounded-sm transition-colors duration-500 hover:bg-accent-gold/60"
              style={{ left: `${p[0]}%`, top: `${p[1]}%` }}
            />
          ))}

          {/* Connecting Lines (Abstract) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <path
              d="M 60% 40% L 38% 18%"
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
              strokeDasharray="4 2"
              className="opacity-50"
            />
            <path
              d="M 60% 40% L 90% 36%"
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
              strokeDasharray="4 2"
              className="opacity-50"
            />
            <path
              d="M 60% 40% L 45% 34%"
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
              strokeDasharray="4 2"
              className="opacity-50"
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(225,235,163,0)" />
                <stop offset="50%" stopColor="rgba(225,235,163,0.6)" />
                <stop offset="100%" stopColor="rgba(225,235,163,0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Active Project Pins */}
          {activeProjects.map((proj, i) => (
            <div
              key={i}
              className="absolute group/pin cursor-pointer z-10"
              style={{ left: `${proj.x}%`, top: `${proj.y}%` }}
            >
              {/* Pulse Rings */}
              <div className="absolute -inset-4 bg-highlight/15 rounded-full animate-ping"></div>
              <div className="absolute -inset-2 bg-accent-gold/25 rounded-full animate-pulse"></div>

              {/* Core Pin */}
              <div className="relative w-3 h-3 bg-highlight rounded-sm border border-ink shadow-[0_0_10px_rgba(243,224,104,0.8)] group-hover/pin:scale-125 transition-transform duration-300"></div>

              {/* Tech Tooltip */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-max opacity-0 group-hover/pin:opacity-100 transition-all duration-300 translate-x-2 group-hover/pin:translate-x-0 z-20">
                <div className="bg-ink/95 backdrop-blur-md border border-accent-gold/40 p-3 rounded-r-md rounded-tl-md shadow-2xl">
                  <div className="text-xs font-semibold text-accent-gold mb-1 uppercase tracking-[0.2em] text-canvas">
                    {proj.city}
                  </div>
                  <div className="text-[10px] text-canvas/80 flex items-center gap-1">
                    <div className="w-1 h-1 bg-highlight rounded-sm animate-pulse"></div>
                    {proj.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Stats */}
      <div className="absolute bottom-6 left-6 bg-ink/90 backdrop-blur border border-canvas/10 px-4 py-2 rounded-md">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-canvas/80 uppercase tracking-[0.2em]">
              Proyectos Activos
            </span>
            <span className="text-xl font-extrabold text-canvas">250+</span>
          </div>
          <div className="h-8 w-px bg-canvas/15"></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-canvas/80 uppercase tracking-[0.2em]">
              Potencia Total
            </span>
            <span className="text-xl font-extrabold text-accent-gold">
              450<span className="text-sm">MW</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
