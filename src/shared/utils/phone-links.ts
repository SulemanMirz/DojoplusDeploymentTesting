const filterOnlyNumber = (number: string): string =>
  number.match(/[0-9]/g).join('');

export const getWhatsAppLink = (number: string): string => {
  const formatNumber = filterOnlyNumber(number);
  return `https://wa.me/${formatNumber}`;
};

export const getSMSLink = (number: string): string => {
  const formatNumber = filterOnlyNumber(number);
  return `sms:${formatNumber}`;
};

export const getTelLink = (number: string): string => {
  const formatNumber = filterOnlyNumber(number);
  return `tel://${formatNumber}`;
};

export const getPhoneLink = (number?: string, type?: string): string => {
  let link = '';
  if (!number || !type) {
    return '';
  }

  switch (type) {
  case 'WHATSAPP':
    link = getWhatsAppLink(number);
    break;
  case 'SMS':
    link = getSMSLink(number);
    break;
  case 'PHONE':
    link = getTelLink(number);
    break;
  default:
    link = getTelLink(number);
    break;
  }
  return link;
};
