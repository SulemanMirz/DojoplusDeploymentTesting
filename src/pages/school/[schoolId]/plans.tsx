import Head from 'next/head';
import * as React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import { ViewProps } from '../../../shared/types/custom';
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

import Wrapper from '../../../modules/plans/components/Wrapper';
import http from '../../../../services/http';
import { SchoolSchedules } from '../../../shared/models/school.model';

type SchedulesViewProps = {
  data: SchoolSchedules;
};

const PlansView: NextPage<SchedulesViewProps> = ({ data }): JSX.Element => {
  const { t } = useTranslation();
  const textPlans = t('Plans');
  const schoolname = data?.schoolName || 'school name no found';
  const schoolLogo = data?.schoolLogo
    ? data?.schoolLogo[0]?.url
    : '/assets/logo/dojo.png';
  const schoolPhoneType = data?.phoneType;
  const schoolPhone = data?.phone;

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${schoolname} ${textPlans} · DOJO+`}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <Header>
          <SchoolHeader schoolName={schoolname} shcoolLogo={schoolLogo} />
        </Header>
        <MainSchool>
          <Container
            isFlexGrow
            isFluid>
            <Wrapper data={data} />
          </Container>
        </MainSchool>
        <Footer>
          <BottomNavigation
            phoneType={
              schoolPhoneType
                ? schoolPhoneType.toLocaleUpperCase()
                : schoolPhoneType
            }
            phoneNumber={schoolPhone}
            plans={data.plans ? data.plans.length > 0 : false}
          />
        </Footer>
      </Section>
    </>
  );
};

// This can be modified in a better way, but for reasons of time reuse the logic of the schedule view
export const getServerSideProps: GetServerSideProps<
  ViewProps<SchedulesViewProps>
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

export default PlansView;
