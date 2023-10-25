import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import router from 'next/router';

import styled from 'styled-components';
import { GoogleManagerScript } from '../shared/components/SchoolScripts';
import { Section } from '../shared/components/layout/Section';
import { MainSchool } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

import SingIn from '../modules/login';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { ProfileTabLoading } from '../shared/components/TabLoading';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #282828;
`;

const TrialView: NextPage = () => {
  const { authUser, loading } = useFirebaseAuth();
  const username = authUser?.userInfo?.username;

  const [isLoading, setisLoading] = useState(true);

  const { t } = useTranslation();
  const Login = t('login');

  useEffect(() => {
    if (authUser && username) {
      setisLoading(true);
      router.push('/home');
    } else {
      setisLoading(false);
    }
  }, [authUser, username]);

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${Login} · DOJO+`}</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow>
            {isLoading || loading ? (
              <LoadingWrapper>
                {/* {!(authUser && username) && <ProfileTabLoading />} */}
                <ProfileTabLoading />
              </LoadingWrapper>
            ) : (
              <SingIn />
            )}
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export default TrialView;
