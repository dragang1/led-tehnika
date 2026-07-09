import { getSitemapProducts } from './lib/cms/sitemapReader.js';

export async function getProductsForSitemap() {
  try {
    return await getSitemapProducts();
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}
