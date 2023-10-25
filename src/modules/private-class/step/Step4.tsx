/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import { TextWhite16CapitalizeThin } from '../../../shared/components/texts';
import { PrivateClass as PrivateClassType } from '../../../shared/types/generated';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';
import { PrivateClasses } from '../../../shared/models/user.model';

const TimeText = styled(TextWhite16CapitalizeThin)`
  font-size: 12px;
`;

const Item = styled('div')`
  width: 100%;
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const BoxItem = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid rgba(79, 79, 79, 1);
  margin-bottom: 5px;
`;

const GridStyled = styled(Grid)`
  margin-top: 44px;
`;

const Icon = styled(CheckIcon)`
  font-size: 11px;
  position: absolute;
  right: 12px;
`;

const TIME_DEFAULT_LIST = [
  {
    time: 'Morning',
    hours: [
      { text: '6:00 AM', value: '06' },
      { text: '7:00 AM', value: '07' },
      { text: '8:00 AM', value: '08' },
      { text: '9:00 AM', value: '09' },
      { text: '10:00 AM', value: '10' },
      { text: '11:00 AM', value: '11' },
    ],
  },
  {
    time: 'Afternoon',
    hours: [
      { text: '12:00 PM', value: '12' },
      { text: '1:00 PM', value: '13' },
      { text: '2:00 PM', value: '14' },
      { text: '3:00 PM', value: '15' },
      { text: '4:00 PM', value: '16' },
      { text: '5:00 PM', value: '17' },
    ],
  },
  {
    time: 'Evening',
    hours: [
      { text: '6:00 PM', value: '18' },
      { text: '7:00 PM', value: '19' },
      { text: '8:00 PM', value: '20' },
      { text: '9:00 PM', value: '21' },
      { text: '10:00 PM', value: '22' },
    ],
  },
];

type HourType = {
  text: string;
  value: string;
  isHourTaken: boolean;
};

type TimeListType = {
  time: string;
  hours: HourType[];
  isEmptyHours?: boolean;
};

type StepProps = {
  classes: PrivateClasses[];
  data: PrivateClassType;
  date: string;
  timeZone: string;
  setSelected?: (data: string) => void;
};

const Step4: React.FC<StepProps> = ({
  classes,
  data,
  date,
  timeZone,
  setSelected,
}): JSX.Element => {
  const slots = classes.map((privateClass) => ({
    startTime: privateClass.startTime,
    endTime: privateClass.endTime,
  }));
  
  const router = useRouter();
  const { username } = router.query;
  const day = dayjs(date).format('dddd - MMMM DD, YYYY');
  const { t } = useTranslation();
  const AvailableTime = t('AvailableTime');
  const [timeList, setTimeList] = useState<TimeListType[]>([]);
  const [purchasedDates, setPurchasedDates] = useState<
    { classDateTime: string | null | undefined }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState({
    name: '',
    selected: null,
    value: null,
  });
  useEffect(() => {
    axios('/api/PrivateClasses', {
      params: {
        bookings: true,
        username,
      },
    }).then((res) => {
      setPurchasedDates(
        res.data.filter((slot) => {
          const date1 = dayjs(dayjs(slot.classDateTime).format('YYYY-MM-DD'));
          const date2 = dayjs(dayjs(date).format('YYYY-MM-DD'));
          const hours = date2.diff(date1, 'hours');
          const days = Math.floor(hours / 24);
          return days === 0;
        }),
      );
      setLoading(false);
    });
  }, [username, date]);

  const onResponseGetCllassInDay = (
    response: { classDateTime: string | null | undefined }[],
  ): void => {
    const list: TimeListType[] = [];
    let hoursList: string[] = [];
    const currentStartTimeTaken = response.map((e) =>
      dayjs(e.classDateTime.split('.')[0]).format('HH'),
    );
    for (let c1 = 0; c1 < slots.length; c1 += 1) {
      let start = dayjs(date)
        .set('hour', slots[c1].startTime / 3600)
        .set('minute', 0);
      const end = dayjs(date)
        .set('hour', slots[c1].endTime / 3600)
        .set('minute', 0);
      while (start.hour() < end.hour()) {
        hoursList.push(start.format('HH'));
        start = start.add(1, 'hour');
      }
    }
    hoursList = [...Array.from(new Set(hoursList))];

    TIME_DEFAULT_LIST.forEach((time) => {
      const hours: HourType[] = [];
      time.hours.forEach((hour) => {
        const isIncludeHour = hoursList.includes(hour.value);
        const isHourTaken = currentStartTimeTaken.includes(hour.value);
        if (isIncludeHour) {
          hours.push({ ...hour, isHourTaken });
        }
      });
      list.push({
        time: time.time,
        hours,
        isEmptyHours: hours?.length === 0,
      });
    });
    setTimeList(list);
  };

  useEffect(() => {
    if (purchasedDates) {
      onResponseGetCllassInDay(purchasedDates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasedDates]);

  return (
    <StepContainer>
      <StepTitle
        title={`${AvailableTime} ${day}`}
        subTitle={`Timezone: ${timeZone}`}
      />
      {loading ? (
        <Box component="div" display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <GridStyled container spacing={2}>
          {timeList.map((time) => (
            <Grid item xs={4}>
              <Item>{time.time}</Item>
              {time.hours.map((hour) => (
                <BoxItem
                  key={hour.value}
                  style={{
                    cursor: 'pointer',
                    ...(hour.isHourTaken && {
                      opacity: 0.5,
                      pointerEvents: 'none',
                    }),
                  }}
                  onClick={() => {
                    const currentDate = dayjs(date).format('MM/DD/YYYY');
                    setSelected(
                      dayjs(`${currentDate} ${hour.value}:00`).format(
                        'YYYY-MM-DD HH:mm:ss',
                      ),
                    );
                    setActive({
                      name: 'morning',
                      selected: hour.value,
                      value: hour.value,
                    });
                  }}>
                  <TimeText>{hour.text}</TimeText>
                  {active.selected === hour.value && <Icon />}
                </BoxItem>
              ))}
            </Grid>
          ))}
        </GridStyled>
      )}
    </StepContainer>
  );
};

export default Step4;
