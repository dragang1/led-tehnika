import GlobalApi from '@/app/_utils/GlobalApi';

import ProductDetailPage from './productDetailPage';

export async function generateMetadata({ params }) {
  try {
    const product = await GlobalApi.getProductById(params.id);

    if (!product) {
      return {
        title: 'Proizvod nije pronađen',
        description: 'Traženi proizvod nije dostupan.',
      };
    }

    const selectedImage = product.image?.[0]?.url || '/logo-black.png';

    return {
      title: product.name,
      description: product.description || 'Detalji proizvoda',
      openGraph: {
        title: product.name,
        description: product.description,
        url: `https://ledtehnika.com/productDetail/${product.id}`,
        siteName: 'Led Tehnika',
        images: [
          {
            url: selectedImage,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [selectedImage],
      },
    };
  } catch (error) {
    return {
      title: 'Greška',
      description: 'Došlo je do greške prilikom učitavanja proizvoda.',
    };
  }
}

export default async function Page({ params }) {
  const product = await GlobalApi.getProductById(params.id);

  if (!product) {
    return <div>Proizvod nije pronađen</div>;
  }

  return <ProductDetailPage initialProduct={product} />;
}
