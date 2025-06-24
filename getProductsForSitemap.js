
const fetch = require('node-fetch'); 

async function getProductsForSitemap() {
  try {
    
    const res = await fetch('https://led-backend-62tj.onrender.com/api/proizvodi'); 
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    const data = await res.json();

    
    return data.products.map(product => ({
      slug: product.slug,
      updatedAt: product.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}

module.exports = getProductsForSitemap;
