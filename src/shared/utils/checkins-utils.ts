import dayjs from 'dayjs';

export const TwelveHoursFormatCountries = [
  'usa',
  'united kingdom',
  'australia',
  'canada',
];

export const formattedUTCHours = (time: number, country?: string): string => {
  const convertedHours = `${new Date((time || 0) * 1000).getUTCHours()}:${
    new Date((time || 0) * 1000).getUTCMinutes() || '00'
  }`;
  if (!country) {
    return convertedHours;
  }
  return TwelveHoursFormatCountries.includes(country.toLocaleLowerCase())
    ? dayjs(`1/1/1 ${convertedHours}`).format('hh:mm a')
    : convertedHours;
};
