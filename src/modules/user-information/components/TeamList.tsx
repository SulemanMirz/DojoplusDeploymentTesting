import React from 'react';
import styled from 'styled-components';

import { TeamListItem } from './TeamListItem';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
`;

export const TeamList: React.FC = () => {
  return (
    <Container>
      <TeamListItem />
    </Container>
  );
};
