/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import { Booking } from '../src/shared/models/privateClass.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.PRIVATE_CLASSES_CLASSES);
const schoolsTable = getTableInstance(TABLES.SCHOOLS);
const bookingsTable = getTableInstance(TABLES.PRIVATE_CLASSES_BOOKINGS);
const allProfilesTable = getTableInstance(TABLES.PRIVATE_CLASSES_ALL_PROFILES);

class PrivateClassService {
  /**
   * @description - get private classes list against a specific user.
   * @param username - Username.
   * @returns - Return private classes list against a specific user.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getClasses(username: string) {
    try {
      const records = await table
        .select({
          filterByFormula: `{Username (from Instructor)} = '${username}'`,
        })
        .all();
      return records.map((record) =>
        _.mapKeys(record.fields, (v, k) => _.camelCase(k)),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getBookings(username: string) {
    try {
      const records = await bookingsTable
        .select({
          filterByFormula: `{Username (from Instructor Username)} = '${username}'`,
        })
        .all();
      return records.map((record) =>
        _.mapKeys(record.fields, (v, k) => _.camelCase(k)),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getDetailedClasses(username: string) {
    try {
      const records: any = await table
        .select({
          filterByFormula: `{Username (from Instructor)} = '${username}'`,
        })
        .all();

      const requests = [];
      let schools = [];
      let profiles = [];
      const query = records
        .map((record) => {
          if (record.fields['School Name (from School)'])
            return `{School Name} = '${record.fields['School Name (from School)'][0]}'`;
          return '';
        })
        .filter(Boolean);

      requests.push(
        schoolsTable
          .select({
            filterByFormula: `OR(${query.join(',')})`,
          })
          .all(),
      );

      requests.push(
        allProfilesTable
          .select({ filterByFormula: `{username} = '${username}'` })
          .all(),
      );

      await Promise.all(requests).then((res) => {
        schools = [...res[0]];

        profiles = [...res[1]];
      });

      return {
        classesList: formattedResponse(records),
        schoolsList: formattedResponse(schools),
        profile: formattedResponse(profiles)[0],
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createBooking(data: Booking) {
    try {
      const existingCustomer = await allProfilesTable
        .select({
          filterByFormula: `{Email} = '${data['Customer Email']}'`,
        })
        .all();
      const record = await bookingsTable.create({
        ...data,
        ...(existingCustomer.length > 0 &&
          existingCustomer[0].fields.Username && {
          'Customer Username': [existingCustomer[0].id],
        }),
      });
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async paymentConfirmation(id: string, stripeId: string, email: string) {
    try {
      const record = await bookingsTable.update([
        {
          id,
          fields: {
            'Payment Status': 'Paid',
            'Stripe Date': new Date().toDateString(),
            'Stripe ID': stripeId,
            'Customer Email': email,
          },
        },
      ]);
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new PrivateClassService();
