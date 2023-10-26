import React from 'react';
import Head from 'next/head';
import { ActiviyDetails } from '../../../modules/activity';

const Activity: React.FC = () => {
  return (
    <>
      <Head>
        <title>Activity</title>
      </Head>
      <div>
        <ActiviyDetails />
      </div>
    </>
  );
};

export default Activity;
