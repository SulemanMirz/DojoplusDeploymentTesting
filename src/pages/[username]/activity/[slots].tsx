import { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ActiviyDetails } from '../../../modules/activity';

const Activity: React.FC = () => {
  return (
    <>
      <Head>
        <title>Activity</title>
      </Head>
      <Container>
        <ActiviyDetails />
      </Container>
    </>
  );
};

export default Activity;
