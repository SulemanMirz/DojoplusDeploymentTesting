import Head from 'next/head';
import * as React from 'react';
import { GetStaticProps, NextPage } from 'next';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../shared/components/SchoolScripts';

import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import Home from '../../modules/home-page';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>Home · DOJO+</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <MainSchool>
          <Container notGutters isFlexGrow>
            <Home />
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // try {
  //   const baseUrl = `${BASE_URL}api/`;
  //   const { data } = await http.get(`${baseUrl}Posts`);
  //   if (data.length === 0) {
  //     return {
  //       props: {
  //         notFound: true,
  //         data: [],
  //       },
  //     };
  //   }
  return {
    props: {
      notFound: false,
      // data,
    },
  };
  // } catch (error) {
  //   return {
  //     props: {
  //       data: null,
  //     },
  //   };
  // }
};

export default HomePage;
