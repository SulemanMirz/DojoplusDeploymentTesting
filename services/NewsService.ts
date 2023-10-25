/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import { INews } from '../src/shared/models/news.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.ARTICLES);
const sourceTable = getTableInstance(TABLES.ARTICLE_SOURCE);

class NewsClassService {
  /**
   * @description - get articles against a specific user.
   * @returns - Return articles against a specific user.
   */

  async getNews(username): Promise<{ news: INews[] }> {
    try {
      const records: any = await table
        .select({
          filterByFormula: `FIND("${username}", ARRAYJOIN({Username}))`,
        })
        .all();

      const requests = [];
      for (let c1 = 0; c1 < records.length; c1 += 1) {
        requests.push(
          records[c1]?.fields.Channel && records[c1].fields.Channel[0]
            ? sourceTable
              .select({
                filterByFormula: `{Record ID} = '${records[c1].fields.Channel[0]}'`,
              })
              .all()
            : new Promise((res) => res([])),
        );
      }

      await Promise.all(requests).then((res) => {
        res.forEach((channel, index) => {
          if (channel && channel.length > 0) {
            records[index].fields = {
              ...records[index].fields,
              channel: _.mapKeys(channel[0].fields, (v, k) => _.camelCase(k)),
            };
          }
        });
      });

      return {
        news: formattedResponse(records),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new NewsClassService();
