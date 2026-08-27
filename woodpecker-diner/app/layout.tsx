import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Pacifico, Poppins } from 'next/font/google'
import { SITE } from '@/data/site'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: `${SITE.naam} · ${SITE.stad} — Southern comfort food van de Josper`,
  description:
    'Southern comfort food uit Dordrecht, gegrild en gerookt op de Josper houtskooloven. Bekijk de lunch-, diner- en drinkskaart en reserveer online een tafel.',
  keywords: [
    'The Woodpecker Diner',
    'Dordrecht',
    'Josper',
    'southern comfort food',
    'restaurant Dordrecht',
    'reserveren',
  ],
  openGraph: {
    title: `${SITE.naam} · ${SITE.stad}`,
    description:
      'Southern comfort food uit Dordrecht — gegrild en gerookt op de Josper houtskooloven.',
    locale: 'nl_NL',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5E6D3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${bebas.variable} ${pacifico.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
