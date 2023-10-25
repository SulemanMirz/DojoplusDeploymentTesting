import Head from 'next/head';
import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import { GoogleManagerScript } from '../shared/components/SchoolScripts';
import { Section } from '../shared/components/layout/Section';
import { MainSchool } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

import ForgotPassword from '../modules/forgot-password';

const ForgotPasswordPage: NextPage = () => {
  const { t } = useTranslation();
  const ForgotPasswordT = t('forgotPassword');

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${ForgotPasswordT} · DOJO+`}</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow>
            <ForgotPassword />
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export default ForgotPasswordPage;
