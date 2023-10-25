/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { TABLES, getTableInstance } from './Airtable';
import { getTimeWithGMTOffset } from './utlis';

const table = getTableInstance(TABLES.TIMETABLE);
const schoolSlug = getTableInstance(TABLES.SCHOOLS);
const schoolsTable = getTableInstance(TABLES.SCHOOLS);
const plansTable = getTableInstance(TABLES.PLANS);
const categoriesTable = getTableInstance(TABLES.PLANS_CATEGORIES);
const timetableMartialArts = getTableInstance(TABLES.MARTIAL_ART_TIMETABLE);
const instructorTimeTable = getTableInstance(TABLES.INSTRUCTOR_TIMETABLE_DATA);

class TimetableService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  async getTimetable(schoolName: string) {
    try {
      const requests = [];
      let schoolRecord = [];
      let timetableRecords = [];

      requests.push(
        schoolsTable
          .select({
            filterByFormula: `{Slug} = '${schoolName}'`,
          })
          .all(),
      );
      requests.push(
        table
          .select({
            filterByFormula: `{Slug Lookup} = '${schoolName}'`,
          })
          .all(),
      );
      await Promise.all(requests).then((res) => {
        schoolRecord = [...res[0]];
        timetableRecords = [...res[1]];
      });
      const plans =
        schoolRecord[0] &&
        (await plansTable
          .select({
            filterByFormula: `FIND("${schoolRecord[0].fields['School Name']}", ARRAYJOIN({School Name (from School)}))`,
          })
          .all());

      const categoriesRequests = [];

      plans.forEach((plan) => {
        categoriesRequests.push(
          plan.fields.Category && plan.fields.Category[0]
            ? categoriesTable
              .select({
                filterByFormula: `{Record ID} = '${plan.fields.Category[0]}'`,
              })
              .all()
            : new Promise((res) => res([])),
        );
      });

      await Promise.all(categoriesRequests).then((res) => {
        res.forEach((channel, index) => {
          if (channel && channel.length > 0) {
            plans[index].fields = {
              ...plans[index].fields,
              Category: _.mapKeys(channel[0].fields, (v, k) =>
                _.camelCase(k),
              ) as any[],
            };
          }
        });
      });

      const categories = plans.map((plan) => plan.fields.Category || []).flat();

      const uniqueObjArray = [
        // eslint-disable-next-line @typescript-eslint/dot-notation
        ...new Map(categories.map((item) => [item['recordId'], item])).values(),
      ];

      return {
        ...schoolRecord[0],
        scheduleSchool: timetableRecords,
        plans: plans || [],
        plansCategories: uniqueObjArray,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTimeTableWithZone(schoolsSlug: string) {
    try {
      const records: any = await table
        .select({
          filterByFormula: `{Slug Lookup} = '${schoolsSlug}'`,
        })
        .all();
      const recs = await formattedResponse(records);
      const timezone = getTimeWithGMTOffset(
        recs?.[0]?.gmtOffsetFromSchoolLink?.[0],
      );
      return {
        scheduleSchool: recs?.sort((a, b) => a.timeStart - b.timeStart),
        zoneTime: timezone,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Backup

  // async getTimeTableWithZone(schoolsSlug: string) {
  //   try {
  //     const records: any = await table
  //       .select({
  //         filterByFormula: `{Slug Lookup} = '${schoolsSlug}'`,
  //       })
  //       .all();
  //     const recs = await formattedResponse(records);
  //     const timezone =
  //       recs?.[0]?.cityFromSchoolLink || recs?.[0]?.countryFromSchoolLink
  //         ? await TimeZone.getZoneTime(
  //           recs?.[0]?.cityFromSchoolLink,
  //           recs?.[0]?.countryFromSchoolLink?.[0],
  //         )
  //         : new Date().toLocaleString();

  //     return {
  //       scheduleSchool: recs?.sort((a, b) => a.timeStart - b.timeStart),
  //       zoneTime: timezone,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  async getMatialArts() {
    try {
      const queryResult = await timetableMartialArts
        .select({
          fields: ['Name'],
        })
        .all();
      const record = formattedResponse([...queryResult]);
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addTimeTable(body) {
    try {
      const response = await table.create(
        body?.map((da) => ({ fields: { ...da } })),
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMastersBySearchTimeTable(searchQuery: string) {
    try {
      let query =
        'FIND(", Instructor, ", ", " & ARRAYJOIN({Account Type}) & ", ")';
      if (searchQuery) {
        query = `AND(OR(SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Username}))), SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Display Name}))), SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Email}))) ), FIND(", Instructor, ", ", " & ARRAYJOIN({Account Type}) & ", ") )`;
      }
      const records: any = await instructorTimeTable
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

  async updateTimeTable(body) {
    try {
      const updateRecord = await table.update([{ ...body }]);
      const records = formattedResponse([...updateRecord]);
      return records?.[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteTimeTable(id) {
    try {
      const deleteRecord = await table.destroy(id);
      return deleteRecord;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolsSlug(slug) {
    try {
      const records = await schoolSlug
        .select({
          filterByFormula: `{Slug} = '${slug}'`,
        })
        .all();
      return formattedResponse([...records]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new TimetableService();
