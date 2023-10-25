/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import { FieldSet, Record } from 'airtable';
import _ from 'lodash';
import { User } from '../src/shared/models/user.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { distance } from '../src/shared/utils/ultils';
import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.SCHOOL);
const tableReviews = getTableInstance(TABLES.SCHOOL_REVIEWS);
const tableProfiles = getTableInstance(TABLES.PROFILES_SCHOOL);

const schoolParams = ['country', 'state', 'city', 'neighbourhood'];

class SchoolsService {
  /**
   * @description - get schools.
   * @param value - Column value.
   * @returns - Return schools according to provided key value pair.
   */

  async getAccessibleSchools(value: string) {
    try {
      const requests = [];
      let records = [];
      requests.push(
        table
          .select({
            filterByFormula: `{Display Name (from Admin)} = '${value}'`,
          })
          .all(),
      );
      requests.push(
        table
          .select({
            filterByFormula: `{Display Name (from Manager)} = '${value}'`,
          })
          .all(),
      );
      await Promise.all(requests).then((res) => {
        records = [
          ...res[0],
          ...res[1].filter((school) =>
            res[0].length > 0
              ? !res[0].find((rec) => rec.id === school.id)
              : true,
          ),
        ];
      });

      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolsListing(params: any) {
    try {
      const query = Object.keys(params)
        .map((param) => {
          if (param === 'martialArts') {
            return `FIND("${params[param]}", ARRAYJOIN({Martial Arts Lookup}))`;
          }
          if (schoolParams.indexOf(param) !== -1) {
            return `{${_.capitalize(param)}} = '${params[param]}'`;
          }
          return null;
        })
        .filter(Boolean);
      const records: any = await table
        .select({
          filterByFormula: `AND(${query.join(',')})`,
          fields: ['School Name', 'Slug'],
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolByKeyName({
    value,
    key = 'School Name',
  }: {
    value: string;
    key?: string;
  }) {
    try {
      const records: any = await table
        .select({ filterByFormula: `{${key}} = '${value}'` })
        .all();
      return formattedResponse([records[0]]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolsByKeyNames(schools: string[]) {
    try {
      const query = schools.map((school) => {
        return `{School Name} = '${school}'`;
      });
      const records: any = await table
        .select({
          filterByFormula: `OR(${query.join(',')})`,
          fields: ['School Name', 'School Logo'],
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getNearestSchools(lat, long) {
    try {
      let records: any = await table
        .select({
          filterByFormula: '{long} != BLANK()',
          fields: ['long', 'lat', 'Record ID'],
        })
        .all();
      records = formattedResponse(records);
      const distanceArr = records
        .map((el) => {
          const dist = distance(lat, el.lat, long, el.long);
          return { id: el.recordId, dist };
        })
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 100);

      const query = distanceArr.map((school) => {
        return `{Record ID} = '${school.id}'`;
      });

      const nearestSchools: any = await table
        .select({
          filterByFormula: `OR(${query.join(',')})`,
        })
        .all();
      return formattedResponse(nearestSchools);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolsReviews(slug) {
    try {
      const records: readonly Record<FieldSet>[] = await tableReviews
        .select({
          filterByFormula: `{Slug (From School)} = '${slug}'`,
        })
        .all();
      return formattedResponse([...records]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createSchoolsReviews(username, body) {
    try {
      const profile: readonly Record<FieldSet>[] = await tableProfiles
        .select({
          filterByFormula: `{Display Name} = '${username}'`,
        })
        .all();
      const user: User = formattedResponse([...profile])?.[0];
      console.log(user);
      const records: readonly Record<FieldSet>[] = await tableReviews.create({
        ...body,
        User: [user?.id],
      });
      return formattedResponse([records]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateSchoolLogo(data) {
    try {
      const records: readonly Record<FieldSet>[] = await table.update([
        { ...data },
      ]);
      return formattedResponse([...records]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getInstructorBySearch(searchQuery: string) {
    try {
      // let query =
      //   'FIND(", , ", ", " & ARRAYJOIN({Account Type}) & ", ")';
      // if (searchQuery) {
      const query = `OR(SEARCH("${searchQuery
        .toLocaleLowerCase()
        .trim()}", TRIM(LOWER({Display Name}))), SEARCH("${searchQuery
        .toLocaleLowerCase()
        .trim()}", TRIM(LOWER({Display Name 2}))), SEARCH("${searchQuery
        .toLocaleLowerCase()
        .trim()}", TRIM(LOWER({Email}))) ) `;
      // .trim()}", TRIM(LOWER({Email}))) ), FIND(", Instructor, ", ", " & ARRAYJOIN({Account Type}) & ", ") )`;
      // }
      const records: any = await tableProfiles
        .select({
          filterByFormula: query,
        })
        .firstPage();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new SchoolsService();
