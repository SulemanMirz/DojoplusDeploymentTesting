import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { CircularProgress, Dialog, Slide } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import localizedformat from 'dayjs/plugin/localizedFormat';
import { useFireBaseAuth } from '../../context/FirebaseContext';

import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import BottomNavBar from '../bottom-nav/BottomNav';
import { SelectSchoolModal } from './components/SelectSchoolModal';
import { SchoolAvatar } from './components/SchoolAvatar';
import { Header } from '../../shared/components/layout/header/Header';
import { TextWhite18CapitalizeBold } from '../../shared/components/texts';
import { TextWhite12Uppercase600 } from '../Settings/components/settings.styled';
import ScheduleCard from './components/ScheduleCard';
import { formattedUTCHours } from '../../shared/utils/checkins-utils';
import { SchoolLocationHeader } from './components/SchoolLocationHeader';
import MapComponent from '../location/components/MapComponent';
import HeaderDojo from '../headers/HeaderDojo';

dayjs.extend(localizedformat);

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
  cursor: pointer;
`;

const SwitchText = styled(TextWhite12Uppercase600)`
  width: auto;
`;

const Icon16 = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

const TodaysClassesText = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-block: 13px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin-top: 100px;
`;
export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PickClassProps = {
  title: string;
};

export const PickClass: React.FC<PickClassProps> = ({ title }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [classesData, setClassesData] = useState(null);
  const [schoolCurrentTime, setSchoolCurrentTime] = useState(Date.now());

  const { authUser } = useFireBaseAuth();
  const { push } = useRouter();
  const { t } = useTranslation();
  const ChangeSchool = t('ChangeSchool');
  const TodaysClasses = t('TodaysClasses');
  const AllForToday = t('AllForToday');
  const NoClassesToday = t('NoClassesToday');

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleModal2: () => void = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  useEffect(() => {
    if (authUser?.userInfo?.username) {
      setLoading(true);
      if (selectedSchool) {
        setClassesData(null);
        axios('/api/CheckIn', {
          params: {
            schoolName: selectedSchool?.slug,
          },
        })
          .then((res) => {
            setLoading(false);
            setClassesData(res.data.classData);
            setSchoolCurrentTime(res.data.zoneTime);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e, 'e');
          });
      } else {
        axios('/api/CheckIn', {
          params: {
            currentSchool: true,
            username: authUser?.userInfo?.username,
          },
        })
          .then((res) => {
            setLoading(false);
            const { schoolName } = res.data;
            if (schoolName) setSelectedSchool(res.data);
            else setIsModalVisible(true);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e, 'e');
          });
      }
    }
  }, [authUser?.userInfo?.username, selectedSchool]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Section style={{ height: '100%' }}>
        <Header
          style={{
            boxShadow: '0px 3px 0px rgba(24, 24, 24, 0.35)',
          }}
        >
          <HeaderDojo />
          <ContentWrapper>
            <SchoolAvatar
              onClick={handleModal2}
              src={selectedSchool?.schoolLogo?.[0].url}
              lat={selectedSchool?.lat}
              lng={selectedSchool?.long}
              title={selectedSchool?.schoolName}
            />
            <TitleContainer>
              <TextWhite18CapitalizeBold style={{ marginTop: 55 }}>
                {selectedSchool?.schoolName || ''}
              </TextWhite18CapitalizeBold>
              <SwitchWrapper onClick={handleModal}>
                <Icon16 src="/assets/icons/switch.svg" />
                <SwitchText>{ChangeSchool}</SwitchText>
              </SwitchWrapper>
            </TitleContainer>
          </ContentWrapper>
        </Header>
        <MainProfile>
          <Container
            style={{
              paddingBottom: authUser ? 91 : undefined,
              backgroundColor: '#282828',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            notGutters
            isFlexGrow
          >
            {loading && (
              <LoadingWrapper>
                <CircularProgress size={20} />
              </LoadingWrapper>
            )}
            <TodaysClassesText>
              {dayjs(schoolCurrentTime).format('dddd, MMM DD ')} {TodaysClasses}
            </TodaysClassesText>
            {classesData?.map((val) => {
              const isInstructor =
                authUser?.userInfo?.username === val?.instructorLink;
              const currentHours = new Date(schoolCurrentTime || '').getHours();
              const current = new Date(schoolCurrentTime || '').getMinutes();
              const endTime = {
                hours: new Date((val.timeEnd || 0) * 1000).getUTCHours(),
                minutes: new Date((val.timeEnd || 0) * 1000).getUTCMinutes(),
              };
              const startTime = {
                hours: new Date((val.timeStart || 0) * 1000).getUTCHours(),
                minutes: new Date((val.timeStart || 0) * 1000).getUTCMinutes(),
              };
              const hasEndHours = endTime?.hours < currentHours;
              const hasEnd = hasEndHours
                ? true
                : endTime?.hours <= currentHours && endTime.minutes <= current;
              return (
                <ScheduleCard
                  onClickCard={() => {
                    push(
                      `/check-in/class-detail?classId=${val.id}${
                        isInstructor ? `&isInstructor=${isInstructor}` : ''
                      }&username=${authUser?.userInfo?.username}${
                        hasEnd ? `&hasEnd=${hasEnd}` : ''
                      }`,
                    );
                  }}
                  key={val.id}
                  name={val.className}
                  martialArts={val.martialArtsLink}
                  start={formattedUTCHours(
                    val.timeStart,
                    selectedSchool.country,
                  )}
                  end={formattedUTCHours(val.timeEnd, selectedSchool.country)}
                  description={val.room}
                  masterName={val.instructorLookup && val.instructorLookup}
                  startTime={startTime}
                  endTime={endTime}
                  instructor={val.instructorLink}
                  schoolCurrentTime={schoolCurrentTime}
                  hasEnd={hasEnd}
                  isLive
                  hasEndDim
                />
              );
            })}
            <TodaysClassesText>
              {classesData?.length === 0
                ? NoClassesToday
                : `${AllForToday} 🤜🤛`}
            </TodaysClassesText>
            {isModalVisible && (
              <Dialog
                open={isModalVisible}
                fullScreen={isModalVisible}
                TransitionComponent={Transition}
                color="#282828"
              >
                <SelectSchoolModal
                  setSelectedSchool={setSelectedSchool}
                  handleModal={handleModal}
                />
              </Dialog>
            )}
            {isModalVisible2 && (
              <Dialog
                open={isModalVisible2}
                fullScreen={isModalVisible2}
                TransitionComponent={Transition}
                color="#282828"
              >
                <SchoolLocationHeader
                  title={selectedSchool?.schoolName}
                  onClick={handleModal2}
                />
                <MapComponent
                  lat={selectedSchool?.lat}
                  lng={selectedSchool?.long}
                  title={selectedSchool?.schoolName}
                  id="pick-class-map"
                />
              </Dialog>
            )}
            {authUser && <BottomNavBar />}
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};
