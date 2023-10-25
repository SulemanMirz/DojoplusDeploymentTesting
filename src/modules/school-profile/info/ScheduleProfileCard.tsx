import React, { useState } from 'react';
import styled from 'styled-components';
import { Schedule } from '../../../shared/models/school.model';
import { formattedUTCHours } from '../../../shared/utils/checkins-utils';
import ScheduleCard from '../../check-ins/components/ScheduleCard';
import useLiveRemoteTime from '../../../shared/hooks/useLiveRemoteTime';

const Container = styled.div`
  margin-top: 49px;
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  @media screen and (min-width: 700px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ScheduleCardContainer = styled.div`
  width: 338px;
  min-width: 338px;
  margin-top: 10px;
`;

const ScheduleCardTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;

type ScheduleProfileCardProps = {
  scheduleData: { classData: Schedule[]; zoneTime: Date };
};

const ScheduleProfileCard: React.FC<ScheduleProfileCardProps> = ({
  scheduleData,
}) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const sortedClasses = days
    .map((day) => {
      const temp = [];
      temp.push(
        ...scheduleData?.classData
          ?.filter((cls) => day === cls?.weekday)
          ?.sort((a, b) => a?.timeStart - b?.timeStart),
      );
      return temp;
    })
    .flat(1);

  const [schoolCurrentTime] = useState(scheduleData.zoneTime);

  const liveTime = useLiveRemoteTime(schoolCurrentTime);
  const dayWeek = new Date(liveTime).toLocaleString('en-us', {
    weekday: 'long',
  });

  const indexDayWeek = days.indexOf(dayWeek);

  return (
    <Container>
      {scheduleData.classData.length > 0 && (
        <>
          <ScheduleCardTitle>Schedule</ScheduleCardTitle>
          <CardContainer>
            {sortedClasses?.map((data) => {
              const startTime = {
                hours: new Date((data.timeStart || 0) * 1000).getUTCHours(),
                minutes: new Date((data.timeStart || 0) * 1000).getUTCMinutes(),
              };
              const endTime = {
                hours: new Date((data.timeEnd || 0) * 1000).getUTCHours(),
                minutes: new Date((data.timeEnd || 0) * 1000).getUTCMinutes(),
              };

              const currentHours = new Date(indexDayWeek || '').getHours();
              const hasEndHours = endTime?.hours < currentHours;

              const current = new Date(indexDayWeek || '').getMinutes();
              const hasEnd = hasEndHours
                ? true
                : endTime?.hours <= currentHours && endTime.minutes <= current;

              const isInFuture = indexDayWeek < days.indexOf(data?.weekday);

              const hasEndWeekDay = indexDayWeek > days.indexOf(data?.weekday);

              const hasNextClasses = indexDayWeek < days.indexOf(data?.weekday);

              return (
                <ScheduleCardContainer key={data?.id}>
                  <ScheduleCard
                    style={{
                      height: '100%',
                      alignItems: 'center',
                    }}
                    isLive
                    onClickCard={() => {}}
                    key={data.id}
                    name={data.className}
                    martialArts={data.martialArtsLink}
                    start={formattedUTCHours(
                      data.timeStart,
                      data?.countryFromSchoolLink?.[0],
                    )}
                    end={formattedUTCHours(
                      data.timeEnd,
                      data?.countryFromSchoolLink?.[0],
                    )}
                    description={data.room}
                    masterName={
                      data.instructorLookup && String(data.instructorLookup)
                    }
                    startTime={startTime}
                    endTime={endTime}
                    instructor={data.instructorLink}
                    schoolCurrentTime={schoolCurrentTime}
                    hasEnd={(hasEndWeekDay || hasEnd) && !hasNextClasses}
                    isInFuture={isInFuture}
                  />
                </ScheduleCardContainer>
              );
            })}
          </CardContainer>
        </>
      )}
    </Container>
  );
};

export default ScheduleProfileCard;
