/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dojo.plus',
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://dojo.plus/sitemap.xml'],
  },
};
