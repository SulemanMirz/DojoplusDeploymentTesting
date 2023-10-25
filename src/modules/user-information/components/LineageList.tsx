import React from 'react';
import styled from 'styled-components';

import { LineageListItem } from './LineageListItem';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
`;

export const LineageList: React.FC = () => {
  return (
    <Container>
      <LineageListItem />
      <LineageListItem />
      <LineageListItem />
    </Container>
  );
};
