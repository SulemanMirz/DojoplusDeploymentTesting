export const CLOUDINARY_CLOUD_NAME = 'dvjojhstn';
export const CLOUDINARY_CLOUD_UNSIGNED_PRESET = 'Dojoplus';
export const BASE_URL = 'https://dojo.plus/';
// export const BASE_URL = 'http://localhost:3000/'; // for later use

const durations = [
  {
    label: 'week',
    value: 7,
  },
  {
    label: 'month',
    value: 30,
  },
  {
    label: 'year',
    value: 365,
  },
];

export const getPastDuration: (duration: string) => number | undefined = (
  duration,
) => {
  const days = durations.find((dur) => dur.label === duration);
  if (days) {
    return days.value;
  }
  return undefined;
};
