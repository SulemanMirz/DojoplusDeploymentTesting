import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Import the UTC plugin

dayjs.extend(utc); // Extend dayjs with the UTC plugin

// Replace with the GMT offset of the desired area in hours
// const gmtOffset = -4; // For example, GMT-4

// Calculate the current time for the specified GMT offset

export const getTimeWithGMTOffset = (gmtOffset: number): string => {
  const schoolLocalTime = dayjs()
    .utc()
    .add(gmtOffset / 100, 'hour')
    .format('YYYY-MM-DD HH:mm:ss');
  return schoolLocalTime;
};
