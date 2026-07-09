import { getSitemapCategories } from './lib/cms/sitemapReader.js';

export async function getCategoriesForSitemap() {
  try {
    return await getSitemapCategories();
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}
