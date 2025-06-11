import GlobalApi from '@/app/_utils/GlobalApi';
import ProductDetailPage from './productDetailPage';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await GlobalApi.getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Proizvod nije pronađen',
        description: 'Traženi proizvod nije dostupan.',
      };
    }

    return {
      title: product.name,
      description: product.description?.slice(0, 160).replace(/\n/g, ' ') || 'Detalji proizvoda',
      openGraph: {
        title: product.name,
        description: product.description?.slice(0, 160).replace(/\n/g, ' '),
        type: 'website',
        url: `https://ledtehnika.com/productDetail/${slug}`,
        images: [
          {
            url: product.image?.[0]?.url || '/logo-black.png',  // image umjesto images
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
  const { slug } = await params;
  const product = await GlobalApi.getProductBySlug(slug);

  // Pripremi JSON-LD podatke
  const jsonLd = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image?.map(img => img.url) || [],
    "description": product.description?.replace(/\n/g, ' ') || '',
    "sku": product.documentId || '',
    "offers": {
      "@type": "Offer",
      "url": `https://ledtehnika.com/productDetail/${slug}`,
      "priceCurrency": "BAM", // ili druga valuta ako koristiš
      "price": product.price?.toString() || '0',
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  } : null;

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          // Važno: JSON mora biti stringificiran
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailPage product={product} />
    </>
  );
}
