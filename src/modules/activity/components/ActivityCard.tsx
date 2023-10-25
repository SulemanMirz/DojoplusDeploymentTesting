import * as React from 'react';
import styled from 'styled-components';
import AvatarMUI from '@mui/material/Avatar';
import { TextGray12Opacity } from '../../../shared/components/texts';

const ScheduleItem = styled.div`
  background-color: #323232;
  width: 100%;
  border-radius: 4px;
  margin-block: 8px;
  cursor: pointer;
  padding: 15px 0;
  font-size: 12px;
  display: flex;
  flex-direction: row;
`;

const Avatar = styled(AvatarMUI)`
  width: 66px !important;
  height: 66px !important;
`;

const ScheduleItemWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const ScheduleEventNameStyled = styled.h3`
  font-family: Saira, Helvetica Neue, sans-serif;
  font-size: 16px;
  margin: 0px;
  font-weight: 600;
`;

const ScheduleTime = styled.span`
  &:after {
    margin: 10px 0px;
    content: '';
    display: block;
    height: 4px;
    width: 24px;
    background-color: #ff595f;
  }
`;

const TextTime = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #fcfcfc;
  white-space: pre;
`;

const Item = styled.span`
  font-family: Saira, Helvetica Neue, sans-serif;
  font-size: 0.875rem;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
`;

const Svg = styled.svg`
  width: 20px;
  height: 20px;
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.25rem;
  opacity: 0.5;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 24px;
`;

type ActivityCardProps = {
  name: string;
  martialArts: string;
  duration: string;
  date: string;
  onClickCard: () => void;
  schoolLogo: string;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  name,
  martialArts,
  duration,
  date,
  onClickCard,
  schoolLogo,
}): JSX.Element => {
  const defaultSchoolLogo = '/assets/logo/dojo.png';
  return (
    <>
      <ScheduleItem onClick={onClickCard}>
        <AvatarContainer>
          <Avatar variant="circular" src={schoolLogo || defaultSchoolLogo} />
        </AvatarContainer>
        <ScheduleItemWrapper>
          <ScheduleTime>
            <Item>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Svg>
              <TextTime>
                {duration}
                {'  '}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.3335 1.99935H13.0002C13.177 1.99935 13.3465 2.06959 13.4716 2.19461C13.5966 2.31964 13.6668 2.4892 13.6668 2.66602V13.3327C13.6668 13.5095 13.5966 13.6791 13.4716 13.8041C13.3465 13.9291 13.177 13.9993 13.0002 13.9993H1.00016C0.823352 13.9993 0.653782 13.9291 0.528758 13.8041C0.403734 13.6791 0.333496 13.5095 0.333496 13.3327V2.66602C0.333496 2.4892 0.403734 2.31964 0.528758 2.19461C0.653782 2.06959 0.823352 1.99935 1.00016 1.99935H3.66683V0.666016H5.00016V1.99935H9.00016V0.666016H10.3335V1.99935ZM9.00016 3.33268H5.00016V4.66602H3.66683V3.33268H1.66683V5.99935H12.3335V3.33268H10.3335V4.66602H9.00016V3.33268ZM12.3335 7.33268H1.66683V12.666H12.3335V7.33268Z"
                    fill="#828282"
                  />
                </svg>
                {'  '}
                {date}
              </TextTime>
            </Item>
          </ScheduleTime>
          <ScheduleEventNameStyled>{name}</ScheduleEventNameStyled>
          <TextGray12Opacity style={{ fontWeight: 400 }}>
            {martialArts}
          </TextGray12Opacity>
        </ScheduleItemWrapper>
      </ScheduleItem>
    </>
  );
};

export default ActivityCard;
