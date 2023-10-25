import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import Head from 'next/head';
import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';

import { ClassDetails } from '../../modules/check-ins/ClassDetails';
import http from '../../../services/http';
import { ClassDetailsStudent } from '../../modules/check-ins/ClassDetailsStudent';

type ClassDetailsProps = {
  data: any;
  detailView: boolean;
};

const ClassDetailsPage: NextPage<ClassDetailsProps> = ({
  data,
  detailView,
}) => {
  return (
    <>
      <Head>
        <title>Pick Class · DOJO+</title>
      </Head>
      <Section>
        <MainProfile>
          <Container notGutters isFlexGrow>
            {detailView ? (
              <ClassDetails data={data} title="Class Details · DOJO+" />
            ) : (
              <ClassDetailsStudent data={data} title="Class Details · DOJO+" />
            )}
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};

export default ClassDetailsPage;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<ClassDetailsProps> = async (
  context,
) => {
  const { classId, username, isInstructor } = context.query;
  if (typeof classId === 'string') {
    try {
      const baseUrl = `${
        process.env.NODE_ENV === 'development' ? 'http' : 'https'
      }://${context.req.headers.host}/api/`;
      const response = await http.get(`${baseUrl}CheckIn`, {
        params: {
          classId,
        },
      });

      return {
        props: {
          data: response.data,
          detailView:
            isInstructor ||
            Boolean(
              response.data?.checkedInUsers.find(
                (user) => user.usernameFromUsername?.[0] === username,
              ),
            ) ||
            null,
        },
      };
    } catch (error) {
      return {
        props: {
          data: null,
          detailView: null,
        },
      };
    }
  }
  return {
    props: {
      data: null,
      detailView: null,
    },
  };
};
