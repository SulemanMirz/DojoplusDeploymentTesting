/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// import 'dayjs/locale/es';
// import 'dayjs/locale/pt';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarDays } from './components/CalendarDays';
import {
  CalendarDaysList,
  CalendarDaysItem,
} from './components/CalendarDaysList';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const INITIAL_YEAR = dayjs().format('YYYY');
const INITIAL_MONTH = dayjs().format('M');

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));

export type DayDataType = {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};

type CalendarProps = {
  dateList: string[];
  current?: Date | Dayjs;
  onClick: (date: DayDataType) => void;
  selectFromPast?: boolean | undefined;
};

export const Calendar: React.FC<CalendarProps> = ({
  dateList,
  onClick,
  current,
  selectFromPast,
}) => {
  const [selectedMonth, setSelectedMounth] = useState('');
  const [days, setDays] = useState<DayDataType[]>([]);

  const { t } = useTranslation();
  const local = t('local');

  const week = dayjs().locale(local);
  const WEEKDAYS = [
    week.day(1).format('ddd'),
    week.day(2).format('ddd'),
    week.day(3).format('ddd'),
    week.day(4).format('ddd'),
    week.day(5).format('ddd'),
    week.day(6).format('ddd'),
    week.day(0).format('ddd'),
  ];

  const getWeekday = (date): number => {
    return dayjs(date).weekday();
  };

  const getNumberOfDaysInMonth = (year: string, month: string): number => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  };

  const createDaysForCurrentMonth = useCallback(
    (year: string, month: string): DayDataType[] => {
      return [...Array(getNumberOfDaysInMonth(year, month))].map(
        (day, index) => {
          const date = dayjs(`${year}-${month}-${index + 1}`).format(
            'YYYY-MM-DD',
          );
          return {
            date,
            dayOfMonth: index + 1,
            isCurrentMonth: true,
          };
        },
      );
    },
    [],
  );

  const createDaysForPreviousMonth = useCallback(
    (
      year: string,
      month: string,
      currentMountDays: DayDataType[],
    ): DayDataType[] => {
      const firstDayOfTheMonthWeekday = getWeekday(currentMountDays[0].date);

      const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(currentMountDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
              }`,
            ).format('YYYY-MM-DD'),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
          };
        },
      );
    },
    [],
  );

  const createDaysForNextMonth = useCallback(
    (
      year: string,
      month: string,
      currentMountDays: DayDataType[],
    ): DayDataType[] => {
      const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMountDays.length}`,
      );

      const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
          ).format('YYYY-MM-DD'),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
        };
      });
    },
    [],
  );

  const createCalendar = useCallback(
    (year = INITIAL_YEAR, month = INITIAL_MONTH) => {
      const InitialCurrentMountDays = createDaysForCurrentMonth(year, month);
      const InitialPreviousMonthDays = createDaysForPreviousMonth(
        year,
        month,
        InitialCurrentMountDays,
      );
      const InitialNextMonthDays = createDaysForNextMonth(
        year,
        month,
        InitialCurrentMountDays,
      );
      const initalDays = [
        ...InitialPreviousMonthDays,
        ...InitialCurrentMountDays,
        ...InitialNextMonthDays,
      ];

      setSelectedMounth(`${year}/${month}/01`);
      setDays(initalDays);
    },
    [
      createDaysForCurrentMonth,
      createDaysForPreviousMonth,
      createDaysForNextMonth,
      // local,
    ],
  );

  useEffect(() => {
    createCalendar();
  }, [createCalendar]);

  const onPressBackMonth = (): void => {
    const preMounth = dayjs(selectedMonth).subtract(1, 'month');
    createCalendar(preMounth.format('YYYY'), preMounth.format('M'));
  };

  const onPressNextMonth = (): void => {
    const preMounth = dayjs(selectedMonth).add(1, 'month');
    createCalendar(preMounth.format('YYYY'), preMounth.format('M'));
  };

  const isSelectDay = selectFromPast
    ? (date: string): boolean =>
      dateList?.includes(dayjs(date).format('dddd').toLowerCase()) &&
        dayjs(date) < dayjs()
    : (date: string): boolean =>
      dateList?.includes(dayjs(date).format('dddd').toLowerCase()) &&
        dayjs(date) > dayjs();

  const isCurrentDate = (date: string): boolean => dayjs().isSame(date, 'day');

  return (
    <Container>
      <CalendarHeader
        label={dayjs(selectedMonth).locale(local).format('MMMM YYYY')}
        onPressBack={onPressBackMonth}
        onPressNext={onPressNextMonth}
      />
      <CalendarDays days={WEEKDAYS} />
      <CalendarDaysList>
        {days.map((e) => {
          const isSelected = e.isCurrentMonth && isSelectDay(e.date);
          const isCurrent = isCurrentDate(e.date);
          const isCurrentSelected = current
            ? dayjs(current).isSame(e.date, 'day')
            : false;
          return (
            <CalendarDaysItem
              isCurrentSeleted={isCurrentSelected}
              isSelected={isSelected}
              isCurrent={isCurrent}
              isCurrentMount={e.isCurrentMonth}
              key={e.date}
              day={e.dayOfMonth}
              onClick={() => {
                if (!isSelected) {
                  return;
                }
                onClick(e);
              }}
            />
          );
        })}
      </CalendarDaysList>
    </Container>
  );
};
