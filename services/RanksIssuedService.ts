/* eslint-disable class-methods-use-this */
import { getTableInstance, TABLES } from './Airtable';

const table = getTableInstance(TABLES.RANK);

class RanksIssuedService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getRanksIssued(username: string) {
    try {
      const records = await table
        .select({ filterByFormula: `{Username} = '${username}'` })
        .all();
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new RanksIssuedService();
