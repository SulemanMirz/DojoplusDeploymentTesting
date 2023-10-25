/**
 * @param param -Text to convert.
 * @returns -Cleaned string to URL.
 */
export function getSlugUrl(param: string): string {
  return param
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const toUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const toBRL = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'BRL',
}).format;

/**
 * @description - Format Price.
 * @param {number} _amount - Amount.
 * @param {string} currency - Currency.
 * @returns {string} - Return formated price.
 */
export const formatPrice = (
  _amount?: number | null,
  currency?: string | null,
): string => {
  const amount = _amount || 0;
  if (currency?.toLowerCase() === 'usd') {
    return toUSD(amount);
  }
  return `${toBRL(amount)} BRL`;
};

export const distance: (
  lt1: number,
  lt2: number,
  lng1: number,
  lng2: number,
) => number = (lt1, lt2, lng1, lng2) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  const lon1 = (lng1 * Math.PI) / 180;
  const lon2 = (lng2 * Math.PI) / 180;
  const lat1 = (lt1 * Math.PI) / 180;
  const lat2 = (lt2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  // calculate the result
  return c * r;
};

export const DEFAULT_AVATAR_URL =
  'https://res.cloudinary.com/tkturners/image/upload/v1662533815/certificates/descarga_bbopyb.png';

export const DEFAULT_BELT_URL =
  'https://res.cloudinary.com/tkturners/image/upload/v1662536184/certificates/beltDefault_ncqdh0.png';

export const ordinalSuffix = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (!i) {
    return '';
  }
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

export const getTimeIntoString = (timeString?: string): number => {
  if (!timeString) return null;
  const hasColon = timeString?.includes(':');

  if (hasColon) {
    const [hours, minutes] = timeString?.split(':');
    let timeInSeconds = 0;
    if (hours === '0') {
      timeInSeconds = parseInt(minutes) * 60;
    } else {
      timeInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
    }
    return timeInSeconds;
  }

  const hoursformat = timeString?.substring(0, 2);
  const minutesformat = timeString?.substring(2);
  const formattedValue = `${hoursformat} : ${minutesformat}`;

  const [hours, minutes] = formattedValue?.split(':');
  let timeInSeconds = 0;
  if (hours === '0') {
    timeInSeconds = parseInt(minutes) * 60;
  } else {
    timeInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
  }
  return timeInSeconds;
};
