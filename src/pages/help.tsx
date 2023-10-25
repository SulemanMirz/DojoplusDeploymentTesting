import React from 'react';

import { Section } from '../shared/components/layout/Section';
import { MainProfile } from '../shared/components/layout/Main';
import { Container } from '../shared/components/layout/Container';

const HelpView: React.FC = () => (
  <Section>
    <MainProfile>
      <Container notGutters isFlexGrow>
        <p>HELP</p>
      </Container>
    </MainProfile>
  </Section>
);

export default HelpView;
