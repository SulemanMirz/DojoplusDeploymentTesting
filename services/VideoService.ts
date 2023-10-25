/* eslint-disable class-methods-use-this */
import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.VIDEO);

class VideoService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getVideo(username: string) {
    const records = await table
      .select({
        filterByFormula: `FIND("${username}", ARRAYJOIN({All Profiles}))`,
      })
      .all();
    return records;
  }
}

export default new VideoService();
