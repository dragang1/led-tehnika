import ProductDetailPage from '../../_components/ProductDetailPage';
import GlobalApi from '@/app/_utils/GlobalApi';
import Script from 'next/script';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/generateSchemas';

export async function generateMetadata({ params }) {
  const { productSlug } = await params;

  try {
    const product = await GlobalApi.getProductBySlug(productSlug);
    if (!product) {
      return {
        title: 'Proizvod nije pronađen',
        description: 'Traženi proizvod nije dostupan.',
      };
    }

    // Data is already flattened - no attributes wrapper
    const productName = product.name || '';
    const category = product.kategorije || {};
    const categoryNameDisplay = category.name || 'Nepoznata kategorija';
    // Generate slug from category name since API doesn't provide slug
    const categorySlug = category.name ? category.name.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';
    const baseDomain = 'https://ledtehnika.com';

    let imageUrl = product.image?.[0]?.url || '/logo-black.png';
    if (imageUrl && !imageUrl.startsWith('http')) {
      if (imageUrl.startsWith('/uploads/') || imageUrl.startsWith('/api/')) {
        imageUrl = `https://led-backend-62tj.onrender.com${imageUrl}`;
      } else if (imageUrl.startsWith('/')) {
        imageUrl = `${baseDomain}${imageUrl}`;
      } else {
        imageUrl = `${baseDomain}/${imageUrl}`;
      }
    }

    const price = product.price ? `${product.price.toFixed(2)} KM` : '';
    const lowerName = productName.toLowerCase();
    const lowerCategory = categoryNameDisplay.toLowerCase();

    let description = product.description
      ? product.description.slice(0, 155).replace(/\n/g, ' ').trim()
      : `${productName} - ${categoryNameDisplay} na Led Tehnika. Kvalitetni proizvodi po najboljim cijenama.`;

    if (price && description.length < 130) {
      description = `${description} Cijena: ${price}.`;
    }

    let seoTitle = productName;
    if (
      lowerName.includes('motor') ||
      lowerName.includes('kapij') ||
      lowerCategory.includes('motor') ||
      lowerCategory.includes('kapij')
    ) {
      seoTitle = `${productName} - Motor za kapiju | Led Tehnika`;
    } else if (categoryNameDisplay) {
      seoTitle = `${productName} - ${categoryNameDisplay} | Led Tehnika`;
    } else {
      seoTitle = `${productName} | Led Tehnika`;
    }

    return {
      title: seoTitle,
      description,
      alternates: {
        canonical: `${baseDomain}/kategorije/${categorySlug}/${productSlug}`,
      },
      openGraph: {
        title: seoTitle,
        description,
        url: `${baseDomain}/kategorije/${categorySlug}/${productSlug}`,
        siteName: 'Led Tehnika',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: productName }],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description,
        images: [imageUrl],
      },
    };
  } catch (e) {
    return { title: 'Proizvod nije pronađen', description: 'Traženi proizvod nije dostupan.' };
  }
}

export async function generateStaticParams() {
  try {
    const products = await GlobalApi.getAllProducts();
    return products
      .map((product) => {
        // Data is already flattened
        const category = product.kategorije || {};
        const categoryName = category.name || '';
        // Generate slug from category name - route parameter is [categoryName] so we use the slug as the value
        const categorySlug = categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';
        return {
          categoryName: categorySlug, // Route param is [categoryName], so we pass the slug as categoryName
          productSlug: product.slug || '',
        };
      })
      .filter((p) => p.productSlug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }) {
  const { productSlug, categoryName } = await params;
  const product = await GlobalApi.getProductBySlug(productSlug);

  if (!product) {
    return <p>Proizvod nije pronađen.</p>;
  }

  // Data is already flattened - no attributes wrapper
  const category = product.kategorije || {};
  const categoryNameDisplay = category.name || 'Nepoznata kategorija';
  // Generate slug from category name since API doesn't provide slug
  const categorySlug = category.name ? category.name.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';

  const baseDomain = 'https://ledtehnika.com';
  const productSchema = generateProductSchema(product, categoryNameDisplay, categorySlug, baseDomain);
  const breadcrumbSchema = generateBreadcrumbSchema(
    categoryNameDisplay,
    categorySlug,
    product.name,
    product.slug,
    baseDomain
  );

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailPage
        product={product}
        categoryName={categoryNameDisplay}
        categorySlug={categorySlug}
      />
    </>
  );
}
