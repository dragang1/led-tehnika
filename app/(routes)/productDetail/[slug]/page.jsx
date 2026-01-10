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

    // Create SEO-optimized title with keywords
    const productName = product.name || '';
    const category = product.kategorije?.name || '';
    const baseDomain = 'https://ledtehnika.com';
    
    // Generate absolute image URL - handle both Strapi relative and absolute URLs
    let imageUrl = product.image?.[0]?.url || '/logo-black.png';
    if (imageUrl && !imageUrl.startsWith('http')) {
      // Strapi typically returns URLs like /uploads/image.jpg or full backend URLs
      if (imageUrl.startsWith('/uploads/') || imageUrl.startsWith('/api/')) {
        imageUrl = `https://led-backend-62tj.onrender.com${imageUrl}`;
      } else if (imageUrl.startsWith('/')) {
        imageUrl = `${baseDomain}${imageUrl}`;
      } else {
        imageUrl = `${baseDomain}/${imageUrl}`;
      }
    } else if (!imageUrl || imageUrl === '/logo-black.png') {
      imageUrl = `${baseDomain}/logo-black.png`;
    }

    const price = product.price ? `${product.price.toFixed(2)} KM` : '';
    const lowerName = productName.toLowerCase();
    const lowerCategory = category?.toLowerCase() || '';
    
    // Build SEO-optimized description
    let description = product.description 
      ? product.description.slice(0, 155).replace(/\n/g, ' ').trim()
      : `${productName} ${category ? `- ${category}` : ''} na Led Tehnika. Kvalitetni proizvodi po najboljim cijenama.`;
    
    // Add price and keywords to description if space allows
    if (price && description.length < 130) {
      description = `${description} Cijena: ${price}.`;
    }
    
    // Build SEO-optimized title for better ranking on "motor za kapiju"
    let seoTitle = productName;
    
    // Prioritize "motor za kapiju" keyword for relevant products - THIS IS KEY FOR GOOGLE RANKING
    if (lowerName.includes('motor') || lowerName.includes('kapij') || 
        lowerCategory.includes('motor') || lowerCategory.includes('kapij')) {
      seoTitle = `${productName} - Motor za kapiju | Led Tehnika`;
      // Enhance description for motor products
      if (!product.description || description.length < 100) {
        description = `Motor za kapiju ${productName} - ${category || ''} na Led Tehnika. Kvalitetni automatski motori za kapije po najboljim cijenama u Bosni. ${price ? `Cijena: ${price}.` : ''}`;
      }
    } else if (category) {
      seoTitle = `${productName} - ${category} | Led Tehnika`;
    } else {
      seoTitle = `${productName} | Led Tehnika`;
    }

    return {
      title: seoTitle,
      description: description,
      keywords: [
        productName,
        category,
        ...(lowerName.includes('motor') || lowerCategory.includes('motor') || 
            lowerName.includes('kapij') || lowerCategory.includes('kapij') 
            ? ['motor za kapiju', 'motori za kapije', 'kapijski motor', 'automatska kapija', 'motor za kapiju cijena', 'motor za kapiju Bosna', 'motor za kapiju na stanju'] : []),
        ...(lowerName.includes('led') || lowerCategory.includes('led') 
            ? ['LED rasvjeta', 'LED svjetla', 'LED rasvjeta Bosna', 'LED osvjetljenje'] : []),
        ...(lowerName.includes('bazensk') || lowerCategory.includes('bazensk') 
            ? ['bazenska rasvjeta', 'bazensko osvjetljenje', 'bazenska rasvjeta Bosna'] : []),
        ...(category ? [category] : []),
        'Led Tehnika',
        price ? `${productName} cijena` : '',
        'uvoznik',
        'distributer',
      ].filter(Boolean),
      alternates: {
        canonical: `${baseDomain}/productDetail/${slug}`, 
      },
      openGraph: {
        title: seoTitle,
        description: description,
        type: 'website',
        url: `${baseDomain}/productDetail/${slug}`,
        siteName: 'Led Tehnika',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: productName,
          },
        ],
        locale: 'bs_BA',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: description,
        images: [imageUrl],
      },
    };
  } catch (e) {
    return {
      title: 'Proizvod nije pronađen',
      description: 'Traženi proizvod nije dostupan.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const products = await GlobalApi.getAllProducts();
    return products.map((product) => ({
      slug: product.slug || product.attributes?.slug || '',
    })).filter(p => p.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}


export default async function Page({ params }) {
  const { slug } = await params;
  const product = await GlobalApi.getProductBySlug(slug);

  // Pripremi JSON-LD podatke
  const baseDomain = 'https://ledtehnika.com';
  const categoryName = product?.kategorije?.name || '';
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
  
  // Product structured data
  const productSchema = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image?.map(img => {
      const imgUrl = img.url || '';
      if (!imgUrl) return `${baseDomain}/logo-black.png`;
      if (imgUrl.startsWith('http')) return imgUrl;
      // Handle Strapi upload paths
      if (imgUrl.startsWith('/uploads/') || imgUrl.startsWith('/api/')) {
        return `https://led-backend-62tj.onrender.com${imgUrl}`;
      }
      if (imgUrl.startsWith('/')) {
        return `${baseDomain}${imgUrl}`;
      }
      return `${baseDomain}/${imgUrl}`;
    }) || [`${baseDomain}/logo-black.png`],
    "description": product.description?.replace(/\n/g, ' ').trim() || '',
    "sku": product.documentId || product.id || '',
    "category": categoryName,
    "brand": {
      "@type": "Brand",
      "name": "Led Tehnika"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseDomain}/productDetail/${slug}`,
      "priceCurrency": "BAM",
      "price": product.price?.toString() || '0',
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  } : null;

  // Breadcrumb structured data
  const breadcrumbSchema = product ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Početna",
        "item": baseDomain
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kategorije",
        "item": `${baseDomain}/kategorije`
      },
      ...(categoryName ? [{
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": `${baseDomain}/kategorije/${categorySlug}`
      }] : []),
      {
        "@type": "ListItem",
        "position": categoryName ? 4 : 3,
        "name": product.name,
        "item": `${baseDomain}/productDetail/${slug}`
      }
    ]
  } : null;

  return (
    <>
      {product && productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {product && breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ProductDetailPage product={product} />
    </>
  );
}
