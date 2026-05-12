import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoftBox — Tutoriels Audiovisuels',
  description: 'Plateforme de tutoriels vidéo réalisés par des étudiants en audiovisuel.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}