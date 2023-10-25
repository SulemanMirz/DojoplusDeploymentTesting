import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { TextWhite18UppercaseRegular } from '../../../shared/components/texts';
import { useOnScreen } from '../../../shared/hooks/UseOnScreen';
import { dayEvent } from '../../schedule/shcedule-store';
import { Schedule } from '../../../shared/models/school.model';
import ScheduleCard from '../../check-ins/components/ScheduleCard';
import { formattedUTCHours } from '../../../shared/utils/checkins-utils';
import useLiveRemoteTime from '../../../shared/hooks/useLiveRemoteTime';

dayjs.extend(customParseFormat);

const Content = styled(Box)`
  width: 100%;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  padding-bottom: 120px;
  padding-left: 16px;
  min-height: calc(100vh - 300px);
  max-height: calc(100vh - 285px);
`;

const H2 = styled.h1`
  font-family: Saira, Helvetica Neue, sans-serif;
  padding-top: 32px;
  padding-bottom: 10px;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin: 0;
`;

type SchedulesProfileProps = {
  scheduleData?: { classData: Schedule[]; zoneTime: Date };
};

const SchedulesProfile: React.FC<SchedulesProfileProps> = ({
  scheduleData,
}): JSX.Element => {
  const getSchedulesForDay = (day: string): Schedule[] | undefined => {
    return scheduleData?.classData
      ?.filter((node) =>
        node.weekday?.toLowerCase().includes(day.toLowerCase()),
      )
      .sort((firstNode, secondNode) => {
        return firstNode.timeStart - secondNode.timeStart;
      });
  };

  const mondaySchedules = getSchedulesForDay('Monday');
  const tuesdaySchedules = getSchedulesForDay('Tuesday');
  const wednesdaySchedules = getSchedulesForDay('Wednesday');
  const thursdaySchedules = getSchedulesForDay('Thursday');
  const fridaySchedules = getSchedulesForDay('Friday');
  const saturdaySchedules = getSchedulesForDay('Saturday');
  const SundaySchedules = getSchedulesForDay('Sunday');

  const mon = useRef<HTMLHeadingElement>();
  const tue = useRef<HTMLHeadingElement>();
  const wed = useRef<HTMLHeadingElement>();
  const thu = useRef<HTMLHeadingElement>();
  const fri = useRef<HTMLHeadingElement>();
  const sat = useRef<HTMLHeadingElement>();
  const sun = useRef<HTMLHeadingElement>();

  const isVisibleMon = useOnScreen(mon);
  const isVisibleTue = useOnScreen(tue);
  const isVisibleWed = useOnScreen(wed);
  const isVisibleThu = useOnScreen(thu);
  const isVisibleFri = useOnScreen(fri);
  const isVisibleSat = useOnScreen(sat);
  const isVisibleSun = useOnScreen(sun);

  useEffect(() => {
    if (isVisibleMon) {
      dayEvent.dispatch('monday');
      return;
    }
    if (isVisibleTue) {
      dayEvent.dispatch('tuesday');
      return;
    }
    if (isVisibleWed) {
      dayEvent.dispatch('wednesday');
      return;
    }
    if (isVisibleThu) {
      dayEvent.dispatch('thursday');
      return;
    }
    if (isVisibleFri) {
      dayEvent.dispatch('friday');
      return;
    }
    if (isVisibleSat) {
      dayEvent.dispatch('saturday');
      return;
    }
    if (isVisibleSun) {
      dayEvent.dispatch('sunday');
    }
  }, [
    isVisibleFri,
    isVisibleMon,
    isVisibleSat,
    isVisibleSun,
    isVisibleThu,
    isVisibleTue,
    isVisibleWed,
  ]);

  const { t } = useTranslation();
  const textMonday = t('monday');
  const textTuesday = t('tuesday');
  const textWednesday = t('wednesday');
  const textThursday = t('thursday');
  const textFriday = t('friday');
  const textSaturday = t('saturday');
  const textSunday = t('sunday');
  const textNoEvent = t('NoEvents');

  const timeTables = [
    {
      id: 'monday',
      day: textMonday,
      schedules: mondaySchedules,
      ref: mon,
    },
    {
      id: 'tuesday',
      day: textTuesday,
      schedules: tuesdaySchedules,
      ref: tue,
    },
    {
      id: 'wednesday',
      day: textWednesday,
      schedules: wednesdaySchedules,
      ref: wed,
    },
    {
      id: 'thursday',
      day: textThursday,
      schedules: thursdaySchedules,
      ref: thu,
    },
    {
      id: 'friday',
      day: textFriday,
      schedules: fridaySchedules,
      ref: fri,
    },
    {
      id: 'saturday',
      day: textSaturday,
      schedules: saturdaySchedules,
      ref: sat,
    },
    {
      id: 'sunday',
      day: textSunday,
      schedules: SundaySchedules,
      ref: sun,
    },
  ];

  const [schoolCurrentTime] = useState(scheduleData?.zoneTime);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const liveTime = useLiveRemoteTime(schoolCurrentTime);
  const dayWeek = new Date(liveTime).toLocaleString('en-us', {
    weekday: 'long',
  });

  const indexDayWeek = days.indexOf(dayWeek);
  const myRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (myRef?.current) {
      myRef?.current?.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [myRef]);

  return (
    <Content>
      <>
        {timeTables.map((timeTable) => (
          <>
            <div ref={timeTable.ref} id={timeTable.id}>
              <div ref={dayWeek === timeTable.day ? myRef : null} />
              <H2>{timeTable.day}</H2>
              {timeTable.schedules && timeTable.schedules.length === 0 && (
                <div id={timeTable.id} className="schedule-space-gap">
                  <TextWhite18UppercaseRegular>
                    {textNoEvent}
                  </TextWhite18UppercaseRegular>
                </div>
              )}
              {timeTable.schedules?.map((val) => {
                const endTime = {
                  hours: new Date((val.timeEnd || 0) * 1000).getUTCHours(),
                  minutes: new Date((val.timeEnd || 0) * 1000).getUTCMinutes(),
                };
                const startTime = {
                  hours: new Date((val.timeStart || 0) * 1000).getUTCHours(),
                  minutes: new Date(
                    (val.timeStart || 0) * 1000,
                  ).getUTCMinutes(),
                };

                const isInFuture = indexDayWeek < days.indexOf(val?.weekday);

                const currentHours = new Date(indexDayWeek || '').getHours();
                const hasEndHours = endTime?.hours < currentHours;

                const current = new Date(indexDayWeek || '').getMinutes();
                const hasEnd = hasEndHours
                  ? true
                  : endTime?.hours <= currentHours &&
                    endTime.minutes <= current;

                const hasEndWeekDay = indexDayWeek > days.indexOf(val?.weekday);

                const hasNextClasses =
                  indexDayWeek < days.indexOf(val?.weekday);

                return (
                  <ScheduleCard
                    isLive
                    onClickCard={() => {}}
                    key={val.id}
                    name={val.className}
                    martialArts={val.martialArtsLink}
                    start={formattedUTCHours(
                      val.timeStart,
                      val?.countryFromSchoolLink?.[0],
                    )}
                    end={formattedUTCHours(
                      val.timeEnd,
                      val?.countryFromSchoolLink?.[0],
                    )}
                    description={val.room}
                    masterName={
                      val.instructorLookup && String(val.instructorLookup)
                    }
                    startTime={startTime}
                    endTime={endTime}
                    instructor={val.instructorLink}
                    schoolCurrentTime={schoolCurrentTime}
                    hasEnd={(hasEndWeekDay || hasEnd) && !hasNextClasses}
                    isInFuture={isInFuture}
                  />
                );
              })}
            </div>
          </>
        ))}
      </>

      <div style={{ marginTop: '100vh' }} />
    </Content>
  );
};

export default SchedulesProfile;
