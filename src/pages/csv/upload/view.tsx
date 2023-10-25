import React from 'react';

import { Section } from '../../../shared/components/layout/Section';
import { Container } from '../../../shared/components/layout/Container';

import { CSVUploadView } from '../../../modules/csv-upload/CSVUploadView';

const CSVUpalodView: React.FC = () => (
  <Section>
    <Container notGutters isFlexGrow>
      <CSVUploadView />
    </Container>
  </Section>
);

export default CSVUpalodView;
