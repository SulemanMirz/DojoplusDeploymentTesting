import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import _ from 'lodash';
import { useRouter } from 'next/router';
import axios from 'axios';

import styled from 'styled-components';
import { EmptyViewAlert } from '../shared/components/EmptyViewAlert';
import { Section } from '../shared/components/layout/Section';
import { Header } from '../shared/components/layout/header/Header';
import { MainProfile } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

import { Profile } from '../modules/profile/Profile';
import { InstructorProfile } from '../modules/instructor-profile/InstructorProfile';
import http from '../../services/http';
import { PrivateClasses, User } from '../shared/models/user.model';
import { IRank } from '../shared/models/Rank.model';
import BottomNavBar from '../modules/bottom-nav/BottomNav';
import { useFireBaseAuth } from '../context/FirebaseContext';
import { FollowListing } from '../modules/follow-listing-tabs';
import HeaderDojo from '../modules/headers/HeaderDojo';

const Icon = styled.img``;

const isBrowser = typeof window !== 'undefined';

type UserProfileViewProps = {
  data: { profile: User } | null;
  ranks: IRank[];
  privateClassesList: PrivateClasses[] | null | undefined;
  followers: string[];
  following: string[];
  checkIns: number;
};

const UserProfileView: NextPage<UserProfileViewProps> = ({
  data,
  ranks,
  privateClassesList,
  followers,
  following,
  checkIns,
}) => {
  const { push, query, asPath } = useRouter();
  const { authUser } = useFireBaseAuth();
  const username = query.slug[0];
  const email = authUser?.email || '';
  const isAuthUser = authUser?.email === data?.profile?.email;
  const isAuthUserName = authUser?.userInfo?.username === username;
  const [followNow, setFollowNow] = useState(0);
  const [followed, setFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tab = query?.slug?.[1] || '';

  const { profile } = data;
  const nickName = profile?.nickname ? `"${profile?.nickname}"` : '';
  const name = `${profile?.firstName || ''} ${nickName} ${
    profile?.lastName || ''
  }`;

  useEffect(() => {
    setFollowNow(0);
  }, [asPath]);

  const handleFollow = (): void => {
    if (!authUser) {
      push(`${window.location.origin}/login?returnTo=${window.location.href}`);
      return;
    }
    if (!isLoading) {
      if (!followed) {
        setIsLoading(true);
        axios
          .put(
            '/api/Follows',
            {},
            {
              params: {
                destinationUser: username,
                sourceUser: email,
                follow: true,
              },
            },
          )
          .then(() => {
            setFollowed(true);
            setIsLoading(false);
            setFollowNow(followNow + 1);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setIsLoading(true);
        axios
          .put(
            '/api/Follows',
            {},
            {
              params: {
                destinationUser: username,
                sourceUser: email,
                unfollow: true,
              },
            },
          )
          .then(() => {
            setFollowed(false);
            setIsLoading(false);
            setFollowNow(followNow - 1);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  useEffect(() => {
    if (email && !isAuthUser) {
      setIsLoading(true);
      axios('/api/Follows', {
        params: {
          destinationUser: username,
          sourceUserEmail: email,
          isFollowing: true,
        },
      })
        .then((res) => {
          setFollowed(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [username, email, isAuthUser]);

  if (tab === 'followers' || tab === 'following' || tab === 'mutual') {
    return <FollowListing title={name} />;
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
      </Head>
      <iframe
        title="GTMuser"
        src="https://www.googletagmanager.com/ns.html?id=GTM-NNZLKZH"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
      <Section>
        <div
          style={{
            backgroundColor: '#111111',
            position: 'fixed',
            height: '40px',
            zIndex: 101,
            width: '100%',
          }}
        />
        <Header style={{ top: '15px ' }}>
          <HeaderDojo
            style={{ position: 'relative', height: '80px', paddingTop: '33px' }}
            IconRight={
              isAuthUserName && (
                <Link href={`/${username}/settings`}>
                  <Icon src="/assets/icons/setting.svg" />
                </Link>
              )
            }
            IconLeft={
              isBrowser &&
              query.returnTo && <Icon src="/assets/icons/back-arrow.svg" />
            }
            onIconLeftCLick={() => {
              if (window && query.returnTo) {
                window.location.replace(query.returnTo as string);
              }
            }}
          />
        </Header>
        <MainProfile>
          <Container
            style={{
              marginTop: '14px',
              paddingBottom: authUser ? 65 : undefined,
            }}
            notGutters
            isFlexGrow
          >
            {data?.profile?.accountType?.includes('Instructor') ? (
              <InstructorProfile
                initialData={{ ...data }}
                ranks={ranks}
                privateClassesList={privateClassesList}
                followers={followers}
                following={following}
                handleFollow={handleFollow}
                followed={followed}
                followNow={followNow}
                isLoading={isLoading}
                checkIns={checkIns}
              />
            ) : (
              <Profile
                initialData={{ ...data }}
                ranks={ranks}
                followers={followers}
                following={following}
                followed={followed}
                followNow={followNow}
                isLoading={isLoading}
                handleFollow={handleFollow}
                checkIns={checkIns}
              />
            )}
            {!data?.profile && <EmptyViewAlert />}
            {authUser && <BottomNavBar />}
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
> = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const slug = context.query?.slug;
  const username: string = slug[0];

  if (typeof username === 'string') {
    try {
      const baseUrl = `${
        process.env.NODE_ENV === 'development' ? 'http' : 'https'
      }://${context.req.headers.host}/api/`;
      const requests = [];
      let profileData = [];
      let ranksData = [];
      let privateClassesList = [];
      let followers = [];
      let following = [];
      let checkIns = 0;

      requests.push(
        http.get(`${baseUrl}User`, {
          params: {
            username,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}Rank`, {
          params: {
            username,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}PrivateClasses`, {
          params: {
            username,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}Follows`, {
          params: {
            username,
            followers: true,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}Follows`, {
          params: {
            username,
            following: true,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}CheckIn/count`, {
          params: {
            username,
          },
        }),
      );

      await Promise.all(requests).then((res) => {
        profileData = [...res[0].data];
        ranksData = [...res[1].data];
        privateClassesList = [...res[2].data];
        followers = [...res[3].data];
        following = [...res[4].data];
        checkIns = res[5].data;
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
          ranks: ranksData.map((rank) =>
            _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
          ),
          privateClassesList,
          followers,
          following,
          checkIns,
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

export default UserProfileView;
