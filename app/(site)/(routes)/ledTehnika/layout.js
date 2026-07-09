export const metadata = {
  title: 'O nama - Motor za kapiju, LED rasvjeta, Bazenska rasvjeta | Led Tehnika',
  description: 'Led Tehnika je ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Saznajte više o našoj misiji i vrijednostima.',
  keywords: [
    'Led Tehnika',
    'o nama',
    'motor za kapiju',
    'LED rasvjeta',
    'bazenska rasvjeta',
    'uvoznik rasvjete',
    'distributer rasvjete',
    'Bosna'
  ],
  alternates: {
    canonical: 'https://ledtehnika.com/ledTehnika',
  },
  openGraph: {
    title: 'O nama | Led Tehnika',
    description: 'Saznajte više o nama – našoj misiji, vrijednostima i iskustvu u oblasti LED i bazenske rasvjete, motora za kapije.',
    url: 'https://ledtehnika.com/ledTehnika',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
    images: [{
      url: 'https://ledtehnika.com/logo-black.png',
      width: 1200,
      height: 630,
      alt: 'Led Tehnika - O nama',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O nama | Led Tehnika',
    description: 'Saznajte više o Led Tehnika',
    images: ['https://ledtehnika.com/logo-black.png'],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
