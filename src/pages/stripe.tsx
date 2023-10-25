import React from 'react';

import { Section } from '../shared/components/layout/Section';
import { MainProfile } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

import { StripeReturn } from '../modules/stripe-return/StripeReturn';

const StripeReturnView: React.FC = () => (
  <Section>
    <MainProfile>
      <Container notGutters isFlexGrow>
        <StripeReturn />
      </Container>
    </MainProfile>
  </Section>
);

export default StripeReturnView;
