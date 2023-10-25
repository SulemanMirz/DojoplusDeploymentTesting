/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import CheckIns from './CheckIns';

import PeopleService from './PeopleService';

class SearchService {
  /**
   * @description - get schools.
   * @param value - Column value.
   * @returns - Return schools according to provided key value pair.
   */

  async getHomeSearch(searchText) {
    try {
      const req = [];
      let users = [];
      let schools = [];
      req.push(PeopleService.getUserBySearch(searchText));
      req.push(CheckIns.getSchoolsListing(searchText));

      await Promise.all(req).then((res) => {
        users = [...res[0]];
        schools = [...res[1]];
      });

      const mergeResponse = [...users, ...schools];
      return mergeResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new SearchService();
