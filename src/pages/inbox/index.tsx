import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import Inbox from '../../modules/inbox';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import BottomNavBar from '../../modules/bottom-nav/BottomNav';

const InboxPage: NextPage = () => {
  const { authUser } = useFirebaseAuth();
  return (
    <>
      <Head>
        <title>Inbox · DOJO+</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow isFluid>
            {authUser?.email && <Inbox userEmail={authUser?.email} />}
          </Container>
        </MainSchool>
      </Section>
      {authUser && <BottomNavBar />}
    </>
  );
};

export default InboxPage;
