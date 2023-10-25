import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  EventCardContainer,
  PosterContainer,
  PosterImg,
  MonthText,
  DayText,
  YearText,
  DateCOntainer,
  LocationText,
} from './events.styled';
import { TextWhite16Regular } from '../../../shared/components/texts';
import { SeminarData } from '../../../shared/models/Seminar.model';

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 12px 0px;
`;
const GradeientBox = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.29) 38.89%, #070707 100%);
`;

const MartialArtsAndLocationCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
`;

const MartialArtsTexts = styled.span`
  font-family: 'Saira';
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`;

type SeminarsProps = {
  data: SeminarData;
};

export const EventCard: React.FC<SeminarsProps> = ({ data }) => {
  const router = useRouter();
  const title = data?.eventTitle;

  const coverImage = data?.coverImage;
  const imgUrl = coverImage && coverImage[0]?.url;

  const day = data?.startDate ? dayjs(data.startDate).format('DD') : '';
  const month = data?.startDate ? dayjs(data.startDate).format('MMM') : '';
  const year = data?.startDate ? dayjs(data.startDate).format('YYYY') : '';

  const martialArts =
    data?.martialArts?.[0] || data?.martialArtsFromMartialArts?.[0] || '';

  const detailsCheck =
    month || day || year || martialArts.length > 0 || data?.address;

  const defaultCover = '/assets/fallback_images/_Event Cover.png';
  return (
    <EventCardContainer
      style={{ paddingBottom: detailsCheck ? '1rem' : 0 }}
      hasEnd={false}
      onClick={() => router.push(`/events/${data?.eventType}/${data.recordId}`)}
    >
      <PosterContainer>
        <GradeientBox />
        <PosterImg src={imgUrl || defaultCover} alt="" />
        <TextWhite16Regular
          style={{
            cursor: 'pointer',
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          {title}
        </TextWhite16Regular>
      </PosterContainer>
      {detailsCheck && (
        <DescriptionContainer>
          <DateCOntainer>
            <MonthText>{month}</MonthText>
            <DayText>{day}</DayText>
            <YearText>{year}</YearText>
          </DateCOntainer>
          <MartialArtsAndLocationCont>
            <MartialArtsTexts>{martialArts}</MartialArtsTexts>
            <LocationText>{data?.address}</LocationText>
          </MartialArtsAndLocationCont>
        </DescriptionContainer>
      )}
    </EventCardContainer>
  );
};
