/* eslint-disable class-methods-use-this */
import { FieldSet, Record } from 'airtable';
import { Post, PostType } from '../src/shared/models/post.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { TABLES, getTableInstance } from './Airtable';
import { cache } from './cache';

const table = getTableInstance(TABLES.POSTS);
const ranksTable = getTableInstance(TABLES.RANK);

class PostsServices {
  /**
   * @description - get all competitions.
   * @returns - Return all competitions.
   */

  async getPosts(pageNo = 1): Promise<{ posts: Post[]; length: number }> {
    try {
      let records = [];
      const limit = 10;

      const processRecords = (): { posts: Post[]; length: number } => {
        const count = records.length;
        const page = pageNo || 1;
        const offset = page * limit - limit;
        records = formattedResponse(records);
        const posts = records
          .map((record) => {
            return {
              ...record,
              action:
                (record.postType === PostType.CHECK_IN && 'attended') ||
                (record.postType === PostType.ACHIEVEMENT && 'earned') ||
                (record.postType === PostType.RANK && 'reached'),
            };
          })
          ?.sort((a, b) => +new Date(b.posted) - +new Date(a.posted))
          .slice(offset, limit * page);
        return { posts, length: count };
      };

      await table
        .select({
          pageSize: 10,
        })
        .eachPage((partialRecords, fetchNextPage) => {
          records = [...records, ...partialRecords];
          fetchNextPage();
        });

      return processRecords();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllPosts(page = 1): Promise<any> {
    try {
      let cachedData = await cache.get('posts');
      const limit = 30;
      if (!cachedData) {
        cachedData = await table.select().all();
        cachedData = formattedResponse(cachedData);
        cache.set('posts', cachedData);
      }
      const count = cachedData?.length;
      const offset = page * limit - limit;
      const response = cachedData
        .map((record) => {
          return {
            ...record,
            action:
              (record.postType === PostType.CHECK_IN && 'attended') ||
              (record.postType === PostType.ACHIEVEMENT && 'earned') ||
              (record.postType === PostType.RANK && 'reached'),
          };
        })
        ?.sort((a, b) => +new Date(b.posted) - +new Date(a.posted))
        ?.slice(offset, limit * page);
      return { posts: response, length: count };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMorePeopleWithSameRank(
    username: string | string[],
    level: string | string[],
    schoolName: string | string[],
  ): Promise<string[]> {
    try {
      const records: readonly Record<FieldSet>[] = await ranksTable
        .select({
          filterByFormula: `AND({School Name (from All Schools)} = '${schoolName}', {Level (from Martial Arts Ranks)} = '${level}', {Username (from All Profiles)} != '${username}')`,
        })
        .all();
      const people: string[] = formattedResponse([...records]).map(
        (record: { usernameFromAllProfiles: any }) => {
          return {
            username: record.usernameFromAllProfiles,
          };
        },
      );
      return people;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new PostsServices();
