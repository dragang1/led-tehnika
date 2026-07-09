import { getProductsForSitemap } from './getProductsForSitemap.js';
import { getCategoriesForSitemap } from './getCategoriesForSitemap.js';


export default {
  // Must match canonical domain (no www) - used for all sitemap URLs
  siteUrl: 'https://ledtehnika.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/cartPage", "/orderForm", "/productDetail/*", "/keystatic/*"],
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async () => {
    const products = await getProductsForSitemap();
    const categories = await getCategoriesForSitemap();

    // Blog posts
    const blogPosts = [
      'kako-odabrati-motor-za-kapiju',
      'vodic-za-led-rasvjetu-u-vrtu',
      'instalacija-bazenske-rasvjete',
      'prednosti-led-rasvjete',
    ];

    const paths = [
      // Homepage with highest priority
      {
        loc: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      // Blog main page
      {
        loc: '/blog',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      },
      // Motori za kapiju landing page
      {
        loc: '/motori-za-kapiju',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      },
      // Blog posts
      ...blogPosts.map(slug => ({
        loc: `/blog/${slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      })),
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
