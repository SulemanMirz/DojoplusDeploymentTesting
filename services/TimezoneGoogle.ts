/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextApiRequest, NextApiResponse } from 'next';
import { FieldSet } from 'airtable';
import axios from 'axios';
import { TABLES, getTableInstance } from './Airtable';
import { formattedResponse } from '../src/shared/utils/airtable-utils';

const convertGMTOffset = (offset, dst, i) => {
  // will be used in the dst applicable months, till the it's a console
  console.log(i, ' There you go...👉🏻 dst', dst, ' ');
  const hours = Math.floor(offset / 3600); // Divide offset by 3600 to get hours
  const minutes = Math.floor((offset % 3600) / 60); // Get the remaining seconds and convert to minutes
  const formattedHours =
    hours >= 0
      ? `+${hours.toString().padStart(2, '0')}`
      : `-${Math.abs(hours).toString().padStart(2, '0')}`;
  const formattedMinutes =
    minutes < 1
      ? (minutes * -1).toString().padStart(2, '0')
      : minutes.toString().padStart(2, '0');

  return `${formattedHours}${formattedMinutes}`;
};

const schoolTable = getTableInstance(TABLES.SCHOOL);

class GMTOffsetService {
  public async updateGMTOffsets(req: NextApiRequest, res: NextApiResponse) {
    try {
      const updatePromises = [];
      const records: any = await schoolTable
        .select({
          filterByFormula: '{long} != BLANK()',
        })
        .all();
      const formattedRecs = formattedResponse(records);

      for (let i = 0; i < formattedRecs.length; i += 1) {
        const record = formattedRecs?.[i];
        const latitude = record.lat;
        const longitude = record.long;

        try {
          const response = await axios.get(
            `http://api.timezonedb.com/v2.1/get-time-zone?key=RI37R5RD2J1Y&format=json&by=position&lat=${latitude}&lng=${longitude}`,
          );

          const { gmtOffset, dst } = response.data;

          const standardOffset = convertGMTOffset(gmtOffset, parseInt(dst), i);

          await new Promise((resolve) => {
            setTimeout(() => resolve({ timeout: true }), 2000);
          });

          const fieldsToUpdate: FieldSet = {
            'GMT Offset': parseInt(standardOffset),
          };
          const something = await schoolTable.update(record.id, fieldsToUpdate);
          updatePromises.push({
            id: something?.id,
            slug: something?.fields?.Slug,
          });
        } catch (err) {
          console.log('Trouble in the paradise ❌❌❌', err?.message);
        }
      }

      return res.status(200).json({
        message: 'GMT offsets updated successfully.',
        updatePromises,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ msg: 'Internal Server Error', error });
    }
  }
}

export default new GMTOffsetService();
