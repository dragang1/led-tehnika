import fetch from 'node-fetch';

export async function getProductsForSitemap() {
  try {
    const res = await fetch('https://led-backend-62tj.onrender.com/api/proizvodi?populate=*');
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    const products = data.data || [];

    return products.map(product => ({
      slug: product.slug || '',
      updatedAt: product.attributes?.updatedAt || new Date().toISOString(),
    }));
  } catch (error) {
    
    return [];
  }
}
