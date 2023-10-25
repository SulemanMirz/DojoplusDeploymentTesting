import React from 'react';

import { Section } from '../shared/components/layout/Section';
import { MainProfile } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

import { CheckoutReturn } from '../modules/checkout-return/CheckoutReturn';

const CheckoutReturnView: React.FC = () => (
  <Section>
    <MainProfile>
      <Container notGutters isFlexGrow>
        <CheckoutReturn />
      </Container>
    </MainProfile>
  </Section>
);


export default CheckoutReturnView;
