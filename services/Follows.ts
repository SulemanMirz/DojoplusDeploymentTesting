/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { TABLES, getTableInstance } from './Airtable';
import RanksService from './RanksService';

const table = getTableInstance(TABLES.PEOPLE);

class FollowsService {
  /**
   * @description - Get Followers, Following, and allow to follow.
   * @param username - Username.
   * @returns - Return Followers, Following, and allow to follow.
   */

  async getDetailedFollowers(username: string) {
    try {
      let followers: any = await table
        .select({ filterByFormula: `{username} = '${username}'` })
        .all();
      followers = followers[0]?.fields['Username (from Followers)'] || [];

      const peopleQuery = followers
        .map((record) => {
          return `{Username} = '${record}'`;
        })
        .filter(Boolean);

      let records: any = await table
        .select({
          filterByFormula: `OR(${peopleQuery.join(',')})`,
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

  async getFollowers(username: string) {
    try {
      const records = await table
        .select({ filterByFormula: `{username} = '${username}'` })
        .all();
      return records[0]?.fields['Username (from Followers)'] || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getDetailedFollowings(username: string) {
    try {
      let records: any = await table
        .select({
          filterByFormula: `FIND("${username}", ARRAYJOIN({Username (from Followers)}))`,
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

  async getFollowing(username: string) {
    try {
      const records = await table
        .select({
          filterByFormula: `FIND("${username}", ARRAYJOIN({Username (from Followers)}))`,
        })
        .all();
      return records.map((record) => record.fields.Username);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getDetailedMutualFollowings(
    sourceUser: string,
    destinationUser: string,
  ) {
    try {
      const sourceUserFollowing: any = await table
        .select({
          filterByFormula: `FIND("${sourceUser}", ARRAYJOIN({Username (from Followers)}))`,
        })
        .all();
      const destinationUserFollowing: any = await table
        .select({
          filterByFormula: `FIND("${destinationUser}", ARRAYJOIN({Username (from Followers)}))`,
        })
        .all();
      const alUsers = [...formattedResponse(sourceUserFollowing), ...formattedResponse(destinationUserFollowing)];
      const lookup = alUsers.reduce((a, e) => {
        // eslint-disable-next-line no-plusplus, no-param-reassign
        a[e.username] = ++a[e.username] || 0;
        return a;
      }, {});

      const records = [
        ...new Map(
          alUsers
            .filter((e) => lookup[e.username])
            .map((item) => [item.username, item]),
        ).values(),
      ];

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

  async follow(sourceUser: string, destinationUser: string) {
    try {
      const requests = [];
      let source = null;
      let destination = null;
      requests.push(
        table
          .select({
            filterByFormula: `{Email} = '${sourceUser}'`,
          })
          .all(),
      );

      requests.push(
        table
          .select({
            filterByFormula: `{username} = '${destinationUser}'`,
          })
          .all(),
      );
      await Promise.all(requests).then((res) => {
        source = [...res[0]];
        destination = [...res[1]];
      });

      const record = await table.update([
        {
          id: destination[0].id,
          fields: {
            Followers: [
              ...(destination[0].fields.Followers
                ? destination[0].fields.Followers
                : []),
              source[0].id,
            ],
          },
        },
      ]);
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async unfollow(sourceUser: string, destinationUser: string) {
    try {
      const requests = [];
      let source = null;
      let destination = null;
      requests.push(
        table
          .select({
            filterByFormula: `{Email} = '${sourceUser}'`,
          })
          .all(),
      );

      requests.push(
        table
          .select({
            filterByFormula: `{username} = '${destinationUser}'`,
          })
          .all(),
      );
      await Promise.all(requests).then((res) => {
        source = [...res[0]];
        destination = [...res[1]];
      });

      const record = await table.update([
        {
          id: destination[0].id,
          fields: {
            Followers: [
              ...(destination[0].fields.Followers
                ? destination[0].fields.Followers.filter(
                  (follower) => follower !== source[0].id,
                )
                : []),
            ],
          },
        },
      ]);
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async isFollowing(sourceUserEmail: string, destinationUser: string) {
    try {
      const requests = [];
      let source = null;
      let destination = null;
      requests.push(
        table
          .select({
            filterByFormula: `{Email} = '${sourceUserEmail}'`,
          })
          .all(),
      );

      requests.push(
        table
          .select({
            filterByFormula: `{username} = '${destinationUser}'`,
          })
          .all(),
      );
      await Promise.all(requests).then((res) => {
        source = [...res[0]];
        destination = [...res[1]];
      });

      if (
        destination[0].fields?.Followers?.find(
          (follower) => follower === source[0].id,
        )
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);

      console.error(error);
      throw error;
    }
  }
}

export default new FollowsService();
