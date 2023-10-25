import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import ActivityCard from './components/ActivityCard';
import BottomNavBar from '../bottom-nav/BottomNav';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { ActivityTabs } from './components/ActivityTabs';
import {
  ActivityContainer,
  // LoadMoreButton,
  // LoadMoreText,
  ActivityTabsWrapper,
  TextCheckInCount,
  TextCheckIns,
  TextRecentActivity,
  TextTotalTime,
  ArrowBackIcon,
} from './components/styled.activty';
import { ActivityDetailsModal } from './components/ActivityDetailsModal';
import { useAppDispatch } from '../../redux/hooks';
import {
  useCheckIns,
  useCheckInsLoading,
} from '../../redux/slices/checkInsSlice';
import { CheckIns as CheckInsType } from '../../shared/models/CheckIns';
import { getCheckIns } from '../../redux/thunk/checkIns';
import ModalOverlay from '../modal-overlay';
import HeaderDojo from '../headers/HeaderDojo';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';

const secondsToHoursString: (sec: number) => string = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor((sec % 3600) % 60);
  return `${h || '00'}:${m || '00'}:${s || '00'}`;
};

const nearestDayDate: (weekday: string, createdTime: string) => string = (
  weekday,
  createdTime,
) => {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const createdWeekday = new Date(createdTime).getDay();
  const comingWeekday = weekDays.indexOf(weekday);
  const weekdayDiff = createdWeekday - comingWeekday;
  const weekdayToShow =
    // eslint-disable-next-line no-nested-ternary
    weekdayDiff === 0
      ? dayjs(createdTime)
      : weekdayDiff > 0
        ? dayjs(createdTime).subtract(1, 'day')
        : dayjs(createdTime).add(1, 'day');
  return weekdayToShow.toISOString();
};

export const ActiviyDetails: React.FC = () => {
  const { query, back } = useRouter();
  const { authUser } = useFirebaseAuth();
  const dispatch = useAppDispatch();

  const activityData: CheckInsType[] = useCheckIns();
  const checkInsLoading = useCheckInsLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<CheckInsType>();

  const { t } = useTranslation();
  const CheckIns = t('CheckIns');
  const Time = t('Time');
  const RecentActivity = t('RecentActivity');
  // const LoadMoreActivities = t('LoadMoreActivities');

  const slug = query?.slots;
  const username = String(query?.username);
  const currentTab = (slug as string) || '';
  let totalTime = 0;
  activityData?.forEach((activity) => {
    totalTime += parseFloat(activity.classDurationFromClassId);
  });

  useEffect(() => {
    if (username && currentTab) {
      dispatch(getCheckIns({ username, currentTab }));
    }
  }, [username, currentTab, dispatch]);

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Section>
      <HeaderDojo
        title="Activity"
        IconLeft={<ArrowBackIcon src="/assets/icons/back-arrow.svg" />}
        onIconLeftCLick={() => back()}
      />
      <MainProfile>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 65,
          }}
          notGutters
          isFlexGrow>
          <ActivityTabsWrapper>
            <TabContext value={currentTab}>
              <ActivityTabs username={username as string} />
            </TabContext>
          </ActivityTabsWrapper>
          {checkInsLoading ? (
            <CircularProgress size={20} style={{ marginTop: 60 }} />
          ) : (
            <>
              <TextCheckInCount>{activityData.length}</TextCheckInCount>
              <TextCheckIns>{CheckIns}</TextCheckIns>
              <TextTotalTime>{secondsToHoursString(totalTime)}</TextTotalTime>
              <TextCheckIns>{Time}</TextCheckIns>
              <ActivityContainer>
                {activityData?.length ? (
                  <>
                    <TextRecentActivity>{RecentActivity}</TextRecentActivity>
                    {[...activityData]
                      ?.sort(
                        (a, b) =>
                          +new Date(b.createdTime) - +new Date(a.createdTime),
                      )
                      ?.map((activity) => {
                        const classDuration =
                          parseInt(activity.classDurationFromClassId) / 60;
                        return (
                          <ActivityCard
                            key={activity?.id}
                            name={activity?.classNameFromClassName}
                            martialArts={activity?.martialArtsLinkFromClassId}
                            duration={`${classDuration} min`}
                            date={new Date(
                              nearestDayDate(
                                activity.weekdayFromClassId?.[0],
                                activity.createdTime,
                              ),
                            ).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                            onClickCard={() => {
                              setSelectedActivity(activity);
                              handleModal();
                            }}
                            schoolLogo={
                              activity?.schoolLogoFromSchoolLinkFromClassId?.[0]
                                ?.url
                            }
                          />
                        );
                      })}
                  </>
                ) : (
                  <ProfileTabEmptyMessage value="No activities to show." />
                )}
                {/* <LoadMoreButton>
                  <LoadMoreText>{LoadMoreActivities}</LoadMoreText>
                </LoadMoreButton> */}
              </ActivityContainer>
            </>
          )}
          {authUser && <BottomNavBar />}
        </Container>
        <ModalOverlay
          open={isModalVisible}
          color="#282828"
          onCloseClick={handleModal}>
          <ActivityDetailsModal
            data={selectedActivity}
            handleModal={handleModal}
          />
        </ModalOverlay>
      </MainProfile>
    </Section>
  );
};
