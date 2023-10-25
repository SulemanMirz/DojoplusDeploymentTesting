import Head from 'next/head';
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Error from 'next/error';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../shared/components/SchoolScripts';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { SchoolHeader } from '../../../shared/components/layout/header/SchoolHeader';
import { MainSchool } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { Footer } from '../../../shared/components/layout/Footer';
import { BottomNavigation } from '../../../shared/components/layout/navbars/BottomNavigation';

import ListView from '../../../modules/schedule/ListView';
import { ScheduleNavBar } from '../../../modules/schedule/components/ScheduleNavBar';
import http from '../../../../services/http';
import { SchoolSchedules } from '../../../shared/models/school.model';

type SchedulesViewProps = {
  data: SchoolSchedules;
};
const SchedulesView: NextPage<SchedulesViewProps> = ({ data }) => {
  const { t } = useTranslation();
  const textSchedule = t('Schedule');

  if (!data) return <Error statusCode={404} />;

  const items = data;
  const {
    schoolName,
    schoolLogo,
    phone,
    // schoolProductRelation,
    phoneType,
  } = items || {
    schoolName: '',
    schoolLogo: [{ url: '' }],
    phone: null,
    schoolProductRelation: { count: 0 },
    phoneType: '',
  };

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${schoolName} ${textSchedule} · DOJO+`}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <Header>
          <SchoolHeader
            schoolName={schoolName || ''}
            shcoolLogo={
              schoolLogo ? schoolLogo[0]?.url : '/assets/logo/dojo.png'
            }
          />
          <ScheduleNavBar />
        </Header>
        <MainSchool>
          <Container isFlexGrow>
            {data ? <ListView initialData={data} /> : <div>no found</div>}
          </Container>
        </MainSchool>
        <Footer>
          <BottomNavigation
            phoneType={phoneType ? phoneType.toLocaleUpperCase() : phoneType}
            phoneNumber={phone}
            plans={data.plans ? data.plans.length > 0 : false}
          />
        </Footer>
      </Section>
    </>
  );
};

// This can be modified in a better way, but for reasons of time reuse the logic of the schedule view
export const getServerSideProps: GetServerSideProps<SchedulesViewProps> =
  async (context) => {
    const schoolId = context.query?.schoolId;
    if (typeof schoolId === 'string') {
      try {
        const baseUrl = `${
          process.env.NODE_ENV === 'development' ? 'http' : 'https'
        }://${context.req.headers.host}/api/`;
        const { data } = await http.get(`${baseUrl}Timetable`, {
          params: {
            schoolId,
          },
        });
        return Object.entries(data).length > 1
          ? {
            props: {
              data,
            },
          }
          : {
            notFound: true,
          };
      } catch (error) {
        console.log('getServerSideProps:schoolId:error:', error);
        return {
          notFound: true,
        };
      }
    }
    return {
      notFound: true,
    };
  };

export default SchedulesView;
