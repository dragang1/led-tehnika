const getProductsForSitemap = require('./getProductsForSitemap');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
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
