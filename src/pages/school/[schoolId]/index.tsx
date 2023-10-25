import React from 'react';
import { GetServerSideProps } from 'next';

import { GetSchoolSchedulesQuery } from '../../../shared/types/generated';
import { NextPageProps } from '../../../shared/types/custom';

const SchedulesView: NextPageProps<GetSchoolSchedulesQuery> = () => {
  return <></>;
};

// eslint-disable-next-line consistent-return
export const getServerSideProps: GetServerSideProps = async (context) => {
  const schoolid = context?.query?.schoolId;
  if (typeof schoolid === 'string') {
    return {
      redirect: {
        destination: `/school/${schoolid}/info`,
        permanent: true,
      },
    };
  }
};

export default SchedulesView;
