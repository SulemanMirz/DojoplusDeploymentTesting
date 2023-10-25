/* eslint-disable class-methods-use-this */
import { FieldSet, Record } from 'airtable';
import { MartialArt } from '../src/shared/models/MartialArts.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.ALL_MARTIAL_ARTS);

class MartialArtsService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  async getAllMartialArts(fields?: string[]): Promise<MartialArt[]> {
    try {
      const martialArts: readonly Record<FieldSet>[] = await table
        .select({ fields: fields || ['Name'] })
        .all();
      const records: MartialArt[] = formattedResponse([...martialArts]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new MartialArtsService();
