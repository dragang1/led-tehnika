import GlobalApi from '@/app/_utils/GlobalApi';

import ProductDetailPage from './productDetailPage';

export async function generateMetadata({ params }) {
  try {
    const product = await GlobalApi.getProductById(params.id);

    if (!product) return null;

    const image = product.image?.[0]?.url || 'https://ledtehnika.com/logo-black.png';

    return {
      title: product.name,
      description: product.description?.slice(0, 160),
      openGraph: {
        title: product.name,
        description: product.description,
        type: 'website',
        url: `https://ledtehnika.com/productDetail/${product.id}`,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
    };
  } catch (e) {
    return null; 
  }
}

export default async function Page({ params }) {
  const product = await GlobalApi.getProductById(params.id);

  if (!product) {
    return <div>Proizvod nije pronađen</div>;
  }

  return <ProductDetailPage initialProduct={product} />;
}
