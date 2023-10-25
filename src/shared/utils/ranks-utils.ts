import dayjs from 'dayjs';
import { IRank, Rank } from '../models/Rank.model';

/**
 * @description - Ranks ordering according to issued date and then order number.
 * @param ranks - Ranks Array.
 * @returns - Return Ordered ranks.
 */
export function orderRanks(ranks: Rank[] | IRank[]): Rank[] | IRank[] {
  return [...JSON.parse(JSON.stringify(ranks))].sort((a, b) => {
    const date1 = b.graduated ? new Date(b.graduated) : 0;
    const date2 = a.graduated ? new Date(a.graduated) : 0;
    if (a?.orderFromRank && b?.orderFromRank && date1 === 0 && date2 === 0) {
      return b.orderFromRank - a.orderFromRank;
    }
    return +date1 - +date2;
  });
}

export const calcDateDifference: (date1: Date, date2: Date) => string = (
  date1: Date,
  date2: Date,
) => {
  const date1Dayjs = dayjs(date1);
  const date2Dayjs = dayjs(date2);

  const seconds = date1Dayjs.diff(date2Dayjs) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;
  const months = (days % 365) / 30.5;
  const dayss = (days % 365) % 30.5;

  let message = '';
  message += parseInt(years.toString())
    ? `${parseInt(years.toString())} year(s) \n`
    : '';
  message += parseInt(months.toString())
    ? `${parseInt(months.toString())} month(s) `
    : '';
  message += `${parseInt(dayss.toString())} day(s) `;

  return message;
};
