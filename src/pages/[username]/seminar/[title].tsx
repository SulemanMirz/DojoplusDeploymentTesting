import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { Section } from '../../../shared/components/layout/Section';
import {
  MainProfile,
  MainSchool,
} from '../../../shared/components/layout/Main';

import http from '../../../../services/http';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../shared/components/SchoolScripts';
import { EmptyViewAlert } from '../../../shared/components/EmptyViewAlert';
import { Container } from '../../../shared/components/layout/Container';
import { Seminar } from '../../../shared/models/Seminar.model';
import { Wrapper } from '../../../modules/seminars/seminarDetail';
import { Header } from '../../../shared/components/layout/header/Header';
import { SeminarHeader } from '../../../shared/components/layout/header/SeminarHeader';
import { Footer } from '../../../shared/components/layout/Footer';
import { BottomNavigation } from '../../../modules/seminars/components/SeminarFooter';
import { formatPrice } from '../../../shared/utils/ultils';

type PrivateClassViewProps = {
  data: Seminar | null | undefined;
};
const PrivateClassView: NextPage<PrivateClassViewProps> = ({
  data,
}): JSX.Element => {
  const router = useRouter();
  const { username } = router.query;

  const hasEnd = new Date(data.endDate || data.startDate) < new Date();

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
        <title>{`${data.eventTitle} · DOJO+`}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <Header>
          <SeminarHeader
            title={data.eventTitle}
            onClickBack={() => {
              router.push(`/${username}/seminars`);
            }}
          />
        </Header>
        <MainProfile>
          <Container isFlexGrow style={{ padding: 0 }}>
            {data && <Wrapper data={data} />}
          </Container>
        </MainProfile>
        <Footer>
          {hasEnd ? undefined : (
            <BottomNavigation
              price={`${
                formatPrice(data.priceMembers, data.currency) || ''
              } → ${formatPrice(data.priceNonMembers, data.currency)}`}
              nextRoute={`${router.asPath}/checkout`}
            />
          )}
        </Footer>
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
