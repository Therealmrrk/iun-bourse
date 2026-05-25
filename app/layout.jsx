import './globals.css'

export const metadata = {
  title: 'Bourse d\'Excellence de l\'Institut Universitaire Nobel 2026',
  description: 'Candidature à la Bourse d\'Excellence de l\'Institut Universitaire Nobel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" translate="no">
      <body>{children}</body>
    </html>
  )
}
