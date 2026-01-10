export const metadata = {
  title: 'Kontakt - Motor za kapiju, LED rasvjeta | Led Tehnika',
  description: 'Kontaktirajte Led Tehnika za motor za kapiju, LED rasvjetu, bazensku rasvjetu i druge proizvode. Pozovite nas ili pošaljite poruku. Nalazimo se u Novoj Topoli.',
  keywords: [
    'kontakt',
    'Led Tehnika',
    'motor za kapiju',
    'LED rasvjeta',
    'bazenska rasvjeta',
    'Nova Topola',
    'telefon',
    'adresa'
  ],
  alternates: {
    canonical: 'https://ledtehnika.com/kontakt',
  },
  openGraph: {
    title: 'Kontakt | Led Tehnika',
    description: 'Brzo nas kontaktirajte za informacije, narudžbe ili podršku. Motor za kapiju, LED rasvjeta i još mnogo toga.',
    url: 'https://ledtehnika.com/kontakt',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
    images: [{
      url: 'https://ledtehnika.com/logo-black.png',
      width: 1200,
      height: 630,
      alt: 'Led Tehnika - Kontakt',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | Led Tehnika',
    description: 'Brzo nas kontaktirajte za informacije, narudžbe ili podršku.',
    images: ['https://ledtehnika.com/logo-black.png'],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
