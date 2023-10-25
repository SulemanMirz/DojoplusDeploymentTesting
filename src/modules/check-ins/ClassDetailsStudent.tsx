import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { CircularProgress, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { MainCheckIn } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import { Header } from '../../shared/components/layout/header/Header';
import {
  ArrowBackIcon,
  Avatar,
  AvatarConatiner,
  CheckInText,
  ClassText,
  GroupCont,
  Item,
  MasterNameText,
  RightArrow,
  ScheduleTime,
  StudentAvatar,
  StudentsAttending,
  StudentsContainer,
  Svg,
  SwipeContainer,
  TextTime,
} from './components/checkin.styled';
import UserAvatar from '../userAvatar';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { formattedUTCHours } from '../../shared/utils/checkins-utils';
import { SAFE_AREA_VIEW_PADDING_BOTTOM } from '../../shared/styles/SafeAreaView';
import HeaderDojo from '../headers/HeaderDojo';

const Section = styled.section<{ exited }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${({ exited }) => (exited ? '#000' : '#d4fb45')};
  animation: ${({ exited }) => (exited ? 'changeBg 1.5s' : '')};
  @keyframes changeBg {
    from {
      background-color: #d4fb45;
    }
    to {
      background-color: #000;
    }
  }
`;

const DojoImage = styled.img<{ dojoGoSmall }>`
  height: ${({ dojoGoSmall }) => (dojoGoSmall ? '10px' : '40px')};
  animation: ${({ dojoGoSmall }) => (dojoGoSmall ? 'smallify 1.5s' : '')};
  @keyframes smallify {
    from {
      height: 40px;
      width: auto;
    }
    to {
      height: 10px;
      width: auto;
    }
  }
`;

const CheckingInText = styled.span`
  font-size: 18px;
  font-family: Saira;
  font-weight: 600;
  position: absolute;
  top: 30%;
  left: calc(50vw - 55px);
`;

type PickClassProps = {
  data: any;
  title: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
    checked: boolean;
    setExited: (exited: boolean) => void;
    setDojoVisible: (visible: boolean) => void;
    setDojoGoSmall: (dojoGoSmall: boolean) => void;
    setLoading: (loading: boolean) => void;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      timeout={{ appear: 0, exit: 1000 }}
      direction="down"
      in={props.checked}
      mountOnEnter
      unmountOnExit
      onExited={() => {
        props.setExited(true);
        setTimeout(() => {
          props.setDojoVisible(true);
          setTimeout(() => {
            props.setDojoGoSmall(true);
          }, 1500);
          setTimeout(() => {
            props.setLoading(true);
          }, 2250);
        }, 1500);
      }}
      ref={ref}
      {...props}
    />
  );
});

export const ClassDetailsStudent: React.FC<PickClassProps> = ({
  data,
  title,
}) => {
  const schoolLogo = data?.school?.[0]?.schoolLogo?.[0]?.url;
  const defaultSchoolLogo = '/assets/logo/dojo.png';

  const [inn, setInn] = useState(true);
  const [exited, setExited] = useState(false);
  const [dojoVisible, setDojoVisible] = useState(false);
  const [dojoGoSmall, setDojoGoSmall] = useState(false);
  const [loading, setLoading] = useState(false);

  const { query, push, back } = useRouter();
  const { authUser } = useFirebaseAuth();
  const username = authUser?.userInfo?.username || '';

  const { t } = useTranslation();
  const TeammatesAttending = t('TeammatesAttending');
  const SwipeUpCheckIn = t('SwipeUpCheckIn');
  const CheckingIn = t('CheckingIn');

  useEffect(() => {
    let touchstartY = 0;
    let touchendY = 0;

    const checkDirection: () => void = () => {
      if (touchendY < touchstartY) setInn(false);
    };

    document.addEventListener('touchstart', (e) => {
      touchstartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
      touchendY = e.changedTouches[0].screenY;
      checkDirection();
    });
  }, []);

  useEffect(() => {
    if (loading) {
      axios
        .post('/api/CheckIn', { classId: query.classId, username })
        .then(() => {
          setLoading(false);
          push(`/${username}/activity/week`);
        })
        .catch((e) => {
          console.log(e, 'error');
        });
    }
  }, [loading, push, query.classId, username]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Section exited={exited}>
        {dojoVisible && (
          <DojoImage
            dojoGoSmall={dojoGoSmall}
            src="/assets/logo/dojo_plus_Logo.png"
            alt=""
          />
        )}
        {loading && (
          <>
            <CircularProgress
              style={{
                position: 'absolute',
                top: 'calc(50vh - 40px)',
                left: 'calc(50vw - 38px)',
              }}
              size={80}
              thickness={0.5}
              color="inherit"
            />
            <CheckingInText>{`${CheckingIn}...`}</CheckingInText>
          </>
        )}
        <Transition
          setDojoVisible={setDojoVisible}
          setExited={setExited}
          setDojoGoSmall={setDojoGoSmall}
          setLoading={setLoading}
          checked={inn}
        >
          <div
            style={{
              width: '100.2vw',
              overflow: 'hidden',
              paddingBottom: SAFE_AREA_VIEW_PADDING_BOTTOM,
            }}
          >
            <Header
              style={{
                paddingTop: 80,
                backgroundColor: '#111111',
              }}
            >
              <HeaderDojo
                IconLeft={<ArrowBackIcon src="/assets/icons/back-arrow.svg" />}
                onIconLeftCLick={() => back()}
              />
            </Header>
            <MainCheckIn>
              <Container
                style={{
                  backgroundColor: '#D4FB45',
                }}
                notGutters
                isFlexGrow
              >
                <SwipeContainer>
                  <AvatarConatiner>
                    <Avatar
                      variant="circular"
                      src={schoolLogo || defaultSchoolLogo}
                    />
                  </AvatarConatiner>
                  <GroupCont>
                    <ClassText>{data?.className}</ClassText>
                    <ScheduleTime>
                      <Item>
                        <Svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </Svg>
                        <TextTime>
                          {formattedUTCHours(
                            data?.timeStart,
                            data?.school?.[0]?.country,
                          )}{' '}
                          <RightArrow src="/assets/icons/right-arrow.svg" />{' '}
                          {formattedUTCHours(
                            data?.timeEnd,
                            data?.school?.[0]?.country,
                          )}
                        </TextTime>
                      </Item>
                    </ScheduleTime>
                  </GroupCont>
                  <GroupCont>
                    <UserAvatar
                      username={data?.instructorLink}
                      avatarDimension={64}
                      disableClick
                    />
                    <MasterNameText>{data?.instructorLookup}</MasterNameText>
                  </GroupCont>

                  <StudentsContainer>
                    {data?.checkedInUsers?.map((val) => {
                      return (
                        <StudentAvatar>
                          <UserAvatar
                            key={val.id}
                            avatarDimension={40}
                            username={val?.usernameFromUsername?.[0]}
                            beltHeight={5}
                          />
                        </StudentAvatar>
                      );
                    })}
                  </StudentsContainer>
                  {data?.checkedInUsers?.length > 12 && (
                    <StudentsAttending>
                      +{data?.checkedInUsers?.length - 12} {TeammatesAttending}
                    </StudentsAttending>
                  )}
                </SwipeContainer>
                <GroupCont
                  style={{
                    height: 100,
                    justifyContent: 'center',
                  }}
                >
                  <Svg
                    style={{
                      opacity: 1,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#333"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6.99999 2.828L2.04999 7.778L0.635986 6.364L6.99999 0L13.364 6.364L11.95 7.778L6.99999 2.828Z"
                      fill="#333"
                    />
                  </Svg>
                  <CheckInText>{SwipeUpCheckIn}</CheckInText>
                </GroupCont>
              </Container>
            </MainCheckIn>
          </div>
        </Transition>
      </Section>
    </>
  );
};
