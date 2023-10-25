import _ from 'lodash';

export const formattedResponse: (records: any[]) => any = (records) => {
  return records.map((record) => ({
    ..._.mapKeys(record.fields, (v, k) => _.camelCase(k)),
    id: record.id,
  }));
};
