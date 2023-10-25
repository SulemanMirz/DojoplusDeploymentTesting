import styled from 'styled-components';
import { COLOR_LETTERS_WHITE, COLOR_ORANGE } from '../styles/colors';

export const TextTruncation = styled.span<{ lines?: number }>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 1};
  -webkit-box-orient: vertical;
`;

export const TextWhite32CapitalizeBold = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 32px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 700;
  display: block;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
`;

export const TextWhite24CapitalizeBold = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 700;
  margin: 0;
`;

export const TextWhite24Capitalize600 = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;

export const LinkWhite24CapitalizeBold = styled.a`
  white-space: nowrap;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 700;
  margin: 0;
  cursor: pointer;
  text-decoration: none;
`;

export const TextWhite18CapitalizeBold = styled.span`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;
export const TextWhite18RegularBold = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;

export const TextWhite22UppercaseRegular = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 22px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;

export const TextWhite20UppercaseRegular = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 20px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;

export const TextWhite24CapitalizeRegular = styled.p`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  height: 29px;
  line-height: 120%;
  margin: 0;
`;

export const TextWhite18UppercaseRegular = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;
export const TextWhite18Regular400 = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 400;
  margin: 0;
`;
export const TextWhite14UppercaseRegular = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;
export const TextWhite15Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 15px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;
export const TextWhite14CapitalizeRegular = styled.span`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;
export const TextWhite14Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;
export const TextWhite14CapitalizeThin = styled.span`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 400;
  margin: 0;
`;

export const TextWhite16CapitalizeThin = styled.span`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;
export const TextWhite16Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;

// Gray TEXTS
export const TextGray18CapitalizeThin = styled.span`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: gray;
  font-weight: 400;
  margin: 0;
`;
export const TextGray14UppercaseRegular = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: gray;
  font-weight: 500;
  margin: 0;
`;
export const TextGray14CapitalizeRegular = styled.span`
  white-space: nowrap;
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: gray;
  font-weight: 500;
  margin: 0;
`;
export const TextGray14CapitalizeThin = styled.span`
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: gray;
  font-weight: 400;
  margin: 0;
`;

export const TextGray14Thin = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: gray;
  font-weight: 400;
  margin: 0;
`;

export const TextGray12UppercaseBold = styled.span`
  line-height: 0;
  /* padding-left: 5px; */
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: gray;
  font-weight: 400;
  margin: 0;
`;

export const TextWhite12UppercaseBold = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: #fcfcfc;
  font-weight: 700;
  margin: 0;
`;

export const TextGray12 = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: gray;
  font-weight: 500;
  margin: 0;
`;

export const TextGray12Opacity = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  opacity: 0.5;
  font-weight: 600;
`;
export const TextWhite12Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
`;
export const TextOrange12Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: ${COLOR_ORANGE};
  font-weight: 500;
  margin: 0;
`;
export const TextWhite12Underline = styled.span`
  text-decoration: underline;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
  cursor: pointer;
`;
export const TextWhite14HoverUnderline = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
export const TextOffWhite14Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: #fcfcfc;
  font-weight: 400;
  padding-left: 15px;
`;
export const TextGray12Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: #b3b3b3;
  font-weight: 400;
`;
export const TextWhite12Regular400 = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: #ffffff;
  font-weight: 400;
  font-style: normal;
`;
export const TextGray10UppercaseRegular = styled.span`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 10px;
  color: gray;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.16em;
  line-height: 150%;
`;

export const TextWhite16UppercaseRegular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  color: #fcfcfc;
  font-weight: 600;
  margin: 0;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const TextWhite24Normal600 = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #ffffff;
`;
