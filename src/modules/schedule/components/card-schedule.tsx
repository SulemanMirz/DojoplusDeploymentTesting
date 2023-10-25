import * as React from 'react';
import styled from 'styled-components';
import { TextGray12Opacity } from '../../../shared/components/texts';

const ScheduleItem = styled.div`
  padding: 15px 0;
  font-size: 12px;
  background-color: #3c3c3c;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const ScheduleItemWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ScheduleEventNameStyled = styled.h3`
  font-family: Saira, Helvetica Neue, sans-serif;
  font-size: 16px;
  margin: 0 auto 4px;
  font-weight: 600;
`;

const ScheduleTime = styled.span`
  &:after {
    margin: 10px auto;
    content: '';
    display: block;
    height: 4px;
    width: 24px;
    background-color: #ff595f;
  }
`;

const TextTime = styled.span`
  font-family: Saira, Helvetica Neue, sans-serif;
  font-size: 16px;
  font-weight: 600;
`;
const TextFight = styled.span`
  font-family: 'Saira';
  font-size: 14px;
  font-weight: 500;
`;

const ScheduleOpacity = styled.span`
  font-family: Saira, Helvetica Neue, sans-serif;
  opacity: 0.5;
  font-weight: 600;
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

type CardScheduleProps = {
  name: string;
  martialArts: string;
  time: string;
  description: string;
  fightName: string;
};

const CardSchedule: React.FC<CardScheduleProps> = ({
  name,
  martialArts,
  time,
  description,
  fightName,
}): JSX.Element => {
  return (
    <>
      <ScheduleItem>
        <ScheduleItemWrapper>
          <ScheduleEventNameStyled>{name}</ScheduleEventNameStyled>
          <TextGray12Opacity>{martialArts}</TextGray12Opacity>
          <ScheduleTime>
            <Item>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Svg>
              <TextTime>{time}</TextTime>
            </Item>
          </ScheduleTime>
          <ScheduleOpacity>{description}</ScheduleOpacity>
          <TextFight>{fightName}</TextFight>
        </ScheduleItemWrapper>
      </ScheduleItem>
    </>
  );
};

export default CardSchedule;
