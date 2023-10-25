import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { NextPage } from 'next';
import router from 'next/router';
import HeaderDojo from '../../../../modules/headers/HeaderDojo';
import { Header } from '../../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../../shared/components/layout/Main';
import { Section } from '../../../../shared/components/layout/Section';
import BottomNavAdmin from '../../../../modules/bottom-nav/BottomNavAdmin';
import StaffAdmin from '../../../../modules/admin-profile/settings/staff-admin';

const BackArrowIcon = styled.img``;

const Staff: NextPage = () => {
  return (
    <>
      <Head>
        <title>Staff Member . DOJO+</title>
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
            title="Staff"
            IconLeft={<BackArrowIcon src="/assets/icons/back-arrow.svg" />}
            onIconLeftCLick={() => router.back()}
          />
        </Header>
        <MainProfile>
          <StaffAdmin />
        </MainProfile>
      </Section>
      <BottomNavAdmin />
    </>
  );
};

export default Staff;
