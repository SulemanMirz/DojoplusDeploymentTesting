// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getSchoolSlugs } from '../../../services/SchoolMoizedService';

const createSitemapField = (suffix: string): any => ({
  loc: `https://dojo.plus/school${suffix}`, // Absolute url
  lastmod: new Date().toISOString(),
  // changefreq
  // priority
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const slugs = await getSchoolSlugs();

  // TODO: use node fs
  const suffixes = ['/info', '/location', '/schedules', '/plan', '/reviews'];

  const fields = slugs.flatMap(({ slug }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-template-expressions
    return suffixes.map((suffix) => createSitemapField(`/${slug}${suffix}`));
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {};
