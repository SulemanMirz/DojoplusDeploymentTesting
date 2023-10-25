import * as React from 'react';
import styled from 'styled-components';
import { TextGray12Opacity } from '../../../shared/components/texts';
import UserAvatar from '../../userAvatar';
import useLiveRemoteTime from '../../../shared/hooks/useLiveRemoteTime';

const ScheduleItem = styled.div<{ hasEnd; progress }>`
  background-color: #323232;
  width: 95%;
  border-radius: 4px;
  margin-bottom: 16px;
  opacity: ${({ hasEnd }) => (hasEnd ? 0.5 : 1)};
  cursor: ${({ hasEnd }) => (hasEnd ? '' : 'pointer')};
  padding: 15px 0;
  font-size: 12px;
  background-image: url('/assets/fallback_images/image-404040.png');
  background-repeat: no-repeat;
  background-size: ${({ progress }) =>
    progress && progress > 0 ? `${progress}% 100%` : 0};
  display: flex;
  flex-direction: row;
`;

const ScheduleItemWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const ScheduleEventNameStyled = styled.div`
  font-family: Saira, Helvetica Neue, sans-serif;
  font-size: 16px;
  margin: 0px;
  font-weight: 600;
`;

const ScheduleTime = styled.span`
  &:before {
    margin: 10px 0px;
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

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 24px;
`;

const TextMaster = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #fcfcfc;
`;

const RightArrow = styled.img`
  height: 11px;
  width: 11px;
`;

const Icon = styled.img`
  animation: pulsate 2s both infinite;
  @keyframes pulsate {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
`;

const NameLiveContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 15px;
`;

type CardScheduleProps = {
  style?: React.CSSProperties;
  name: string;
  martialArts: string;
  start?: string;
  end?: string;
  description: string;
  masterName: string;
  isLive?: boolean;
  startTime: { hours: number; minutes: number };
  endTime: { hours: number; minutes: number };
  onClickCard: () => void;
  instructor: string;
  hasEnd?: boolean;
  isInFuture?: boolean;
  hasEndDim?: boolean;
  schoolCurrentTime?: any;
};

const ScheduleCard: React.FC<CardScheduleProps> = ({
  name,
  martialArts,
  start,
  end,
  description,
  masterName,
  startTime,
  endTime,
  onClickCard,
  instructor,
  hasEnd,
  isLive,
  style,
  isInFuture = false,
  hasEndDim = false,
  schoolCurrentTime,
}): JSX.Element => {
  const liveTime = useLiveRemoteTime(schoolCurrentTime);
  const currentHours = new Date(liveTime || '').getHours();
  const current = new Date(liveTime || '').getMinutes();

  const classDuration =
    (endTime.hours - startTime.hours) * 60 +
    (endTime.minutes - startTime.minutes);

  const ongoing =
    isInFuture || hasEnd
      ? false
      : currentHours <= endTime.hours && currentHours >= startTime.hours;

  const progress = ongoing
    ? classDuration -
      ((endTime.hours - currentHours) * 60 + (endTime.minutes - current))
    : null;

  const progressBar = ongoing ? (progress / classDuration) * 100 : 0;

  return (
    <>
      <ScheduleItem
        style={{
          ...style,
        }}
        hasEnd={(hasEnd && !isLive) || (hasEnd && hasEndDim)}
        progress={progressBar}
        onClick={() => {
          onClickCard();
        }}
      >
        <AvatarContainer>
          <UserAvatar disableClick username={instructor} avatarDimension={64} />
        </AvatarContainer>
        <ScheduleItemWrapper>
          <NameLiveContainer>
            <ScheduleEventNameStyled>{name}</ScheduleEventNameStyled>
            {ongoing && isLive && !hasEnd ? (
              <Icon src="/assets/icons/live.svg" />
            ) : null}
          </NameLiveContainer>
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
              <TextTime>
                {start}
                {'  '}
                <RightArrow src="/assets/icons/right-arrow.svg" />
                {'  '}
                {end}
              </TextTime>
            </Item>
          </ScheduleTime>
          <ScheduleOpacity>{description}</ScheduleOpacity>
          <TextMaster>{masterName}</TextMaster>
        </ScheduleItemWrapper>
      </ScheduleItem>
    </>
  );
};

export default ScheduleCard;
