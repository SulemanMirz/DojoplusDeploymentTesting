import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Section } from '../../../../shared/components/layout/Section';
import {
  MainProfile,
  MainSchool,
} from '../../../../shared/components/layout/Main';

import http from '../../../../../services/http';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../../shared/components/SchoolScripts';
import { EmptyViewAlert } from '../../../../shared/components/EmptyViewAlert';
import { Container } from '../../../../shared/components/layout/Container';
import { Seminar } from '../../../../shared/models/Seminar.model';
import { Checkout } from '../../../../modules/seminars/steps';

type PrivateClassViewProps = {
  data: Seminar | null | undefined;
};
const PrivateClassView: NextPage<PrivateClassViewProps> = ({
  data,
}): JSX.Element => {
  const { t } = useTranslation();
  const textSeminar = t('seminar');

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
              <EmptyViewAlert msg="NO SEMINAR FOUND" />
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
        <title>{`${data.eventTitle} ${textSeminar} · DOJO+`}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />

        <MainProfile>{data && <Checkout data={data} />}</MainProfile>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PrivateClassViewProps> =
  async (context) => {
    const title = context.query?.title;
    if (typeof title === 'string') {
      try {
        const baseUrl = `${
          process.env.NODE_ENV === 'development' ? 'http' : 'https'
        }://${context.req.headers.host}/api/`;
        const response = await http.get(`${baseUrl}Seminars`, {
          params: {
            title,
            single: true,
          },
        });

        return {
          props: {
            data: response.data,
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

export default PrivateClassView;
