import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';

import { Calendar, DayDataType } from '../../calendar/Calendar';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';
import { PrivateClasses } from '../../../shared/models/user.model';
import { getSameClasses } from '../../../shared/utils/private-class-utils';

const TextContainer = styled('div')(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(4),
  },
}));

type StepProps = {
  classes: PrivateClasses[];
  data: PrivateClasses;
  setSelected: (data: Date) => void;
};

const Step3: React.FC<StepProps> = ({
  data,
  setSelected,
  classes,
}): JSX.Element => {
  const weekdays = getSameClasses(classes, data)
    ?.map((privateClass) => privateClass.weekdays)
    .flat();
  const [current, setCurrent] = useState<Dayjs>();

  const onChange = useCallback(
    (value: DayDataType) => {
      const selectedDay = dayjs(value.date);
      setCurrent(selectedDay);
      setSelected(new Date(selectedDay.toISOString()));
    },
    [setSelected],
  );

  const { t } = useTranslation();
  const SelectDate = t('SelectDate');

  return (
    <StepContainer>
      <TextContainer>
        <StepTitle
          title={SelectDate}
          subTitle=" Timezone: Eastern Time Zone (EDT)"
        />
      </TextContainer>
      <Calendar
        current={current}
        dateList={weekdays.map((day) => day.toLowerCase())}
        onClick={onChange}
      />
    </StepContainer>
  );
};

export default Step3;
