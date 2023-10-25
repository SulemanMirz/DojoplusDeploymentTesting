import React, { useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import styled from 'styled-components';
import { Calendar, DayDataType } from '../../calendar/Calendar';
import { StepContainer } from '../components/StepContainer';

const CalendarContainer = styled.div`
  margin-top: 110px;
`;

type StepProps = {
  setSelected: (data: Date) => void;
  style?: React.CSSProperties;
};

const Step5: React.FC<StepProps> = ({ setSelected, style }): JSX.Element => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [current, setCurrent] = useState<Dayjs>();

  const onChange = useCallback(
    (value: DayDataType) => {
      const selectedDay = dayjs(value.date);
      setCurrent(selectedDay);
      setSelected(new Date(selectedDay.toISOString()));
    },
    [setSelected],
  );

  return (
    <StepContainer>
      <CalendarContainer style={{ ...style }}>
        <Calendar
          current={current}
          dateList={weekdays.map((day) => day.toLowerCase())}
          onClick={onChange}
          selectFromPast
        />
      </CalendarContainer>
    </StepContainer>
  );
};

export default Step5;
