import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import _ from 'lodash';

import router from 'next/router';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';

import http from '../../../../services/http';
import { User } from '../../../shared/models/user.model';
import Settings from '../../../modules/Settings';
import HeaderDojo from '../../../modules/headers/HeaderDojo';
import { BackArrowIcon } from '../../../modules/Settings/components/settings.styled';

type UserProfileViewProps = {
  data: { profile: User } | null;
};

const UserProfileView: NextPage<UserProfileViewProps> = ({ data }) => (
  <>
    <Head>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/quotes
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-NNZLKZH');`,
        }}
      />
      <title>{`DOJO+ ${data?.profile?.username} · Settings`}</title>
    </Head>
    <iframe
      title="GTMuser"
      src="https://www.googletagmanager.com/ns.html?id=GTM-NNZLKZH"
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    />
    <Section>
      <Header style={{ marginTop: '99px' }}>
        <HeaderDojo
          title="Settings"
          IconLeft={<BackArrowIcon src="/assets/icons/back-arrow.svg" />}
          onIconLeftCLick={() => router.back()}
        />
      </Header>
      <MainProfile>
        <Container notGutters isFlexGrow>
          <Settings initialData={{ ...data }} />
        </Container>
      </MainProfile>
    </Section>
  </>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<UserProfileViewProps> =
  async (context) => {
    const slug = context.query?.username;
    const username: any = slug;

    if (typeof username === 'string') {
      try {
        const baseUrl = `${
          process.env.NODE_ENV === 'development' ? 'http' : 'https'
        }://${context.req.headers.host}/api/`;
        const requests = [];
        let profileData = [];

        requests.push(
          http.get(`${baseUrl}User`, {
            params: {
              username,
            },
          }),
        );

        await Promise.all(requests).then((res) => {
          profileData = [...res[0].data];
        });
        if (profileData.length === 0) {
          return {
            notFound: true,
          };
        }
        const response = {
          profile: _.mapKeys(profileData[0].fields, (v, k) => _.camelCase(k)),
        };
        return {
          props: {
            data: response,
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
    }
    return {
      props: {},
      notFound: true,
      fallback: 'blocking',
    };
  };

export default UserProfileView;
