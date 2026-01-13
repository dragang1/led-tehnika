import fetch from 'node-fetch';

export async function getCategoriesForSitemap() {
  try {
    const res = await fetch('https://led-backend-62tj.onrender.com/api/kategorije?populate=*');
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();
    const categories = data.data || [];

    return categories.map(category => {
      // Data is already flattened - no attributes wrapper
      const name = category.name || '';
      const slug = name ? name.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';
      
      const updatedAt = category.updatedAt || 
                       category.publishedAt || 
                       category.updated_at || 
                       category.created_at || 
                       new Date().toISOString();
      
      return {
        slug: slug,
        name: name,
        updatedAt: updatedAt,
      };
    }).filter(c => c.slug && c.name); // Only include categories with valid slugs
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}
