import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import styled from 'styled-components';
import Head from 'next/head';
import { Section } from '../../../shared/components/layout/Section';
import { MainSchool } from '../../../shared/components/layout/Main';

import http from '../../../../services/http';
import Custom404 from '../../404';
import { EventDetails } from '../../../modules/UpcomingEvents/eventDetail';

type EventDetailsType = {
  eventData: any;
  notFound: boolean;
};

const Container404 = styled.div`
  display: flex;
  align-self: center;
  height: 100%;
`;

const EventDetailsView: NextPage<EventDetailsType> = ({
  eventData,
  notFound,
}) => (
  <>
    <Head>
      <title>{`${eventData?.[0].eventTitle} · DOJO+`}</title>
    </Head>
    <Section>
      <MainSchool>
        {notFound ? (
          <Container404>
            <Custom404 msg="No Data Found" />
          </Container404>
        ) : (
          <EventDetails data={eventData} />
        )}
      </MainSchool>
    </Section>
  </>
);

export default EventDetailsView;

export const getServerSideProps: GetServerSideProps<EventDetailsType> = async (
  context,
) => {
  try {
    const baseUrl = `${
      process.env.NODE_ENV === 'development' ? 'http' : 'https'
    }://${context.req.headers.host}/api/`;

    const slug = context.query?.slug;
    const eventType: string = slug[0];
    const recordId: string = slug[1];

    const requests = [];
    let eventData = [];

    requests.push(
      http.get(`${baseUrl}UpcomingEvents`, {
        params: {
          eventType,
          recordId,
        },
      }),
    );

    await Promise.all(requests).then((res) => {
      eventData = [...res[0].data];
    });

    if (eventData.length === 0) {
      return {
        props: {
          notFound: true,
          eventData: [],
        },
      };
    }
    return {
      props: {
        notFound: false,
        eventData,
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
