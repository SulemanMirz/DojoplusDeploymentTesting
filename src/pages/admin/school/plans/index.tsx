import Head from 'next/head';
import * as React from 'react';
import { NextPage } from 'next';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../../shared/components/SchoolScripts';

import { Section } from '../../../../shared/components/layout/Section';
import { MainProfile } from '../../../../shared/components/layout/Main';
import { Container } from '../../../../shared/components/layout/Container';
import PlansAdmin from '../../../../modules/plans-admin';

const PlansView: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>Plans Admin · DOJO+</title>
      </Head>
      <Section
        style={{
          backgroundColor: '#282828',
        }}
      >
        <GoogleManagerNoScript />
        <MainProfile>
          <Container isFlexGrow isFluid>
            <PlansAdmin />
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};

export default PlansView;
