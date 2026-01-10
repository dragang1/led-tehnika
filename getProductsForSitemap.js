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
      // Handle both Strapi v4 structure (with attributes) and flattened structure
      const productData = product.attributes || product;
      const slug = productData.slug || product.slug || '';
      const updatedAt = productData.updatedAt || product.updatedAt || 
                       productData.publishedAt || product.publishedAt || 
                       product.updated_at || product.created_at || 
                       new Date().toISOString();
      
      return {
        slug: slug,
        updatedAt: updatedAt,
      };
    }).filter(p => p.slug); // Only include products with valid slugs
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}
