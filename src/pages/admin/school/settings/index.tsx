import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';

import { Section } from '../../../../shared/components/layout/Section';
import { MainSchool } from '../../../../shared/components/layout/Main';
import { Container } from '../../../../shared/components/layout/Container';
import BottomNavAdmin from '../../../../modules/bottom-nav/BottomNavAdmin';
import AdminSideSchoolSetting from '../../../../modules/admin-profile/settings';

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings · DOJO+</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow isFluid>
            <AdminSideSchoolSetting />
          </Container>
        </MainSchool>
      </Section>
      <BottomNavAdmin />
    </>
  );
};

export default Settings;
