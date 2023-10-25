import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import CardSchedule from './components/card-schedule';
import { TextWhite18UppercaseRegular } from '../../shared/components/texts';
import { useOnScreen } from '../../shared/hooks/UseOnScreen';
import { dayEvent } from './shcedule-store';
import { Schedule, SchoolSchedules } from '../../shared/models/school.model';

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
`;

const H2 = styled.h1`
  font-family: Saira, Helvetica Neue, sans-serif;
  padding-top: 5rem;
  padding-bottom: 1.75rem;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin: 0;
`;

type ListViewProps = {
  initialData?: SchoolSchedules;
};

const ListView: React.FC<ListViewProps> = ({ initialData }): JSX.Element => {
  const schedules = initialData.scheduleSchool;

  const getSchedulesForDay = (day: string): Schedule[] | undefined => {
    return schedules
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

  return (
    <Content>
      {timeTables.map((timeTable, i) => (
        <>
          {i === 0 && <div style={{ marginTop: '65px' }} />}
          <div ref={timeTable.ref} id={timeTable.id} style={{}}>
            <H2>{timeTable.day}</H2>
            {timeTable.schedules && timeTable.schedules.length === 0 && (
              <div id={timeTable.id} className="schedule-space-gap">
                <TextWhite18UppercaseRegular>
                  {textNoEvent}
                </TextWhite18UppercaseRegular>
              </div>
            )}
            {timeTable.schedules?.map((schedule) => (
              <CardSchedule
                key={schedule.id}
                name={schedule.className}
                martialArts={
                  schedule.martialArtLookup ? schedule.martialArtLookup[0] : ''
                }
                time={`${new Date(
                  (schedule.timeStart || 0) * 1000,
                ).getUTCHours()}:${
                  new Date((schedule.timeStart || 0) * 1000).getUTCMinutes() ||
                  '00'
                } → ${new Date((schedule.timeEnd || 0) * 1000).getUTCHours()}:${
                  new Date((schedule.timeEnd || 0) * 1000).getUTCMinutes() ||
                  '00'
                }`}
                description={schedule.room}
                fightName={
                  schedule.instructorLookup ? schedule.instructorLookup[0] : ''
                }
              />
            ))}
          </div>
        </>
      ))}
      <div style={{ marginTop: '100vh' }} />
    </Content>
  );
};

export default ListView;
