import React, { useEffect, useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import _ from 'lodash';
import styled from 'styled-components';
import axios from 'axios';

import { CircularProgress } from '@mui/material';
import router from 'next/router';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';

import http from '../../../../services/http';
import { User } from '../../../shared/models/user.model';
import { IRank } from '../../../shared/models/Rank.model';
import { TextWhite24CapitalizeRegular } from '../../../shared/components/texts';
import ProfileCard from '../../../modules/switchAccount/components/ProfileCard';
import { School } from '../../../shared/models/school.model';
import SchoolCard from '../../../modules/switchAccount/components/SchoolCard';
import HeaderDojo from '../../../modules/headers/HeaderDojo';
import { BackArrowIcon } from '../../../modules/Settings/components/settings.styled';
import { useFireBaseAuth } from '../../../context/FirebaseContext';

type UserProfileViewProps = {
  data: { profile: User } | null;
  schools: School[] | null | undefined;
};

export const ProfilesRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 2rem;
  padding-left: 8px;
  padding-right: 16px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

interface Profiles extends User {
  ranks: IRank[];
}
const SwitchAccount: NextPage<UserProfileViewProps> = ({ data, schools }) => {
  const { setSchoolInfo } = useFireBaseAuth();
  const { profile } = data;
  const [isLoading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [refreshControl, setRefreshControl] = useState(false);

  const handleRefresh = (): void => {
    setRefreshControl(!refreshControl);
  };

  useEffect(() => {
    axios('/api/User', {
      params: {
        emails: localStorage.getItem('emails') || '[]',
      },
    })
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [refreshControl]);

  if (isLoading) {
    return (
      <MainProfile>
        <LoadingWrapper>
          <CircularProgress size={20} />
        </LoadingWrapper>
      </MainProfile>
    );
  }

  return (
    <>
      <Head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line @typescript-eslint/quotes
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-NNZLKZH');`,
          }}
        />
        <title>{`DOJO+ ${data?.profile?.username} · Switch Account`}</title>
      </Head>
      <iframe
        title="GTMuser"
        src="https://www.googletagmanager.com/ns.html?id=GTM-NNZLKZH"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
      <Section>
        <Header style={{ marginTop: '120px' }}>
          <HeaderDojo
            title="Switch Account"
            IconLeft={<BackArrowIcon src="/assets/icons/back-arrow.svg" />}
            onIconLeftCLick={() => router.back()}
          />
        </Header>
        <MainProfile>
          <Container notGutters isFlexGrow>
            <TextWhite24CapitalizeRegular
              style={{ margin: '23px 0px 8px 15px' }}
            >
              Profiles
            </TextWhite24CapitalizeRegular>
            <ProfilesRow>
              <ProfileCard profile={profile} />
              {profiles
                ?.filter((prof) => prof.recordId !== profile.recordId)
                .map((val) => {
                  return (
                    <ProfileCard handleRefresh={handleRefresh} profile={val} />
                  );
                })}
              <ProfileCard isNewUser />
            </ProfilesRow>
            <TextWhite24CapitalizeRegular
              style={{ margin: '23px 0px 8px 15px' }}
            >
              Schools
            </TextWhite24CapitalizeRegular>
            <ProfilesRow>
              {schools?.map((val) => {
                return <SchoolCard onSwitch={setSchoolInfo} school={val} />;
              })}
              <SchoolCard
                onSwitch={() => console.log('Please add Functionality')}
                isNewSchool
              />
            </ProfilesRow>
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  UserProfileViewProps
> = async (context) => {
  const slug = context.query?.username;
  const username: any = slug;

  if (typeof username === 'string') {
    try {
      const baseUrl = `${
        process.env.NODE_ENV === 'development' ? 'http' : 'https'
      }://${context.req.headers.host}/api/`;
      const requests = [];
      let profileData = [];
      let schools = [];

      requests.push(
        http.get(`${baseUrl}User`, {
          params: {
            username,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}Schools`, {
          params: {
            username,
          },
        }),
      );

      await Promise.all(requests).then((res) => {
        profileData = [...res[0].data];
        schools = [...res[1].data];
      });
      if (profileData.length === 0) {
        return {
          notFound: true,
        };
      }
      const response = {
        profile: _.mapKeys(profileData[0].fields, (v, k) => _.camelCase(k)),
      };
      return {
        props: {
          data: response,
          schools,
        },
      };
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return {
        props: {},
        notFound: true,
        fallback: 'blocking',
      };
    }
  }
  return {
    props: {},
    notFound: true,
    fallback: 'blocking',
  };
};

export default SwitchAccount;
