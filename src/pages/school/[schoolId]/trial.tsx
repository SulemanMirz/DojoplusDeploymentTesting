import Head from 'next/head';
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../shared/components/SchoolScripts';
import { ViewProps } from '../../../shared/types/custom';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { SchoolHeader } from '../../../shared/components/layout/header/SchoolHeader';
import { MainSchool } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { Footer } from '../../../shared/components/layout/Footer';
import { BottomNavigation } from '../../../shared/components/layout/navbars/BottomNavigation';
import { EmptyViewAlert } from '../../../shared/components/EmptyViewAlert';

import { Trial } from '../../../modules/trial/Trial';
import http from '../../../../services/http';
import { SchoolSchedules } from '../../../shared/models/school.model';

type TrialViewProps = {
  data: SchoolSchedules;
};

const TrialView: NextPage<TrialViewProps> = ({ data }) => {
  const { t } = useTranslation();
  const textTrial = t('freeTrial');
  const {
    schoolName,
    schoolLogo,
    phone,
    //  schoolProductRelation,
    recordId,
    phoneType,
  } =
    Object.entries(data).length > 0
      ? data
      : {
        schoolName: '',
        schoolLogo: [{ url: '' }],
        phone: null,
        //    schoolProductRelation: { count: 0 },
        recordId: '',
        phoneType: '',
      };

  if (!data || (data && Object.entries(data).length === 0)) {
    return (
      <>
        <Head>
          <GoogleManagerScript />
        </Head>
        <Section>
          <GoogleManagerNoScript />
          <MainSchool>
            <Container isFlexGrow>
              <EmptyViewAlert msg="SCHOOL NOT FOUND" />
            </Container>
          </MainSchool>
        </Section>
      </>
    );
  }

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${schoolName} ${textTrial} · DOJO+`}</title>
      </Head>
      <Section>
        <Header>
          <SchoolHeader
            schoolName={schoolName || ''}
            shcoolLogo={
              schoolLogo ? schoolLogo[0]?.url : '/assets/logo/dojo.png'
            }
          />
        </Header>
        <MainSchool>
          <Container isFlexGrow>
            <Trial schoolId={recordId} school={data} />
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
export const getServerSideProps: GetServerSideProps<ViewProps<TrialViewProps>> =
  async (context) => {
    const schoolId = context.query?.schoolId;
    if (typeof schoolId === 'string') {
      try {
        const baseUrl = `${
          process.env.NODE_ENV === 'development' ? 'http' : 'https'
        }://${context.req.headers.host}/api/`;
        const { data } = await http.get(`${baseUrl}Lead`, {
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

export default TrialView;
