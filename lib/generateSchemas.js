export function generateProductSchema(product, categoryName, categorySlug, baseDomain) {
  const productName = product.name || '';
  const productDescription = product.description 
    ? product.description.replace(/\n/g, ' ').trim()
    : `${productName} - ${categoryName} na Led Tehnika`;
  
  const price = product.price || 0;
  const currency = 'BAM'; // Bosnian Convertible Mark
  
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

  const productUrl = `${baseDomain}/kategorije/${categorySlug}/${product.slug}`;
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": imageUrl,
    "sku": product.slug || product.documentId || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Led Tehnika"
    },
    "category": categoryName,
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": currency,
      "price": price.toFixed(2),
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Led Tehnika",
        "url": baseDomain
      }
    }
  };

  return productSchema;
}

export function generateBreadcrumbSchema(categoryName, categorySlug, productName, productSlug, baseDomain) {
  const breadcrumbSchema = {
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
        "name": categoryName,
        "item": `${baseDomain}/kategorije/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": productName,
        "item": `${baseDomain}/kategorije/${categorySlug}/${productSlug}`
      }
    ]
  };

  return breadcrumbSchema;
}

export function generateCategoryBreadcrumbSchema(categoryName, categorySlug, baseDomain) {
  const breadcrumbSchema = {
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
        "name": categoryName,
        "item": `${baseDomain}/kategorije/${categorySlug}`
      }
    ]
  };

  return breadcrumbSchema;
}
