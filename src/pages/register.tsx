import Head from 'next/head';
import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import { GoogleManagerScript } from '../shared/components/SchoolScripts';
import { Section } from '../shared/components/layout/Section';
import { MainSchool } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

import Register from '../modules/register/Register';

const TrialView: NextPage = () => {
  const { t } = useTranslation();
  const FreeRegistration = t('freeRegistration');

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${FreeRegistration} · DOJO+`}</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow>
            <Register />
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export default TrialView;
