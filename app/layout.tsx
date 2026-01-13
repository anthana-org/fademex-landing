import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FADEMEX | Energía Solar del Futuro',
  description: 'Consultoría y Energía Solar 360° para empresas en México.',
  icons: {
    icon: '/logos/FADEMEX ISOTIPOS-01.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${plusJakarta.className} antialiased`}>{children}</body>
    </html>
  )
}
