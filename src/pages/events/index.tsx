import React from 'react';
import { GetStaticProps, NextPage } from 'next';

import Head from 'next/head';
import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';

import { UpcomingEvents } from '../../modules/UpcomingEvents';

const UpcomingEventsView: NextPage = () => (
  <>
    <Head>
      <title>Events · DOJO+</title>
    </Head>
    <Section>
      <MainProfile>
        <UpcomingEvents />
      </MainProfile>
    </Section>
  </>
);

export default UpcomingEventsView;

export const getStaticProps: GetStaticProps = async () => {
  // try {
  // const baseUrl = `${
  //   process.env.NODE_ENV === 'development' ? 'http' : 'https'
  // }://${context.req.headers.host}/api/`;
  // const requests = [];
  // let eventsData = [];

  // requests.push(http.get(`${baseUrl}UpcomingEvents`));

  // await Promise.all(requests).then((res) => {
  //   eventsData = [...res[0].data];
  // });

  // if (eventsData.length === 0) {
  //   return {
  //     props: {
  //       notFound: true,
  //       eventsData: [],
  //     },
  //   };
  // }
  return {
    props: {
      notFound: false,
    },
  };
  // } catch (error) {
  //   console.log(JSON.stringify(error, null, 2));
  //   return {
  //     props: {},
  //     notFound: true,
  //     fallback: 'blocking',
  //   };
  // }
};
