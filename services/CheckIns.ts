/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import { FieldSet, Record } from 'airtable';
import dayjs from 'dayjs';
import _ from 'lodash';
import { CheckIns } from '../src/shared/models/CheckIns';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { TABLES, getTableInstance } from './Airtable';
import { getPastDuration } from './config';
import SchoolService from './SchoolService';
import { getTimeWithGMTOffset } from './utlis';

const table = getTableInstance(TABLES.SCHOOLS);
const allSchedules = getTableInstance(TABLES.ALL_SCHEDULES_CHECK_IN);
const allCheckIns = getTableInstance(TABLES.ALL_CHECK_INS);
const allProfilesCheckIns = getTableInstance(TABLES.ALL_PROFILES_CHECK_INS);

class CheckInsService {
  /**
   * @description - get schools.
   * @param value - Column value.
   * @returns - Return schools according to provided key value pair.
   */

  async getSchoolsListing(schoolName: string) {
    try {
      const records: any = await table
        .select({
          ...(schoolName && {
            filterByFormula: `SEARCH("${schoolName
              .toLocaleLowerCase()
              .trim()}", TRIM(LOWER({School Name})))`,
          }),
        })
        .firstPage();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCurrentSchoolClasses(
    schoolName: string,
    allWeek?: boolean | undefined,
  ) {
    try {
      const records: any = await allSchedules
        .select({
          filterByFormula: `{Slug Lookup} = '${schoolName}'`,
        })
        .all();
      const recs = await formattedResponse(records);
      const timezone = getTimeWithGMTOffset(recs?.[0]?.gmtOffsetFromSchoolLink);
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const dayOfWeek = days[dayjs(timezone).day()];

      const filteredRecs = allWeek
        ? recs
        : recs?.filter((el) => (el?.weekday ? el?.weekday === dayOfWeek : el));
      return {
        classData: filteredRecs?.sort((a, b) => a.timeStart - b.timeStart),
        zoneTime: timezone,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Backup
  // async getCurrentSchoolDataClasses(
  //   schoolName: string,
  //   allWeek?: boolean | undefined,
  // ) {
  //   try {
  //     const records: any = await allSchedules
  //       .select({
  //         filterByFormula: `{Slug Lookup} = '${schoolName}'`,
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

  //     const days = [
  //       'Sunday',
  //       'Monday',
  //       'Tuesday',
  //       'Wednesday',
  //       'Thursday',
  //       'Friday',
  //       'Saturday',
  //     ];

  //     const dayOfWeek = days[dayjs(timezone).day()];

  //     const filteredRecs = allWeek
  //       ? recs
  //       : recs?.filter((el) => (el?.weekday ? el?.weekday === dayOfWeek : el));
  //     return {
  //       classData: filteredRecs?.sort((a, b) => a.timeStart - b.timeStart),
  //       zoneTime: timezone,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  async getClassDetail(classId: string) {
    try {
      const records: any = await allSchedules
        .select({
          filterByFormula: `{Record ID} = '${classId}'`,
        })
        .all();
      const [record] = formattedResponse(records);
      const requests = [];
      let school = {};
      let checkedInUsers = [];

      requests.push(
        record.schoolLink
          ? await SchoolService.getSchoolByKeyName({ value: record.schoolLink })
          : undefined,
      );

      requests.push(
        allCheckIns
          .select({
            filterByFormula: `{Record Id (from Class Id)} = '${classId}'`,
            fields: [
              'Username (from Username)',
              'Created Time',
              'First Name (from Username)',
              'Nickname (from Username)',
              'Last Name (from Username)',
              'Full Name (from Username)',
              'Display Name (from Username)',
            ],
          })
          .all(),
      );

      await Promise.all(requests).then((res) => {
        school = { ...res[0] };
        checkedInUsers = [...res[1]];
      });

      const formattedCheckedInUsers = formattedResponse(checkedInUsers);

      const formattedGmtTime = getTimeWithGMTOffset(school?.[0]?.gmtOffset);

      const checkInsToday = formattedCheckedInUsers?.filter((val) => {
        const now = new Date(val?.createdTime);
        const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60000; // get UTC timestamp
        const localeTimestamp = utcTimestamp + school?.[0]?.gmtOffset * 36000; // add GMT offset in milliseconds
        const localeDate = new Date(localeTimestamp);
        return (
          new Date(new Date(localeDate).toLocaleString()).toDateString() ===
          new Date(formattedGmtTime).toDateString()
        );
      });

      return {
        ...record,
        school,
        timezone: formattedGmtTime,
        checkedInUsers: checkInsToday,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Backup

  // async getClassDetailGMT(classId: string) {
  //   try {
  //     const records: any = await allSchedules
  //       .select({
  //         filterByFormula: `{Record ID} = '${classId}'`,
  //       })
  //       .all();
  //     const [record] = formattedResponse(records);
  //     const requests = [];
  //     let school = {};
  //     let checkedInUsers = [];

  //     requests.push(
  //       record.schoolLink
  //         ? await SchoolService.getSchoolByKeyName({ value: record.schoolLink })
  //         : undefined,
  //     );

  //     requests.push(
  //       allCheckIns
  //         .select({
  //           filterByFormula: `{Record Id (from Class Id)} = '${classId}'`,
  //           fields: [
  //             'Username (from Username)',
  //             'Created Time',
  //             'First Name (from Username)',
  //             'Nickname (from Username)',
  //             'Last Name (from Username)',
  //             'Full Name (from Username)',
  //             'Display Name (from Username)',
  //           ],
  //         })
  //         .all(),
  //     );

  //     await Promise.all(requests).then((res) => {
  //       school = { ...res[0] };
  //       checkedInUsers = [...res[1]];
  //     });

  //     const formattedCheckedInUsers = formattedResponse(checkedInUsers);
  //     // console.log('SSSchool Data', school);

  //     const zoneTime = await TimeZone.getZoneTimeObj(
  //       school?.[0]?.city,
  //       school?.[0]?.country,
  //     );

  //     const checkInsToday = formattedCheckedInUsers?.filter((val) => {
  //       const now = new Date(val?.createdTime);
  //       const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60000; // get UTC timestamp
  //       const localeTimestamp = utcTimestamp + zoneTime?.gmt_offset * 3600000; // add GMT offset in milliseconds
  //       const localeDate = new Date(localeTimestamp);
  //       return (
  //         new Date(new Date(localeDate).toLocaleString()).toDateString() ===
  //         new Date(zoneTime?.datetime).toDateString()
  //       );
  //     });

  //     return {
  //       ...record,
  //       school,
  //       timezone: zoneTime?.datetime,
  //       checkedInUsers: checkInsToday,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  async createCheckIn(data: {
    username: string;
    classId: string;
    ipAddress: string;
  }) {
    try {
      const user = await allProfilesCheckIns
        .select({
          filterByFormula: `{Username} = '${data.username}'`,
          fields: ['Username'],
        })
        .all();
      const record = await allCheckIns.create({
        'Class ID': [data.classId],
        'IP Address': data.ipAddress,
        Username: [user[0].id],
      });
      return formattedResponse([record])[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCurrentSchool(username: string) {
    try {
      let checkIns: any = await allCheckIns
        .select({
          filterByFormula: `{Username (from Username)} = '${username}'`,
        })
        .all();

      if (checkIns.length < 1) {
        return { schoolName: null };
      }
      checkIns = formattedResponse(checkIns);
      checkIns = checkIns.sort(
        (a, b) => +new Date(b.createdTime) - +new Date(a.createdTime),
      );
      const schools: any = await table
        .select({
          filterByFormula: `{School Name} = '${checkIns[0].schoolLinkFromClassId[0]}'`,
        })
        .all();
      return {
        schoolName: null,
        ...formattedResponse(schools)[0],
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserCheckInsCount(username: string) {
    try {
      let checkIns: any = await allCheckIns
        .select({
          filterByFormula: `{Username (from Username)} = '${username}'`,
          fields: ['ID'],
        })
        .all();
      checkIns = formattedResponse(checkIns);
      return checkIns.length;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSchoolCheckIns(slug: string) {
    try {
      let checkIns: any = await allCheckIns
        .select({
          filterByFormula: `{Slug Lookup (from Class ID)} = '${slug}'`,
          fields: [
            'Username (from Username)',
            'Full Name (from Username)',
            'Created Time',
          ],
        })
        .all();
      checkIns = formattedResponse(checkIns);
      const grouped = _.map(
        _.groupBy(checkIns, 'usernameFromUsername'),
        (clist) =>
          clist.map(() => {
            return {
              username: clist?.[0]?.usernameFromUsername?.[0],
              displayName: clist?.[0]?.fullNameFromUsername?.[0],
              checkInsCount: clist.length,
              lastCheckIn: clist.reduce((a, b) => {
                return new Date(a.createdTime) > new Date(b.createdTime)
                  ? a
                  : b;
              }).createdTime,
            };
          }),
      )
        .map((final) => final?.[0])
        .sort((a, b) => +new Date(b.lastCheckIn) - +new Date(a.lastCheckIn))
        .sort((a, b) => b.checkInsCount - a.checkInsCount);
      return grouped;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserCheckIns(
    username: string,
    duration?: string,
    schoolSlug?: string,
  ) {
    try {
      let checkIns: any;
      const days = getPastDuration(duration);
      let query = `{Username (from Username)} = '${username}'`;
      if (days) {
        query = `AND(DATETIME_FORMAT(SET_TIMEZONE({Created Time}, 'America/Los_Angeles'), 'YYYY-MM-DD') >= '${
          new Date(new Date().setDate(new Date().getDate() - days))
            .toISOString()
            .split('T')[0]
        }',FIND("-", {Created Time}),{Username (from Username)} = '${username}')`;
      }
      if (!days && schoolSlug) {
        query = `AND({Slug Lookup (from Class ID)} = '${schoolSlug}' , {Username (from Username)} = '${username}')`;
      }
      checkIns = await allCheckIns
        .select({
          filterByFormula: query,
        })
        .all();
      checkIns = formattedResponse(checkIns);
      return checkIns;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateCheckIn(body) {
    try {
      const checkIns: readonly Record<FieldSet>[] = await allCheckIns.update([
        { ...body },
      ]);
      const formattedcheckIns: CheckIns[] = formattedResponse([...checkIns]);
      return formattedcheckIns?.[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new CheckInsService();
