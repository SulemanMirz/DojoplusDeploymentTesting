import React from 'react';

export const Pause = ({ size = 25 }: { size: number }): JSX.Element => {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      // width="9px"
      height={size - 2}
      viewBox="0 0 24 24"
      aria-labelledby="pauseIconTitle"
      stroke="#fff"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      color="#000">
      {' '}
      <title id="pauseIconTitle">Pause</title>{' '}
      <rect width="4" height="16" x="5" y="4" />{' '}
      <rect width="4" height="16" x="15" y="4" />{' '}
    </svg>
  );
};

export const Play = ({ size = 25 }: { size: number }): JSX.Element => {
  return (
    <svg
      // width="9"
      height={size}
      viewBox="0 0 9 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.92937 5.99988L1.66671 3.15788V8.84188L5.92937 5.99988ZM7.91737 6.27722L0.851374 10.9879C0.801178 11.0213 0.742861 11.0404 0.682635 11.0433C0.622409 11.0462 0.562529 11.0327 0.509373 11.0042C0.456218 10.9758 0.411776 10.9334 0.380783 10.8817C0.34979 10.83 0.333405 10.7708 0.333374 10.7105V1.28922C0.333405 1.22892 0.34979 1.16976 0.380783 1.11804C0.411776 1.06633 0.456218 1.02398 0.509373 0.995522C0.562529 0.967063 0.622409 0.953554 0.682635 0.956436C0.742861 0.959317 0.801178 0.978479 0.851374 1.01188L7.91737 5.72255C7.96303 5.75299 8.00046 5.79423 8.02635 5.84261C8.05224 5.89099 8.06578 5.94501 8.06578 5.99988C8.06578 6.05475 8.05224 6.10878 8.02635 6.15715C8.00046 6.20553 7.96303 6.24678 7.91737 6.27722Z"
        fill="#FCFCFC"
      />
    </svg>
  );
};
export const Buy = ({ size = 25 }: { size: number }): JSX.Element => {
  return (
    <svg
      // width="9"
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.66664 3.27605L0.504639 1.11472L1.44797 0.171387L3.60931 2.33339H13.7706C13.8745 2.33338 13.977 2.35766 14.0699 2.4043C14.1627 2.45093 14.2434 2.51863 14.3055 2.60198C14.3675 2.68534 14.4092 2.78204 14.4272 2.88438C14.4453 2.98671 14.4391 3.09185 14.4093 3.19139L12.8093 8.52472C12.7681 8.66211 12.6838 8.78256 12.5687 8.86819C12.4537 8.95382 12.3141 9.00006 12.1706 9.00005H3.99997V10.3334H11.3333V11.6667H3.33331C3.15649 11.6667 2.98693 11.5965 2.8619 11.4715C2.73688 11.3464 2.66664 11.1769 2.66664 11.0001V3.27605ZM3.99997 3.66672V7.66672H11.6746L12.8746 3.66672H3.99997ZM3.66664 14.3334C3.40142 14.3334 3.14707 14.228 2.95953 14.0405C2.772 13.853 2.66664 13.5986 2.66664 13.3334C2.66664 13.0682 2.772 12.8138 2.95953 12.6263C3.14707 12.4387 3.40142 12.3334 3.66664 12.3334C3.93185 12.3334 4.18621 12.4387 4.37375 12.6263C4.56128 12.8138 4.66664 13.0682 4.66664 13.3334C4.66664 13.5986 4.56128 13.853 4.37375 14.0405C4.18621 14.228 3.93185 14.3334 3.66664 14.3334ZM11.6666 14.3334C11.4014 14.3334 11.1471 14.228 10.9595 14.0405C10.772 13.853 10.6666 13.5986 10.6666 13.3334C10.6666 13.0682 10.772 12.8138 10.9595 12.6263C11.1471 12.4387 11.4014 12.3334 11.6666 12.3334C11.9319 12.3334 12.1862 12.4387 12.3737 12.6263C12.5613 12.8138 12.6666 13.0682 12.6666 13.3334C12.6666 13.5986 12.5613 13.853 12.3737 14.0405C12.1862 14.228 11.9319 14.3334 11.6666 14.3334Z"
        fill="#FCFCFC"
      />
    </svg>
  );
};
