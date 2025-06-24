const GlobalApi = require('./app/_utils/GlobalApi'); // prilagodi putanju

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ledtehnika.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/orderForm'],
  additionalPaths: async (config) => {
    const products = await GlobalApi.getAllProducts();

    return products.map(product => ({
      loc: `/productDetail/${product.slug}`, 
      lastmod: product.updatedAt,
    }));
  },
};
