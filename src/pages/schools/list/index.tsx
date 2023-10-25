import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import styled from 'styled-components';
import { Section } from '../../../shared/components/layout/Section';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';

import { SchoolList } from '../../../modules/school-list/SchoolList';
import http from '../../../../services/http';
import Custom404 from '../../404';

type SchoolListType = {
  schoolData: [{ schoolName: string; slug: string }];
  notFound?: boolean;
};

const Container404 = styled.div`
  display: flex;
  align-self: center;
  height: 100%;
`;

const SchoolListView: NextPage<SchoolListType> = ({ schoolData, notFound }) => (
  <Section>
    <MainProfile>
      <Container notGutters isFlexGrow>
        {notFound ? (
          <Container404>
            <Custom404 msg="No Data Found" />
          </Container404>
        ) : (
          <SchoolList schoolData={schoolData} />
        )}
      </Container>
    </MainProfile>
  </Section>
);

export default SchoolListView;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<SchoolListType> = async (
  context,
) => {
  try {
    const baseUrl = `${
      process.env.NODE_ENV === 'development' ? 'http' : 'https'
    }://${context.req.headers.host}/api/`;
    const requests = [];
    let schoolData = [];

    requests.push(http.get(`${baseUrl}Schools/list`));

    await Promise.all(requests).then((res) => {
      schoolData = [...res[0].data];
    });

    if (schoolData.length === 0) {
      return {
        props: {
          notFound: true,
          schoolData: [],
        },
      };
    }
    return {
      props: {
        notFound: false,
        schoolData,
      },
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return {
      props: {},
      notFound: true,
      fallback: 'blocking',
    };
  }
};
