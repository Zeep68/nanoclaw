import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MenuSection from '@/components/MenuSection'
import About from '@/components/About'
import Reserve from '@/components/Reserve'
import Footer from '@/components/Footer'
import { SITE } from '@/data/site'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: SITE.naam,
  description: SITE.tagline,
  servesCuisine: ['Southern American', 'Comfort food'],
  priceRange: '€€',
  telephone: SITE.telefoon,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.adres.straat,
    postalCode: SITE.adres.postcode,
    addressLocality: SITE.adres.plaats,
    addressCountry: 'NL',
  },
  openingHours: ['Mo-Th 12:00-22:00', 'Fr-Sa 12:00-00:00', 'Su 12:00-21:00'],
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="checker" aria-hidden="true" />
        <MenuSection />
        <div className="checker orange" aria-hidden="true" />
        <About />
        <Reserve />
        <div className="checker green" aria-hidden="true" />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
