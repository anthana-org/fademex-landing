import { MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

// Logo Component
const FademexLogo = ({ className = 'h-8' }: { className?: string }) => (
  <svg
    viewBox="0 0 300 80"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M60 25 L30 50 L0 50 L30 25 Z" fill="#FFD700" />
    <path d="M75 10 L45 35 L15 35 L45 10 Z" fill="#FFC700" />
    <path d="M45 35 L60 25 L90 25 L75 35 Z" fill="#FFB600" />
    <text
      x="100"
      y="52"
      fontFamily="Inter, sans-serif"
      fontWeight="700"
      fontSize="38"
      fill="#FFFFFF"
      letterSpacing="2"
    >
      FADEMEX
    </text>
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <FademexLogo className="h-6 mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Soluciones de ingeniería energética para el sector industrial y
              comercial de México.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Soluciones</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/soluciones"
                  className="hover:text-accent-gold transition-colors"
                >
                  Solar Industrial
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-accent-gold transition-colors"
                >
                  Almacenamiento (BESS)
                </Link>
              </li>
              <li>
                <Link
                  href="/soluciones"
                  className="hover:text-accent-gold transition-colors"
                >
                  Microgrids
                </Link>
              </li>
              <li>
                <Link
                  href="/tecnologia"
                  className="hover:text-accent-gold transition-colors"
                >
                  Consultoría Código de Red
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Compañía</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent-gold transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos"
                  className="hover:text-accent-gold transition-colors"
                >
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-accent-gold transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos"
                  className="hover:text-accent-gold transition-colors"
                >
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Querétaro, México
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +52 (442) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@fademex.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © 2025 FADEMEX Energy Systems. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Privacidad
            </Link>
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Términos
            </Link>
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
