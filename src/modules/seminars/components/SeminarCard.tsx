import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  SeminarCardContainer,
  PosterContainer,
  PosterImg,
} from './seminars.styled';
import {
  TextWhite12Regular,
  TextWhite16Regular,
} from '../../../shared/components/texts';
import { SeminarData } from '../../../shared/models/Seminar.model';
import { BuyTicketsButton } from './BuyTicketButton';

const Svg = styled.svg`
  margin-right: 0.25rem;
  cursor: pointer;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;
const DescriptionContainer = styled.div`
  padding: 12px 12px 0px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
`;
const IconWrapper = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
type SeminarsProps = {
  data: SeminarData;
};

export const SeminarCard: React.FC<SeminarsProps> = ({ data }) => {
  const router = useRouter();
  const username = router.query.slug[0];
  const title = data?.eventTitle;

  const coverImage = data?.coverImage;
  const imgUrl = coverImage && coverImage[0]?.url;

  const formatedDate = data?.startDate
    ? dayjs(data.startDate).format('dddd, MMMM D, YYYY - hh:mm')
    : '';

  const defaultCover = '/assets/fallback_images/_Event Cover.png';
  const hasEnd = new Date(data.endDate) < new Date();
  return (
    <SeminarCardContainer hasEnd={hasEnd}>
      <PosterContainer>
        <PosterImg src={imgUrl || defaultCover} alt="" />
      </PosterContainer>
      <DescriptionContainer>
        <Item>
          <Svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.3335 1.99984H13.0002C13.177 1.99984 13.3465 2.07008 13.4716 2.1951C13.5966 2.32012 13.6668 2.48969 13.6668 2.6665V13.3332C13.6668 13.51 13.5966 13.6796 13.4716 13.8046C13.3465 13.9296 13.177 13.9998 13.0002 13.9998H1.00016C0.823352 13.9998 0.653782 13.9296 0.528758 13.8046C0.403734 13.6796 0.333496 13.51 0.333496 13.3332V2.6665C0.333496 2.48969 0.403734 2.32012 0.528758 2.1951C0.653782 2.07008 0.823352 1.99984 1.00016 1.99984H3.66683V0.666504H5.00016V1.99984H9.00016V0.666504H10.3335V1.99984ZM9.00016 3.33317H5.00016V4.6665H3.66683V3.33317H1.66683V5.99984H12.3335V3.33317H10.3335V4.6665H9.00016V3.33317ZM12.3335 7.33317H1.66683V12.6665H12.3335V7.33317Z"
              fill="#D21632"
            />
          </Svg>
          <TextWhite12Regular style={{ color: '#D21632' }}>
            {formatedDate}
          </TextWhite12Regular>
        </Item>
        <TextWhite16Regular
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (data.registrationLink)
              window.open(data.registrationLink, '_blank').focus();
            else router.push(`/${username}/seminar/${title}`);
          }}>
          {title}
        </TextWhite16Regular>
        <ButtonsContainer>
          <BuyTicketsButton
            onClick={() => {
              if (data.registrationLink)
                window.open(data.registrationLink, '_blank').focus();
              else router.push(`/${username}/seminar/${title}`);
            }}
          />
          <IconWrapper>
            <Svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.66667 8.33317H5.33333C4.23973 8.33275 3.16682 8.63127 2.23058 9.19644C1.29435 9.76161 0.530401 10.5719 0.0213343 11.5398C0.00702532 11.3602 -9.15218e-05 11.18 8.88408e-07 10.9998C8.88408e-07 7.31784 2.98467 4.33317 6.66667 4.33317V0.666504L13.6667 6.33317L6.66667 11.9998V8.33317ZM5.33333 6.99984H8V9.20517L11.5473 6.33317L8 3.46117V5.6665H6.66667C5.90017 5.66564 5.14253 5.83038 4.44559 6.14945C3.74866 6.46852 3.12888 6.93439 2.62867 7.51517C3.48955 7.17398 4.40731 6.99912 5.33333 6.99984Z"
                fill="#FCFCFC"
              />
            </Svg>
          </IconWrapper>
        </ButtonsContainer>
      </DescriptionContainer>
    </SeminarCardContainer>
  );
};
