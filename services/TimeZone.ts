/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { TIMEZONE_API_KEY } from './AbstractAPI';

class TimezoneService {
  /**
   * @description - Get Timezone of a school.
   * @param address - Address of school.
   * @returns - Return TimeZone.
   */

  async getZoneTime(city?: string, country?: string) {
    try {
      const record: any = await axios.get(
        `https://timezone.abstractapi.com/v1/current_time/?api_key=${TIMEZONE_API_KEY}&location=${city}${
          country ? `, ${country}` : ''
        }`,
      );
      if (record.data.datetime) {
        return record.data.datetime;
      }
      return '';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getZoneTimeObj(city?: string, country?: string) {
    try {
      const record: any = await axios.get(
        `https://timezone.abstractapi.com/v1/current_time/?api_key=${TIMEZONE_API_KEY}&location=${city}${
          country ? `, ${country}` : ''
        }`,
      );

      if (record.data.datetime) {
        return record.data;
      }
      return '';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new TimezoneService();
