/* eslint-disable class-methods-use-this */
import { FieldSet, Record, Records } from 'airtable';
import { Achievement } from '../src/shared/models/achievement.model';
import { Tournament } from '../src/shared/models/Tournaments.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.ACHIEVEMENT);
const profileTable = getTableInstance(TABLES.All_PROFILES_ACHIEVEMENTS);
const tournamentsFromAchievement = getTableInstance(
  TABLES.TOURNAMENTS_ACHIEVEMENT,
);

class AchievementService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  async getAchievement(username: string): Promise<Achievement[]> {
    try {
      const achievements: readonly Record<FieldSet>[] = await table
        .select({ filterByFormula: `{Display Name} = '${username}'` })
        .all();
      const records: Achievement[] = formattedResponse([...achievements]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTournaments(
    martialArt?: string,
    searchQuery?: string,
  ): Promise<Tournament[]> {
    try {
      let query = '';
      if (martialArt) {
        query = `FIND(", ${martialArt}, ", ", " & ARRAYJOIN({Martial Arts (link)}) & ", ")`;
      }
      if (searchQuery) {
        query = `SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Event Name})))`;
      }
      if (searchQuery && martialArt) {
        query = `AND(SEARCH("${searchQuery
          .toLocaleLowerCase()
          .trim()}", TRIM(LOWER({Event Name}))), FIND(", ${martialArt}, ", ", " & ARRAYJOIN({Martial Arts (link)}) & ", ") )`;
      }
      const achievements: readonly Record<FieldSet>[] =
        await tournamentsFromAchievement
          .select({
            filterByFormula: query,
            fields: ['Event Name', 'Martial Arts (from Martial Arts)', 'Date'],
          })
          .firstPage();
      const records: Tournament[] = formattedResponse([...achievements]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addAchievement(body): Promise<Achievement> {
    try {
      const achievement: Records<FieldSet> = await table.create({
        ...body,
      });
      const records: Achievement = formattedResponse([...[achievement]]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProfileFromAchievement(id): Promise<any> {
    try {
      const profile: readonly Record<FieldSet>[] = await profileTable
        .select({
          filterByFormula: `{Record ID} = '${id}'`,
        })
        .all();
      const records: any = formattedResponse([...profile])?.[0];
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new AchievementService();
