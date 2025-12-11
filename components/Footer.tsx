import { MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-canvas pt-20 pb-10 text-ink">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <img
              src="/logos/FADEMEX%20LOGOTIPOS%20-01.svg"
              alt="FADEMEX"
              className="h-8 w-auto mb-6"
            />
            <p className="text-ink/70 text-sm leading-relaxed">
              Soluciones de ingeniería energética para el sector industrial y
              comercial de México.
            </p>
          </div>

          <div>
            <h4 className="text-ink font-extrabold mb-6">Soluciones</h4>
            <ul className="space-y-3 text-sm text-ink/70">
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
            <h4 className="text-ink font-extrabold mb-6">Compañía</h4>
            <ul className="space-y-3 text-sm text-ink/70">
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
            <h4 className="text-ink font-extrabold mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-ink/70">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-gold" /> Querétaro,
                México
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-gold" /> +52 (442)
                123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-gold" /> info@fademex.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink/50">
            © 2025 FADEMEX Energy Systems. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-ink/50">
            <Link href="/" className="hover:text-ink transition-colors">
              Privacidad
            </Link>
            <Link href="/" className="hover:text-ink transition-colors">
              Términos
            </Link>
            <Link href="/" className="hover:text-ink transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
