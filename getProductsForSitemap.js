import fetch from 'node-fetch';

export async function getProductsForSitemap() {
  try {
    const res = await fetch('https://led-backend-62tj.onrender.com/api/proizvodi?populate=*');
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    const products = data.data || [];

    return products.map(product => {
      // Data is already flattened - no attributes wrapper
      const slug = product.slug || '';
      
      // Get category slug - generate from name since API doesn't provide slug
      const category = product.kategorije || {};
      const categoryName = category.name || '';
      const categorySlug = categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';
      
      const updatedAt = product.updatedAt || 
                       product.publishedAt || 
                       product.updated_at || product.created_at || 
                       new Date().toISOString();
      
      return {
        slug: slug,
        categorySlug: categorySlug,
        updatedAt: updatedAt,
      };
    }).filter(p => p.slug); // Only include products with valid slugs
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}
