import { getProductsForSitemap } from './getProductsForSitemap.js';


export default {
  siteUrl: 'https://ledtehnika.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/cartPage", "/orderForm"],
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async () => {
    const products = await getProductsForSitemap();

    return products.map(product => ({
      loc: `/productDetail/${product.slug}`,
      lastmod: product.updatedAt,
      changefreq: 'weekly',
      priority: 0.8,
    }));
  },
};
