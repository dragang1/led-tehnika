import AboutContent from './AboutContent';

export const metadata = {
  title: 'O nama - Led Tehnika | Motor za kapiju, LED rasvjeta, Bazenska rasvjeta',
  description: 'Led Tehnika je ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete i grijanja. Kvalitetni proizvodi po najboljim cijenama u Bosni.',
  alternates: {
    canonical: 'https://ledtehnika.com/ledTehnika',
  },
  openGraph: {
    title: 'O nama - Led Tehnika | Motor za kapiju, LED rasvjeta',
    description: 'Led Tehnika je ekskluzivni uvoznik i distributer motora za kapije, LED i bazenske rasvjete. Saznajte više o nama.',
    url: 'https://ledtehnika.com/ledTehnika',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
    images: [{
      url: 'https://ledtehnika.com/logo-black.png',
      width: 1200,
      height: 630,
      alt: 'O nama - Led Tehnika',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O nama - Led Tehnika',
    description: 'Led Tehnika je ekskluzivni uvoznik i distributer motora za kapije, LED i bazenske rasvjete.',
    images: ['https://ledtehnika.com/logo-black.png'],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
