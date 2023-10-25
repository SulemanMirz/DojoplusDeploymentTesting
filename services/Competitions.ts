/* eslint-disable class-methods-use-this */
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.COMPETITIONS);

class CompetitionsService {
  /**
   * @description - get all competitions.
   * @returns - Return all competitions.
   */

  async getAllCompetitions(): Promise<any> {
    try {
      const records: any = await table
        .select({
          // eslint-disable-next-line @typescript-eslint/quotes
          filterByFormula: `AND(DATETIME_FORMAT(SET_TIMEZONE({Start Date}, 'America/Los_Angeles'), 'YYYY-MM-DD') >= '${
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
              .toISOString()
              .split('T')[0]
          }',FIND("-", {Start Date}))`,
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCompetition(recordId): Promise<any> {
    try {
      const records: any = await table
        .select({
          filterByFormula: `{Record ID} = '${recordId}'`,
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new CompetitionsService();
