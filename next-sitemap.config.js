import { getProductsForSitemap } from './getProductsForSitemap.js';
import { getCategoriesForSitemap } from './getCategoriesForSitemap.js';


export default {
  siteUrl: 'https://ledtehnika.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/cartPage", "/orderForm"],
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async () => {
    const products = await getProductsForSitemap();
    const categories = await getCategoriesForSitemap();

    const paths = [
      // Homepage with highest priority
      {
        loc: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      // Category pages
      ...categories.map(category => ({
        loc: `/kategorije/${category.slug}`,
        lastmod: category.updatedAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      })),
      // Product pages
      ...products.map(product => ({
        loc: `/kategorije/${product.categorySlug}/${product.slug}`,
        lastmod: product.updatedAt,
        changefreq: 'weekly',
        priority: 0.8,
      })),
    ];

    return paths;
  },
};
