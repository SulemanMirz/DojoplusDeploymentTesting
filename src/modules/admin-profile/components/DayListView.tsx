import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Button, CircularProgress } from '@mui/material';
import { useScrollTo } from 'react-use-window-scroll';

import { TextWhite18UppercaseRegular } from '../../../shared/components/texts';
import { useOnScreen } from '../../../shared/hooks/UseOnScreen';
import { dayEvent } from '../schedule-store';
import { Schedule } from '../../../shared/models/school.model';
import AdminScheduleCard from './AdminScheduleCard';
import { wideButtonStylesTransparent } from '../../../shared/styles/Button-style';
import ModalOverlay from '../../modal-overlay';
import AddTimeTableScheduleModal from './AddTimeTableScheduleModal';
import { formattedUTCHours } from '../../../shared/utils/checkins-utils';
import HeaderDojo from '../../headers/HeaderDojo';
import { useFireBaseAuth } from '../../../context/FirebaseContext';

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

const H2 = styled.div`
  font-family: Saira, Helvetica Neue, sans-serif;
  padding-top: 32px;
  padding-bottom: 16px;
  font-size: 2rem;
  line-height: 20px;
  font-weight: 600;
  margin: 0;
`;

const Icon = styled.img`
  height: 14px;
  width: 14px;
`;

const ArrowBackIcon = styled.img``;

const AddIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

const LoadingWrapper = styled.div`
  height: '24px';
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 3;
  background-color: rgb(40, 40, 40);
  transition: all ease-in-out 1s;
`;

type ListViewProps = {
  scheduleSchool: Schedule[];
  zoneTime: string | undefined;
};

const DayListView: React.FC = (): JSX.Element => {
  const [selectedSchoolData, setSelectedSchoolData] = useState<Schedule>();
  const [initialData, setInitialData] = useState<ListViewProps>();
  const [slugData, setSlugData] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkBoxFilter, setCheckBoxFilter] = useState<Schedule[]>();
  const [isModeEdit, setIsModeEdit] = useState(false);
  const [schoolCurrentTime, setSchoolCurrentTime] = useState(
    initialData?.zoneTime,
  );
  const [isLoading, setIsLoading] = useState(true);

  const schedules = initialData?.scheduleSchool;
  const router = useRouter();
  const { schoolInfo } = useFireBaseAuth();

  const RefreshTimeTableData = (): void => {
    setIsLoading(true);
    axios
      .get('/api/Timetable', {
        params: {
          schoolsSlug: schoolInfo?.slug,
        },
      })
      .then((res) => {
        setSchoolCurrentTime(res?.data?.zoneTime);
        setInitialData(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    RefreshTimeTableData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolInfo?.slug]);

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

  const scheduleDayData = timeTables?.[0]?.schedules;

  const scrollTo = useScrollTo();

  const scroll = (value: string): void => {
    if (document.getElementById(value) === null) return;
    scrollTo({
      top: document.getElementById(value).offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const dayWeek = new Date(schoolCurrentTime).toLocaleString('en-us', {
    weekday: 'long',
  });

  useEffect(() => {
    scroll(dayWeek.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleDayData?.length]);

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

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const indexWeekDay = days.indexOf(dayWeek);
  const myRef = useRef<HTMLHeadingElement>(null);

  const EditModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  const getSchoolsSlug = (): void => {
    axios
      .get('/api/Timetable/schoolSlug', {
        params: {
          slug: schoolInfo?.slug,
        },
      })
      .then((res) => {
        setSlugData(res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (schoolInfo) {
      getSchoolsSlug();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolInfo]);

  return (
    <>
      <HeaderDojo
        title="Timetable"
        IconLeft={<ArrowBackIcon src="/assets/icons/back-arrow.svg" />}
        IconRight={<AddIcon src="/assets/icons/plus-icon.svg" />}
        onIconLeftCLick={() => router.back()}
        onIconRightClick={() => {
          EditModal();
          setIsModeEdit(false);
        }}
      />

      <>
        <Content>
          {timeTables.map((timeTable, i) => (
            <>
              {i === 0 && <div style={{ marginTop: '65px' }} />}
              <div ref={timeTable?.ref} id={timeTable?.id}>
                <div ref={dayWeek === timeTable?.day ? myRef : null} />
                <H2>{timeTable.day}</H2>
                {timeTable?.schedules && timeTable?.schedules?.length === 0 && (
                  <div id={timeTable?.id} className="schedule-space-gap">
                    <TextWhite18UppercaseRegular>
                      {textNoEvent}
                    </TextWhite18UppercaseRegular>
                  </div>
                )}
                {timeTable.schedules?.map((val) => {
                  const currentHours = new Date(
                    schoolCurrentTime || '',
                  ).getHours();
                  const current = new Date(
                    schoolCurrentTime || '',
                  ).getMinutes();
                  const endTime = {
                    hours: new Date((val?.timeEnd || 0) * 1000).getUTCHours(),
                    minutes: new Date(
                      (val?.timeEnd || 0) * 1000,
                    ).getUTCMinutes(),
                  };
                  const startTime = {
                    hours: new Date((val?.timeStart || 0) * 1000).getUTCHours(),
                    minutes: new Date(
                      (val?.timeStart || 0) * 1000,
                    ).getUTCMinutes(),
                  };
                  const hasEndHours = endTime?.hours < currentHours;
                  const hasEnd = hasEndHours
                    ? true
                    : endTime?.hours <= currentHours &&
                      endTime?.minutes <= current;

                  const hasEndWeekDay =
                    indexWeekDay > days?.indexOf(val?.weekday);

                  const isInFuture = indexWeekDay < days?.indexOf(val?.weekday);
                  return (
                    <>
                      <AdminScheduleCard
                        isLive
                        key={val?.id}
                        name={val?.className}
                        start={formattedUTCHours(
                          val?.timeStart,
                          val?.countryFromSchoolLink?.[0],
                        )}
                        end={formattedUTCHours(
                          val?.timeEnd,
                          val?.countryFromSchoolLink?.[0],
                        )}
                        description={val?.room}
                        masterName={
                          val?.instructorLookup && String(val?.instructorLookup)
                        }
                        startTime={startTime}
                        endTime={endTime}
                        instructor={val?.usernameFromInstructorLink?.[0]}
                        schoolCurrentTime={schoolCurrentTime?.toString()}
                        hasEnd={(hasEndWeekDay || hasEnd) && !isInFuture}
                        isInFuture={isInFuture}
                        EditModalData={() => {
                          EditModal();
                          setIsModeEdit(true);
                          setSelectedSchoolData(val);
                          const filterData =
                            initialData?.scheduleSchool?.filter(
                              (sch) => sch?.className === val?.className,
                            );
                          setCheckBoxFilter(filterData);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </>
          ))}
          <ButtonWrapper>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                EditModal();
                setIsModeEdit(false);
              }}
              style={{ marginBottom: '0px' }}
              sx={wideButtonStylesTransparent}
              startIcon={<Icon src="/assets/icons/plus-icon.svg" />}>
              Add TimeTable Item
            </Button>
          </ButtonWrapper>
        </Content>

        <ModalOverlay
          title={isModeEdit ? 'Edit Class' : 'Add Class'}
          open={isModalVisible}
          height="100%"
          onCloseClick={EditModal}>
          <AddTimeTableScheduleModal
            schoolLink={slugData?.[0]?.id}
            data={isModeEdit && selectedSchoolData}
            checkBoxFilter={isModeEdit ? checkBoxFilter : []}
            isModeEdit={isModeEdit}
            closeModal={EditModal}
            RefreshTimeTableData={RefreshTimeTableData}
          />
        </ModalOverlay>
      </>
      {(isLoading || !initialData || !timeTables?.[0]?.schedules) && (
        <LoadingWrapper>
          <CircularProgress
            sx={{
              zIndex: 4,
            }}
            color="primary"
            size={20}
          />
        </LoadingWrapper>
      )}
    </>
  );
};

export default DayListView;
