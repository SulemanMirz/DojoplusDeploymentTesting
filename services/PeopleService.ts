/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { TABLES, getTableInstance } from './Airtable';
import RanksService from './RanksService';

const table = getTableInstance(TABLES.PEOPLE);

class PeopleService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  async getUser(username: string) {
    try {
      const records = await table
        .select({ filterByFormula: `{username} = '${username}'` })
        .all();
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserByKeyName({ value, key }: { value: string; key: string }) {
    try {
      let query = `TRIM(LOWER({${key}})) = '${value}'`;
      if (key === 'Username') {
        query = `TRIM(LOWER({Username})) = '${value}'`;
      }
      const records: any = await table.select({ filterByFormula: query }).all();
      return formattedResponse(records)[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(data) {
    try {
      const records = await table.create({
        ...data,
      });

      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(data: any) {
    try {
      const record = await table.update([
        {
          ...data,
        },
      ]);
      return formattedResponse([...record])?.[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getallProfilesByEmail(emails: string[]) {
    try {
      const requests = [];
      let peoples = [];

      const query = emails
        .map((email) => {
          return `{Email} = '${email}'`;
        })
        .filter(Boolean);

      requests.push(
        table
          .select({
            filterByFormula: `OR(${query.join(',')})`,
          })
          .all(),
      );

      await Promise.all(requests).then((res) => {
        peoples = [...res[0]];
      });
      const formattedRecords = formattedResponse(peoples);
      return formattedRecords;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUsersDetail(users: string[], usersFields?: string[]) {
    try {
      const peopleQuery = users
        .map((record) => {
          return `{Username} = '${record}'`;
        })
        .filter(Boolean);

      let records: any = await table
        .select({
          filterByFormula: `OR(${peopleQuery.join(',')})`,
          ...(usersFields && { fields: [...usersFields] }),
        })
        .all();

      records = formattedResponse(records);
      const requests = [];
      const detailedUsers = [];
      for (let c1 = 0; c1 < records.length; c1 += 1) {
        requests.push(
          RanksService.getRank(records[c1].username).then((res) => {
            detailedUsers.push({
              ...records[c1],
              ranks: res,
            });
          }),
        );
      }
      await Promise.all(requests);
      return detailedUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserBySearch(searchQuery: string): Promise<any> {
    try {
      let query =
        'AND( {Email} != "", {Username} != "", {Firebase ID} != "", {Firebase ID} != "User id to link user to firebase", {First Name} != "", {Last Name} != "" )';
      if (searchQuery) {
        query = `AND(OR(SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Username}))), SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Display Name}))), SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Email}))) ), {Email} != "", {Username} != "", {Firebase ID} != "", {Firebase ID} != "User id to link user to firebase", {First Name} != "", {Last Name} != "" )`;
      }
      const records: any = await table
        .select({
          filterByFormula: query,
        })
        .firstPage();
      return formattedResponse(records);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default new PeopleService();
