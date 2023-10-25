import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TabContext from '@mui/lab/TabContext';
import { styled as styledMui } from '@mui/material/styles';
import TabPanel from '@mui/lab/TabPanel';
import router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import HeaderDojo from '../headers/HeaderDojo';
import SchoolInfo from './info/SchoolInfo';
import SchoolProfileTitle from './components/SchoolProfileTitle';
import SchoolTabs from './components/SchoolTabs';
import LeaderBoard from './components/LeaderBoard';
import Member from './components/Member';
import BottomNavBar from '../bottom-nav/BottomNav';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import {
  Plans,
  PlanSubscriber,
  SchoolRating,
  Schedule,
  School,
} from '../../shared/models/school.model';
import { Container } from '../../shared/components/layout/Container';
import SchedulesProfile from './schedules';
import SchoolPlans from './school-plans';
import ReviewSection from './review-section';
import { CheckIns } from '../../shared/models/CheckIns';
import { setReviewData, useSchoolReview } from '../../redux/slices/reviewSlice';
import { useAppDispatch } from '../../redux/hooks';
import { ClintSideImageProps } from './components/ClintSideImage';
import { SAFE_AREA_VIEW_PADDING_TOP } from '../../shared/styles/SafeAreaView';

const ClintSideImage = dynamic(() => import('./components/ClintSideImage'), {
  ssr: false,
}) as React.FC<ClintSideImageProps>;

const TabPanelItem = styledMui(TabPanel)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.backgroundLightGray.main,
  padding: theme.spacing(1, 0),
  overflowX: 'hidden',
  height: '100%',
}));

const Main = styled.div`
  height: 100%;
`;
const ImageContainer = styled.div<{ noGalleryData }>`
  z-index: 3;
  position: relative;
  display: flex;
  width: 100%;
  padding-top: ${({ noGalleryData }) =>
    noGalleryData ? `${SAFE_AREA_VIEW_PADDING_TOP}px` : '0px'};
  height: ${({ noGalleryData }) =>
    noGalleryData
      ? `calc( ${SAFE_AREA_VIEW_PADDING_TOP}px + 44px )`
      : `calc( ${SAFE_AREA_VIEW_PADDING_TOP}px + 80px )`};
  opacity: ${({ noGalleryData }) => (noGalleryData ? 0 : 0.6)};
`;

const Icon = styled.img``;

const WrapperTop = styled.div`
  padding-top: 20px;
  position: fixed;
  top: 0;
  background-color: #111111;
  width: 100%;
  z-index: 2;
`;

type SchoolProfileProps = {
  plansData: Plans[];
  schoolData: School;
  scheduleData: { classData: Schedule[]; zoneTime: Date };
  plansMembers: PlanSubscriber[];
  checkInsLeader: CheckIns[];
  reviewData: SchoolRating[];
};

const SchoolProfile: React.FC<SchoolProfileProps> = ({
  plansData,
  schoolData,
  scheduleData,
  plansMembers,
  checkInsLeader,
  reviewData,
}) => {
  const { query } = useRouter();
  const { authUser } = useFireBaseAuth();
  const tab = (query?.schoolSlug as string) || '';
  const { recordId } = schoolData;
  const topRef = useRef<HTMLHeadingElement>();
  const [mergeData, setMergeData] = useState<School>({
    ...schoolData,
  });

  const { schoolId } = query;
  const dispatch = useAppDispatch();
  const reviewsData = useSchoolReview(schoolId as string);
  const reviews = reviewsData?.reviewData;

  const displayNameInstructor =
    schoolData?.displayNameFromInstructor;
  const displayName2Instructor =
    schoolData?.displayName2FromInstructor;

  const mergedArray =
    displayNameInstructor?.map((item, index): PlanSubscriber => {
      return {
        id: String(index),
        usernameFromProfile: [item],
        displayNameFromProfile: [displayName2Instructor?.[index]],
        isCoach: true,
      };
    }) || [];

  useEffect(() => {
    if (topRef?.current && tab !== 'schedules')
      topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tab]);

  useEffect(() => {
    dispatch(
      setReviewData({
        slug: schoolId as string,
        data: reviewData,
      }),
    );
  }, [dispatch, reviewData, schoolId]);

  const totalCount = reviews?.reduce((total, dataReview) => {
    return total + dataReview?.rating;
  }, 0);

  const rating = parseFloat((totalCount / reviews?.length).toFixed(1));

  const mergePlansMembres = plansMembers?.concat([...mergedArray]);

  const getSchoolData = async (): Promise<void> => {
    axios
      .get('/api/Schools/get-school', {
        params: {
          key: 'slug',
          value: schoolId,
        },
      })
      .then((res) => {
        setMergeData(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <>
      <WrapperTop />
      <ImageContainer ref={topRef} noGalleryData={!mergeData?.gallery?.length}>
        {mergeData?.gallery?.slice(0, 2).map((img) => (
          <ClintSideImage src={img?.url} />
        ))}
      </ImageContainer>

      <Main>
        <HeaderDojo
          style={{
            background: 'transparent',
            padding: `calc( ${SAFE_AREA_VIEW_PADDING_TOP} + 12px )`,
            position: 'absolute',
            boxShadow: 'none',
            top: '0px',
          }}
          titleShow={false}
          IconLeft={<Icon src="/assets/icons/back-arrow.svg" />}
          onIconLeftCLick={() => router.back()}
          IconRight={<Icon src="/assets/icons/heart.svg" />}
          IconRight2={<Icon src="/assets/icons/upload.svg" />}
        />
        <Container isFlexGrow notGutters>
          <SchoolProfileTitle
            data={mergeData}
            rating={rating}
            members={plansMembers.length}
            getSchoolData={getSchoolData}
          />
          <TabContext value={tab}>
            <SchoolTabs />
            <TabPanelItem value="info">
              <SchoolInfo
                data={schoolData}
                plansData={plansData}
                scheduleData={scheduleData}
                plansMembers={plansMembers}
                reviewData={reviews}
              />
            </TabPanelItem>
            <TabPanelItem value="schedules">
              <SchedulesProfile scheduleData={scheduleData} />
            </TabPanelItem>
            <TabPanelItem value="plan">
              <SchoolPlans plansData={plansData} />
            </TabPanelItem>
            <TabPanelItem value="reviews">
              <ReviewSection recordId={recordId} reviewData={reviews} />
            </TabPanelItem>
            <TabPanelItem value="leaderboard">
              <LeaderBoard checkInsLeader={checkInsLeader} />
            </TabPanelItem>
            <TabPanelItem value="members">
              <Member plansMembers={mergePlansMembres} />
            </TabPanelItem>
          </TabContext>
        </Container>
      </Main>
      {authUser && <BottomNavBar />}
    </>
  );
};

export default SchoolProfile;
