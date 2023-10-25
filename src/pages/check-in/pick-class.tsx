import React from 'react';
import { NextPage } from 'next';

import Head from 'next/head';
import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';

import { PickClass } from '../../modules/check-ins/PickClass';

const PickClassPage: NextPage = () => (
  <>
    <Head>
      <title>Pick Class · DOJO+</title>
    </Head>
    <Section>
      <MainProfile>
        <Container notGutters isFlexGrow>
          <PickClass title="Pick Class · DOJO+" />
        </Container>
      </MainProfile>
    </Section>
  </>
);

export default PickClassPage;
