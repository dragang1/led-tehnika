// Extract model number from product name (e.g., "NC-P023", "nc-p023", etc.)
function extractModelNumber(productName) {
  if (!productName) return null;
  
  // Patterns: NC-P023, nc-p023, NC P023, model: NC-P023, etc.
  const patterns = [
    /(?:model|model:|kod|code|artikl|art\.?)[\s:]*([A-Z]{1,3}[- ]?[A-Z0-9]{1,6})/i,
    /\b([A-Z]{1,3}[- ]?[P]?\d{2,4}[A-Z]?)\b/,
    /\(([A-Z]{1,3}[- ]?[A-Z0-9]{1,6})\)/,
  ];
  
  for (const pattern of patterns) {
    const match = productName.match(pattern);
    if (match && match[1]) {
      return match[1].replace(/\s+/g, '-').toUpperCase();
    }
  }
  
  return null;
}

export function generateProductSchema(product, categoryName, categorySlug, baseDomain) {
  const productName = product.name || '';
  const productDescription = product.description 
    ? product.description.replace(/\n/g, ' ').trim()
    : `${productName} - ${categoryName} na Led Tehnika`;
  
  const price = product.price || 0;
  const currency = 'BAM'; // Bosnian Convertible Mark
  
  // Extract model number from product name or use product.modelNumber if available
  const modelNumber = product.modelNumber || product.code || product.mpn || extractModelNumber(productName);
  
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

  // Handle multiple images
  const images = product.image && Array.isArray(product.image) 
    ? product.image.map(img => {
        let url = img.url || '';
        if (url && !url.startsWith('http')) {
          if (url.startsWith('/uploads/') || url.startsWith('/api/')) {
            url = `https://led-backend-62tj.onrender.com${url}`;
          } else if (url.startsWith('/')) {
            url = `${baseDomain}${url}`;
          } else {
            url = `${baseDomain}/${url}`;
          }
        }
        return url;
      }).filter(Boolean)
    : [imageUrl];

  const productUrl = `${baseDomain}/kategorije/${categorySlug}/${product.slug}`;
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": images.length > 1 ? images : imageUrl,
    "sku": product.slug || product.documentId || product.id,
    ...(modelNumber && { "mpn": modelNumber }),
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

// Generate FAQ Schema
export function generateFAQSchema(faqs, baseDomain) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return faqSchema;
}

// Generate Review/AggregateRating Schema
export function generateReviewSchema(reviews, aggregateRating) {
  if (!reviews || reviews.length === 0) return null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "aggregateRating": aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue || "5",
      "reviewCount": aggregateRating.reviewCount || reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author || "Kupac"
      },
      "datePublished": review.datePublished || new Date().toISOString(),
      "reviewBody": review.reviewBody || review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating || "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  // Remove aggregateRating if not provided
  if (!aggregateRating) {
    delete reviewSchema.aggregateRating;
  }

  return reviewSchema;
}
