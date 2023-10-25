import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useRouter } from 'next/router';
import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import { Header } from '../../shared/components/layout/header/Header';
import StudentCard from './components/SudentsCard';
import {
  Avatar,
  AvatarConatiner,
  ClassTextMaster,
  Item,
  MasterNameTextMaster,
  RightArrow,
  ScheduleTime,
  StudentsAttendingMaster,
  Svg,
  TextTime,
  ArrowBackIcon,
} from './components/checkin.styled';
import UserAvatar from '../userAvatar';
import { formattedUTCHours } from '../../shared/utils/checkins-utils';
import HeaderDojo from '../headers/HeaderDojo';

type PickClassProps = {
  data: any;
  title: string;
};

export const ClassDetails: React.FC<PickClassProps> = ({ data, title }) => {
  const schoolLogo = data?.school?.[0]?.schoolLogo?.[0]?.url;
  const defaultSchoolLogo = '/assets/logo/dojo.png';

  const { t } = useTranslation();
  const StudentsAttending = t('StudentsAttending');
  const StudentsAttended = t('StudentsAttended');

  const { query, back } = useRouter();
  const hasEnd = query?.hasEnd || false;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Section
        style={{
          height: '100%',
          background:
            'linear-gradient(179.97deg, #111111 15.48%, #333333 99.97%)',
        }}
      >
        <Header
          style={{
            paddingTop: 25,
          }}
        >
          <HeaderDojo
            IconLeft={<ArrowBackIcon src="/assets/icons/back-arrow.svg" />}
            onIconLeftCLick={() => back()}
          />
        </Header>
        <MainProfile>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            notGutters
            isFlexGrow
          >
            <AvatarConatiner style={{ marginTop: '70px' }}>
              <Avatar
                variant="circular"
                src={schoolLogo || defaultSchoolLogo}
              />
            </AvatarConatiner>
            <ClassTextMaster>{data?.className}</ClassTextMaster>
            <ScheduleTime style={{ marginBottom: 64 }}>
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
                    data.timeStart,
                    data?.school?.[0]?.country,
                  )}{' '}
                  <RightArrow src="/assets/icons/right-arrow.svg" />{' '}
                  {formattedUTCHours(data.timeEnd, data?.school?.[0]?.country)}
                </TextTime>
              </Item>
            </ScheduleTime>
            <UserAvatar username={data.instructorLink} avatarDimension={64} />
            <MasterNameTextMaster>
              {data?.instructorLookup}
            </MasterNameTextMaster>
            <StudentsAttendingMaster style={{ fontSize: 18, marginBottom: 24 }}>
              {data?.checkedInUsers?.length}{' '}
              {hasEnd ? StudentsAttended : StudentsAttending}
            </StudentsAttendingMaster>
            {data?.checkedInUsers?.map((val) => {
              const nickName = val?.nicknameFromUsername?.[0]
                ? `"${val?.nicknameFromUsername?.[0]}"`
                : '';
              const name = `${
                val?.firstNameFromUsername?.[0] || ''
              } ${nickName} ${val?.lastNameFromUsername?.[0] || ''}`;

              const username = val?.usernameFromUsername?.[0];
              const since = dayjs().to(dayjs(val?.createdTime));
              return (
                <StudentCard
                  key={val.id}
                  username={username}
                  name={name}
                  since={since}
                />
              );
            })}
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};
