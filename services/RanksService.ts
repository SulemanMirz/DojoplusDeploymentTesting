/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import { getTableInstance, TABLES } from './Airtable';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import PostmarkService from './PostmarkService';
import PeopleService from './PeopleService';
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_BELT_URL,
} from '../src/shared/utils/ultils';
import { orderRanks } from '../src/shared/utils/ranks-utils';

const table = getTableInstance(TABLES.RANK);
const peopleTable = getTableInstance(TABLES.PEOPLE);
const schoolTable = getTableInstance(TABLES.SCHOOL);
const martialArtTable = getTableInstance(TABLES.MARTIAL_ART);
const martialArtsRanks = getTableInstance(TABLES.MARTIAL_ARTS_RANKS);
const martialArtsSchools = getTableInstance(TABLES.MARTIAL_ARTS_SCHOOLS);
const allProfilesRanks = getTableInstance(TABLES.ALL_PROFILE_RANKS);
const allSchoolsRanks = getTableInstance(TABLES.ALL_SCHOOLS_RANKS);

class RanksService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getRanks(username: string) {
    try {
      const records = await table
        .select({ filterByFormula: `{Username} = '${username}'` })
        .all();
      const requests = [];
      let peoples = [];
      let schools = [];
      let martialArts = [];

      const masterQuery = records
        .map((record) => {
          if (record.fields['Master (from All Profiles)'])
            return `{Username} = '${record.fields['Master (from All Profiles)'][0]}'`;
          return '';
        })
        .filter(Boolean);

      requests.push(
        peopleTable
          .select({
            filterByFormula: `OR(${masterQuery.join(',')})`,
          })
          .all(),
      );

      const schoolQuery = records
        .map((record) => {
          if (record.fields['School Name (from All Schools)'])
            return `{School Name} = '${record.fields['School Name (from All Schools)'][0]}'`;
          return '';
        })
        .filter(Boolean);
      requests.push(
        schoolQuery.length > 0
          ? schoolTable
            .select({
              filterByFormula: `OR(${schoolQuery.join(',')})`,
            })
            .all()
          : new Promise((res, rej) => res([])),
      );

      const martialArtQuery = records
        .map((record) => {
          if (record.fields['Level (from Martial Arts Ranks)'])
            return `{Level} = '${record.fields['Level (from Martial Arts Ranks)'][0]}'`;
          return '';
        })
        .filter(Boolean);
      requests.push(
        martialArtQuery.length > 0
          ? martialArtTable
            .select({
              filterByFormula: `OR(${martialArtQuery.join(',')})`,
            })
            .all()
          : new Promise((res, rej) => res([])),
      );
      await Promise.all(requests).then((res) => {
        peoples = [...res[0]];
        schools = [...res[1]];
        martialArts = [...res[2]];
      });
      if (!records || records.length === 0) {
        return [];
      }
      const response = [];
      records.map((record) => {
        const people = record.fields['Master (from All Profiles)']
          ? peoples.find((p) => {
            return (
              p.fields.Username ===
                record.fields['Master (from All Profiles)'][0]
            );
          })
          : undefined;
        const school = record.fields['School Name (from All Schools)']
          ? schools.find((p) => {
            return (
              p.fields['School Name'] ===
                record.fields['School Name (from All Schools)'][0]
            );
          })
          : undefined;
        const martialArt = record.fields['Level (from Martial Arts Ranks)']
          ? martialArts.find((p) => {
            return (
              p.fields.Level ===
                record.fields['Level (from Martial Arts Ranks)'][0]
            );
          })
          : undefined;
        const data = {
          master: people
            ? _.mapKeys(people.fields, (v, k) => _.camelCase(k))
            : undefined,
          school: school
            ? _.mapKeys(school.fields, (v, k) => _.camelCase(k))
            : undefined,
          martialArt: martialArt
            ? _.mapKeys(martialArt.fields, (v, k) => _.camelCase(k))
            : undefined,
        };
        response.push({
          ...record,
          fields: { ...record.fields, ...data },
        });
        return '';
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getRank(username: string): Promise<any> {
    try {
      const records = await table
        .select({ filterByFormula: `{Username} = '${username}'` })
        .all();

      if (!records || records.length === 0) {
        return [];
      }

      const martialArtQuery = records
        .map((record) => {
          if (record.fields['Level (from Martial Arts Ranks)'])
            return `{Level} = '${record.fields['Level (from Martial Arts Ranks)'][0]}'`;
          return '';
        })
        .filter(Boolean);

      const martialArts = await martialArtTable
        .select({
          filterByFormula: `OR(${martialArtQuery.join(',')})`,
        })
        .all();

      const response = [];
      records.map((record) => {
        const martialArt = record.fields['Level (from Martial Arts Ranks)']
          ? martialArts.find((p) => {
            return (
              p.fields.Level ===
                record.fields['Level (from Martial Arts Ranks)'][0]
            );
          })
          : undefined;
        const data = martialArt
          ? _.mapKeys(martialArt.fields, (v, k) => _.camelCase(k))
          : undefined;

        response.push({
          ..._.mapKeys(record.fields, (v, k) => _.camelCase(k)),
          ...data,
        });
        return '';
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadImageURL(id: string, fieldName: string, urls: any): Promise<any> {
    try {
      if (fieldName === 'certificate') {
        const record = table.update([
          {
            id,
            fields: {
              Certificate: urls,
            },
          },
        ]);
        return await record;
      }
      const record = table.update([
        {
          id,
          fields: {
            Photos: urls,
          },
        },
      ]);
      return await record;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async uploadCertificate(id?: any, url?: string): Promise<any> {
    try {
      const record: any = await table.update([
        {
          id,
          fields: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            'Certificate Photo': [{ url }],
          },
        },
      ]);
      return formattedResponse(record)?.[0];
    } catch (error) {
      console.log('eeeeror', error);
      return [];
    }
  }

  async getMartialsArts(): Promise<any> {
    try {
      const records: any = await martialArtsRanks
        .select({
          filterByFormula: '{Rank Image Big} != ""',
          fields: ['Level', 'Martial Art', 'Order'],
        })
        .all();
      const formattedRecords = formattedResponse(records);
      const key = 'martialArt';
      const fillterRecords = [
        ...new Map(formattedRecords.map((item) => [item[key], item])).values(),
      ];
      return fillterRecords;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getSchoolsListingWRTMartialArts(
    schoolName: string,
    martialArts: string,
  ): Promise<any> {
    try {
      let query = `FIND(", ${martialArts}, ", ", " & ARRAYJOIN({Martial Arts}) & ", ")`;
      if (schoolName) {
        query = `AND(SEARCH("${schoolName
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({School Name}))))`;
      }
      const records: any = await schoolTable
        .select({
          filterByFormula: query,
        })
        .firstPage();
      return formattedResponse(records);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getBeltsByMartialsArts(martialArt): Promise<any> {
    try {
      const records: any = await martialArtsRanks
        .select({ filterByFormula: `{Martial Art} = '${martialArt}'` })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getInfoByUserNameByMartialsArtsByBelts(
    username,
    martialArt,
    ranks,
  ): Promise<any> {
    try {
      const records: any = await table
        .select({
          filterByFormula: `AND( {Username (from All Profiles)} = '${username}', {Martial Art (from Martial Arts Ranks)} = '${martialArt}', {Level (from Martial Arts Ranks)} = '${ranks}')`,
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getSchoolsByMartialsArts(martialArt): Promise<any> {
    try {
      const records: any = await martialArtsSchools
        .select({
          filterByFormula: `{Name} = '${martialArt}'`,
          fields: ['School Name (from Schools)'],
        })
        .all();
      const schoolsList = formattedResponse(records)[0].schoolNameFromSchools;
      return schoolsList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getMastersBySchool(schoolName): Promise<any> {
    try {
      const records: any = await allProfilesRanks
        .select({
          filterByFormula: `AND({Schools} = '${schoolName}',FIND("Instructor", ARRAYJOIN({Account Type})))`,
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getMastersBySearch(searchQuery: string): Promise<any> {
    try {
      let query =
        'FIND(", Instructor, ", ", " & ARRAYJOIN({Account Type}) & ", ")';
      if (searchQuery) {
        query = `AND(SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Display Name}))), FIND(", Instructor, ", ", " & ARRAYJOIN({Account Type}) & ", ") )`;
      }
      const records: any = await peopleTable
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

  async getUserFromAllProfilesRanks(username: string): Promise<any> {
    try {
      const records: any = await allProfilesRanks
        .select({
          filterByFormula: `{Username} = '${username}'`,
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getFeatureRanks(username: string): Promise<any> {
    try {
      const records: any = await table
        .select({ filterByFormula: `{Username} = '${username}'` })
        .all();

      const formattedResponseData = formattedResponse(records);
      const recentMartialArtData = formattedResponseData?.[0]
        ? orderRanks(formattedResponseData)[0]
        : '';
      return recentMartialArtData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getSchoolFromAllSchoolsRanks(slug: string): Promise<any> {
    try {
      const records: any = await allSchoolsRanks
        .select({
          filterByFormula: `{Slug} = '${slug}'`,
        })
        .all();
      return formattedResponse(records);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addNewRank(data): Promise<any> {
    try {
      let records: any = await table.create({
        ...data.rankData,
      });
      [records] = formattedResponse([records]);
      await PostmarkService.sendRankConfirmationEmail(
        { ...data?.templateModel, recordId: records?.recordId },
        data?.masterEmail,
      );
      return records;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getRankById(id: string): Promise<any> {
    try {
      const record = await table.select({
        filterByFormula: `{Record ID} = '${id}'`,
      });
      return formattedResponse([record])[0];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async verifyRank(id: string, verified: boolean, baseUrl: any): Promise<any> {
    try {
      let record: any = await table.update([
        {
          id,
          fields: {
            Verified: verified,
          },
        },
      ]);
      record = formattedResponse(record);
      let getVerifiedUser: any = await PeopleService.getUser(
        record?.[0]?.usernameFromAllProfiles?.[0],
      );
      getVerifiedUser = formattedResponse(getVerifiedUser);
      const userImage = getVerifiedUser[0]?.photo?.url || DEFAULT_AVATAR_URL;
      const userBelt =
        record?.[0]?.rankImageW64H8FromMartialArtsRanks?.[0]?.url ||
        DEFAULT_BELT_URL;
      const templateModel = {
        studentImage: userImage,
        beltImage: userBelt,
        studentName: getVerifiedUser[0]?.displayName,
        studentEmail: getVerifiedUser[0]?.email,
        studentPhone: getVerifiedUser[0]?.phone || '',
        certificateTitle:
          record?.[0]?.martialArtFromMartialArtsRanks?.[0] || '',
        beltInfo: record?.[0]?.levelFromMartialArtsRanks?.[0] || '',
        schoolName: record?.[0]?.schoolNameFromAllSchools?.[0] || '',
        certificateDate: record?.[0]?.graduated,
        baseUrl,
        username: record?.[0]?.usernameFromAllProfiles?.[0],
      };
      await PostmarkService.sendRankConfirmedEmail(
        templateModel,
        getVerifiedUser[0]?.email,
      );
      return record;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteRank(id: string): Promise<any> {
    try {
      const record: any = table.destroy(id);
      return record;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default new RanksService();
