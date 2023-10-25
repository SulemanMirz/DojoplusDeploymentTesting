import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GetServerSideProps } from 'next';

import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../shared/components/SchoolScripts';
import { GetSchoolSchedulesQuery } from '../../../shared/types/generated';
import { NextPageProps, ViewProps } from '../../../shared/types/custom';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { SchoolHeader } from '../../../shared/components/layout/header/SchoolHeader';
import { MainSchool } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { Footer } from '../../../shared/components/layout/Footer';
import { BottomNavigation } from '../../../shared/components/layout/navbars/BottomNavigation';

import { Location } from '../../../modules/location/Location';
import http from '../../../../services/http';
import { SchoolSchedules } from '../../../shared/models/school.model';

const LocationView: NextPageProps<SchoolSchedules> = ({ data }) => {
  const { t } = useTranslation();
  const textlocation = t('Directions');
  const {
    schoolName,
    schoolLogo,
    phone,
    address1,
    city,
    state,
    // schoolProductRelation,
    phoneType,
  } = data || {
    schoolName: '',
    schoolLogo: [{ url: '' }],
    phone: null,
    address1: '',
    city: '',
    state: '',
    // schoolProductRelation: { count: 0 },
    phoneType: '',
  };
  
  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${schoolName} ${textlocation} · DOJO+`}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <Header>
          <SchoolHeader
            schoolName={schoolName || ''}
            shcoolLogo={
              schoolLogo ? schoolLogo[0].url : '/assets/logo/dojo.png'
            }
          />
        </Header>
        <MainSchool>
          <Container isFlexGrow isFluid notGutters>
            <Location
              name={schoolName}
              address={address1}
              city={city}
              state={state}
            />
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
export const getServerSideProps: GetServerSideProps<
  ViewProps<GetSchoolSchedulesQuery>
> = async (context) => {
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
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      return {
        props: {
          data: null,
        },
      };
    }
  }
  return {
    props: {
      data: null,
    },
  };
};

export default LocationView;
