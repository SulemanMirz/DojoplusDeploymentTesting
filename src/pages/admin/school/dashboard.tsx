import Head from 'next/head';
import * as React from 'react';
import { NextPage } from 'next';

import { Section } from '../../../shared/components/layout/Section';
import { MainSchool } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import BottomNavAdmin from '../../../modules/bottom-nav/BottomNavAdmin';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>DashBoard · DOJO+</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow isFluid>
            Dash Board Pages
          </Container>
        </MainSchool>
      </Section>
      <BottomNavAdmin />
    </>
  );
};

export default Dashboard;
