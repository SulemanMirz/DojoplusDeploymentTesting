/* eslint-disable class-methods-use-this */
import { SeminarData } from '../src/shared/models/Seminar.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.SEMINARS);
const schoolsTable = getTableInstance(TABLES.SEMINARS_SCHOOLS);
const ticketsTable = getTableInstance(TABLES.SEMINARS_TICKETS);

class SeminarClassService {
  /**
   * @description - get seminar against a specific user.
   * @returns - Return seminar against a specific user.
   */

  async getSeminars(username): Promise<{ seminars: SeminarData[] }> {
    try {
      const records: any = await table
        .select({
          filterByFormula: `FIND("${username}", ARRAYJOIN({Username}))`,
        })
        .all();
      return {
        seminars: formattedResponse(records),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSeminar(title): Promise<{ seminars: SeminarData }> {
    try {
      const records: any = await table
        .select({
          filterByFormula: `{Event Title} = '${title}'`,
        })
        .all();
      if (records.length === 0) return null;

      const requests = [];
      let schools = [];

      if (records[0].fields['School Name (from School)']) {
        requests.push(
          schoolsTable
            .select({
              filterByFormula: `{School Name} = '${records[0].fields['School Name (from School)'][0]}'`,
            })
            .all(),
        );
        await Promise.all(requests).then((res) => {
          schools = formattedResponse([...res[0]]);
        });
      }
      const formatResponse = formattedResponse(records);
      return formatResponse.length > 0
        ? { ...formatResponse[0], school: schools[0] }
        : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createTicket(data): Promise<any> {
    try {
      // Using an axios here because currently this table is not accepting data with airtable pkg
      const record = await ticketsTable.create({
        ...data,
      });
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllSeminars(): Promise<any> {
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

  async getSeminarById(recordId): Promise<any> {
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

export default new SeminarClassService();
