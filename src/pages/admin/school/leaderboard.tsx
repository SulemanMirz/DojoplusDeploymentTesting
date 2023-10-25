import Head from 'next/head';
import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { Section } from '../../../shared/components/layout/Section';
import { MainSchool } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import BottomNavAdmin from '../../../modules/bottom-nav/BottomNavAdmin';
import LeaderBoards from '../../../modules/admin-profile/LeaderBoards';
import HeaderDojo from '../../../modules/headers/HeaderDojo';

const Icons = styled.img``;

const LeaderBoard: NextPage = () => {
  return (
    <>
      <Head>
        <title>LeaderBoard · DOJO+</title>
      </Head>
      <Section>
        <MainSchool>
          <HeaderDojo
            title="Leaderboard"
            IconLeft={<Icons src="/assets/icons/back-arrow.svg" />}
            IconRight={<Icons src="/assets/icons/plus-icon.svg" />}
          />
          <Container isFlexGrow isFluid>
            <LeaderBoards />
          </Container>
        </MainSchool>
      </Section>
      <BottomNavAdmin />
    </>
  );
};

export default LeaderBoard;
