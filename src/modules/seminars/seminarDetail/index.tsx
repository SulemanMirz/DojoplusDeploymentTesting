import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { PosterImg } from '../components/seminars.styled';
import {
  TextWhite14Regular,
  TextWhite16Regular,
} from '../../../shared/components/texts';
import { Seminar } from '../../../shared/models/Seminar.model';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';

export const TextWhite24CapitalizeBold = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 700;
  margin: 0;
  line-height: 28px;
`;

export const SeminarDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #333435;
  padding-bottom: 1rem;
  -webkit-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 7rem;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
`;

const SchoolContainer = styled.div`
  display: flex;
  align-items: center;
  margin-block: 16px;
`;

export const DetailContainer = styled.div`
  padding-top: 8px;
`;

export const SeminarDetailInnerContainer = styled.div`
  padding-inline: 16px;
  position: relative;
`;

const Svg = styled.svg`
  margin-right: 0.25rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
`;
export const TextOffWhite14Regular = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: #fcfcfc;
  font-weight: 400;
  padding-left: 15px;
`;
export const AddressWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const DescriptionContainer = styled.div`
  margin-top: 34px;
`;
const FixedBorderWrapperForPoster = styled.div`
  position: absolute;
  height: 30%;
  width: 100%;
  /* background: aqua; */
  top: 0;
  z-index: 0;
  left: 0;
  border-inline: 16px solid #111111 !important;
`;

type SeminarsProps = {
  data: Seminar;
};

export const Wrapper: React.FC<SeminarsProps> = ({ data }) => {
  const title = data?.eventTitle;

  const coverImage = data?.coverImage;
  const imgUrl = coverImage && coverImage[0]?.url;

  const formatedDate = data?.startDate
    ? dayjs(data.startDate).format('dddd, MMMM D, YYYY')
    : '';
  const formatedStartTime = data?.startDate
    ? dayjs(data.startDate).format('hh:mm')
    : '';
  const formatedEndTime = data?.endDate
    ? dayjs(data.endDate).format('hh:mm')
    : '';

  const defaultCover = '/assets/fallback_images/_Event Cover.png';

  return (
    <SeminarDetailContainer>
      <SeminarDetailInnerContainer>
        <FixedBorderWrapperForPoster />
        <PosterImg
          style={{ borderRadius: 0 }}
          src={imgUrl || defaultCover}
          alt=""
        />

        <TextWhite24CapitalizeBold>{title}</TextWhite24CapitalizeBold>

        <SchoolContainer>
          {' '}
          <Image
            src={
              data.school?.schoolLogo[0]
                ? data.school?.schoolLogo[0].url
                : '/assets/logo/dojo.png'
            }
            alt="school logo"
          />
          <TextWhite14Regular>{data.school?.schoolName}</TextWhite14Regular>
        </SchoolContainer>
        <DetailContainer>
          {formatedDate && (
            <Item>
              <Svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.3335 1.99984H13.0002C13.177 1.99984 13.3465 2.07008 13.4716 2.1951C13.5966 2.32012 13.6668 2.48969 13.6668 2.6665V13.3332C13.6668 13.51 13.5966 13.6796 13.4716 13.8046C13.3465 13.9296 13.177 13.9998 13.0002 13.9998H1.00016C0.823352 13.9998 0.653782 13.9296 0.528758 13.8046C0.403734 13.6796 0.333496 13.51 0.333496 13.3332V2.6665C0.333496 2.48969 0.403734 2.32012 0.528758 2.1951C0.653782 2.07008 0.823352 1.99984 1.00016 1.99984H3.66683V0.666504H5.00016V1.99984H9.00016V0.666504H10.3335V1.99984ZM9.00016 3.33317H5.00016V4.6665H3.66683V3.33317H1.66683V5.99984H12.3335V3.33317H10.3335V4.6665H9.00016V3.33317ZM12.3335 7.33317H1.66683V12.6665H12.3335V7.33317Z"
                  fill="#FCFCFC"
                />
              </Svg>
              <TextWhite14Regular>{formatedDate}</TextWhite14Regular>
            </Item>
          )}
          {(formatedStartTime || formatedEndTime) && (
            <Item>
              <Svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.00016 13.6668C3.31816 13.6668 0.333496 10.6822 0.333496 7.00016C0.333496 3.31816 3.31816 0.333496 7.00016 0.333496C10.6822 0.333496 13.6668 3.31816 13.6668 7.00016C13.6668 10.6822 10.6822 13.6668 7.00016 13.6668ZM7.00016 12.3335C8.41465 12.3335 9.77121 11.7716 10.7714 10.7714C11.7716 9.77121 12.3335 8.41465 12.3335 7.00016C12.3335 5.58567 11.7716 4.22912 10.7714 3.22893C9.77121 2.22873 8.41465 1.66683 7.00016 1.66683C5.58567 1.66683 4.22912 2.22873 3.22893 3.22893C2.22873 4.22912 1.66683 5.58567 1.66683 7.00016C1.66683 8.41465 2.22873 9.77121 3.22893 10.7714C4.22912 11.7716 5.58567 12.3335 7.00016 12.3335V12.3335ZM7.66683 7.00016H10.3335V8.3335H6.3335V3.66683H7.66683V7.00016Z"
                  fill="#FCFCFC"
                />
              </Svg>

              <TextWhite14Regular>
                {`${formatedStartTime || ''} → ${formatedEndTime || ''}`}
              </TextWhite14Regular>
            </Item>
          )}
          <AddressWrapper>
            {data?.school?.schoolName && (
              <Item>
                <Svg
                  width="12"
                  height="15"
                  viewBox="0 0 12 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 12.9334L9.3 9.63344C9.9526 8.98078 10.397 8.14926 10.577 7.24403C10.7571 6.33879 10.6646 5.40051 10.3114 4.54781C9.95817 3.69512 9.36003 2.96632 8.59261 2.45356C7.82519 1.9408 6.92296 1.66711 6 1.66711C5.07704 1.66711 4.17481 1.9408 3.40739 2.45356C2.63997 2.96632 2.04183 3.69512 1.68861 4.54781C1.33539 5.40051 1.24294 6.33879 1.42297 7.24403C1.603 8.14926 2.04741 8.98078 2.7 9.63344L6 12.9334ZM6 14.8188L1.75734 10.5761C0.918228 9.73699 0.346791 8.66789 0.115286 7.50401C-0.11622 6.34013 0.00260456 5.13373 0.456732 4.03738C0.91086 2.94103 1.6799 2.00396 2.66659 1.34467C3.65328 0.685388 4.81332 0.333496 6 0.333496C7.18669 0.333496 8.34672 0.685388 9.33342 1.34467C10.3201 2.00396 11.0891 2.94103 11.5433 4.03738C11.9974 5.13373 12.1162 6.34013 11.8847 7.50401C11.6532 8.66789 11.0818 9.73699 10.2427 10.5761L6 14.8188ZM6 7.66678C6.35362 7.66678 6.69276 7.5263 6.94281 7.27625C7.19286 7.0262 7.33334 6.68707 7.33334 6.33344C7.33334 5.97982 7.19286 5.64068 6.94281 5.39064C6.69276 5.14059 6.35362 5.00011 6 5.00011C5.64638 5.00011 5.30724 5.14059 5.05719 5.39064C4.80715 5.64068 4.66667 5.97982 4.66667 6.33344C4.66667 6.68707 4.80715 7.0262 5.05719 7.27625C5.30724 7.5263 5.64638 7.66678 6 7.66678ZM6 9.00011C5.29276 9.00011 4.61448 8.71916 4.11438 8.21906C3.61429 7.71896 3.33334 7.04069 3.33334 6.33344C3.33334 5.6262 3.61429 4.94792 4.11438 4.44783C4.61448 3.94773 5.29276 3.66678 6 3.66678C6.70725 3.66678 7.38552 3.94773 7.88562 4.44783C8.38572 4.94792 8.66667 5.6262 8.66667 6.33344C8.66667 7.04069 8.38572 7.71896 7.88562 8.21906C7.38552 8.71916 6.70725 9.00011 6 9.00011Z"
                    fill="#FCFCFC"
                  />
                </Svg>

                <TextWhite14Regular>
                  {data?.school?.schoolName}
                </TextWhite14Regular>
              </Item>
            )}
            <TextOffWhite14Regular>
              {data?.address ? data?.address?.split('\\n').join(' ') : ''}
            </TextOffWhite14Regular>
          </AddressWrapper>
        </DetailContainer>
        <DescriptionContainer>
          <TextWhite16Regular>{data?.description}</TextWhite16Regular>
        </DescriptionContainer>
      </SeminarDetailInnerContainer>
    </SeminarDetailContainer>
  );
};
