import GlobalApi from './_utils/GlobalApi';
import HomeContent from './_components/HomeContent';

export const metadata = {
  title: 'Motor za kapiju, LED rasvjeta, Bazenska rasvjeta | Led Tehnika',
  description: 'Led Tehnika - ekskluzivni uvoznik motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama u Bosni.',
  keywords: [
    'motor za kapiju',
    'motori za kapije',
    'LED rasvjeta',
    'bazenska rasvjeta',
    'kaloliferi',
    'grijanje',
    'uvoznik rasvjete',
    'Led Tehnika',
    'motor za kapiju Bosna',
    'LED rasvjeta Bosna',
    'bazenska rasvjeta Bosna',
    'kapijski motor',
    'automatska kapija'
  ],
  alternates: {
    canonical: 'https://ledtehnika.com',
  },
  openGraph: {
    title: 'Motor za kapiju, LED rasvjeta, Bazenska rasvjeta | Led Tehnika',
    description: 'Ekskluzivni uvoznik motora za kapije, LED i bazenske rasvjete, grijanja i kalolifera. Kvalitetni proizvodi po najboljim cijenama.',
    url: 'https://ledtehnika.com',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
    images: [{
      url: 'https://ledtehnika.com/logo-black.png',
      width: 1200,
      height: 630,
      alt: 'Led Tehnika - Motor za kapiju, LED rasvjeta',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motor za kapiju, LED rasvjeta, Bazenska rasvjeta | Led Tehnika',
    description: 'Ekskluzivni uvoznik motora za kapije, LED i bazenske rasvjete',
    images: ['https://ledtehnika.com/logo-black.png'],
  },
};

export default async function Home() {
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  return (
    <HomeContent categoryList={categoryList} productList={productList} />
  );
}
