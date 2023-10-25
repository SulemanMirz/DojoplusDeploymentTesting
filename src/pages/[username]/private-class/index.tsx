import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Section } from '../../../shared/components/layout/Section';
import {
  MainProfile,
  MainSchool,
} from '../../../shared/components/layout/Main';

import { PrivateClass } from '../../../modules/private-class/PrivateClass';
import http from '../../../../services/http';
import { PrivateClasses, User } from '../../../shared/models/user.model';
import { SchoolSchedules } from '../../../shared/models/school.model';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../shared/components/SchoolScripts';
import { EmptyViewAlert } from '../../../shared/components/EmptyViewAlert';
import { Container } from '../../../shared/components/layout/Container';

type PrivateClassViewProps = {
  data:
    | {
        classesList: PrivateClasses[];
        schoolsList: SchoolSchedules[];
        profile: User;
      }
    | null
    | undefined;
};
const PrivateClassView: NextPage<PrivateClassViewProps> = ({
  data,
}): JSX.Element => {
  const { t } = useTranslation();
  const textPrivateClass = t('PrivateClass');

  if (!data || (data && data.classesList.length === 0)) {
    return (
      <>
        <Head>
          <GoogleManagerScript />
        </Head>
        <Section>
          <GoogleManagerNoScript />
          <MainSchool>
            <Container isFlexGrow>
              <EmptyViewAlert msg="NO PRIVATE CLASSES FOUND" />
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
        <title>{`${data.profile.displayName} ${textPrivateClass} · DOJO+`}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <MainProfile>{data && <PrivateClass data={data} />}</MainProfile>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PrivateClassViewProps> =
  async (context) => {
    const username = context.query?.username;
    if (typeof username === 'string') {
      try {
        const baseUrl = `${
          process.env.NODE_ENV === 'development' ? 'http' : 'https'
        }://${context.req.headers.host}/api/`;
        const response = await http.get(`${baseUrl}PrivateClasses`, {
          params: {
            username,
            detailed: true,
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
