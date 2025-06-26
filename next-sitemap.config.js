import { getProductsForSitemap } from './getProductsForSitemap.js';


export default {
  siteUrl: 'https://www.ledtehnika.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/orderForm'],
  additionalPaths: async () => {
    const products = await getProductsForSitemap();

    return products.map(product => ({
      loc: `/productDetail/${product.slug}`,
      lastmod: product.updatedAt,
    }));
  },
};
