import ProductDetailPage from '../../_components/ProductDetailPage';
import GlobalApi from '@/app/_utils/GlobalApi';
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema, generateReviewSchema } from '@/lib/generateSchemas';
import { truncateAtWord } from '@/lib/utils';

export const revalidate = 3600; // Revalidate every hour - cached for speed, fresh data in background

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
      ? truncateAtWord(product.description.replace(/\n/g, ' ').trim(), 155)
      : `${productName} - ${categoryNameDisplay} na Led Tehnika. Kvalitetni proizvodi po najboljim cijenama.`;

    if (price && description.length < 130) {
      description = `${description} Cijena: ${price}.`;
    }

    // Extract model number for title enhancement
    const extractModelNumber = (name) => {
      if (!name) return null;
      const patterns = [
        /(?:model|model:|kod|code|artikl|art\.?)[\s:]*([A-Z]{1,3}[- ]?[A-Z0-9]{1,6})/i,
        /\b([A-Z]{1,3}[- ]?[P]?\d{2,4}[A-Z]?)\b/,
        /\(([A-Z]{1,3}[- ]?[A-Z0-9]{1,6})\)/,
      ];
      for (const pattern of patterns) {
        const match = name.match(pattern);
        if (match && match[1]) {
          return match[1].replace(/\s+/g, '-').toUpperCase();
        }
      }
      return null;
    };

    const modelNumber = product.modelNumber || product.code || product.mpn || extractModelNumber(productName);
    
    // Enhanced title with model number and category
    let seoTitle = productName;
    if (modelNumber && !productName.includes(modelNumber)) {
      // Add model number if not already in name
      seoTitle = `${productName} (Model: ${modelNumber})`;
    }
    
    if (
      lowerName.includes('motor') ||
      lowerName.includes('kapij') ||
      lowerCategory.includes('motor') ||
      lowerCategory.includes('kapij')
    ) {
      // Long-tail suffix: extract weight capacity from name if present (e.g. "600" -> "do 600kg")
      const weightMatch = productName.match(/(\d{3,4})\s*(kg)?/i);
      const weightSuffix = weightMatch ? ` do ${weightMatch[1]}kg` : '';
      // Determine gate type from name
      const isKlizna = lowerName.includes('klizn') || lowerName.includes('sliding');
      const isKrilna = lowerName.includes('kriln') || lowerName.includes('swing');
      const gateType = isKlizna ? 'kliznu' : isKrilna ? 'krilnu' : 'kliznu';
      seoTitle = `${seoTitle} – Motor za ${gateType} kapiju${weightSuffix}`;
    } else if (categoryNameDisplay) {
      seoTitle = `${seoTitle} - ${categoryNameDisplay}`;
    }
    // Layout template adds " | Led Tehnika"

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

  // Generate FAQ schema if product has FAQs (can be added to product data later)
  const productFAQs = product.faqs || product.frequentlyAskedQuestions || [];
  const faqSchema = productFAQs.length > 0 ? generateFAQSchema(productFAQs, baseDomain) : null;

  // Generate Review schema if product has reviews (can be added to product data later)
  const productReviews = product.reviews || [];
  const aggregateRating = product.aggregateRating || (productReviews.length > 0 ? {
    ratingValue: product.averageRating || "5",
    reviewCount: productReviews.length
  } : null);
  const reviewSchema = productReviews.length > 0 ? generateReviewSchema(productReviews, aggregateRating) : null;

  return (
    <>
      <script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {reviewSchema && (
        <script
          id="review-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      <ProductDetailPage
        product={product}
        categoryName={categoryNameDisplay}
        categorySlug={categorySlug}
      />
    </>
  );
}
