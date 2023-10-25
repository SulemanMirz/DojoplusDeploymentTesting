import moize from 'moize';
import { getTableInstance, TABLES } from './Airtable';

const table = getTableInstance(TABLES.SCHOOLS);

/**
 * @description - get schools.
 * @param filterByFormula - Column value.
 * @returns - Return schools slugs.
 */
async function getSchoolSlugsFull(filterByFormula = ''): Promise<
  {
    id: string;
    slug: string;
  }[]
> {
  const records = await table
    .select({
      fields: ['Slug'],
      filterByFormula,
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    slug: (record.fields.Slug || 'unknown') as string,
  }));
}

export const getSchoolSlugs = moize.promise(getSchoolSlugsFull);
