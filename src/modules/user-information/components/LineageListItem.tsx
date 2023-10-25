import React from 'react';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import {
  TextGray14CapitalizeThin,
  TextWhite14CapitalizeThin,
} from '../../../shared/components/texts';

const Container = styled.li`
  margin-bottom: 16px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  margin: 5px;
`;

export const LineageListItem: React.FC = () => {
  return (
    <Container>
      <TextGray14CapitalizeThin>martial art</TextGray14CapitalizeThin>
      <Content>
        <AvatarContainer>
          <Avatar src="" variant="square" alt="Lineage Avatar" />
        </AvatarContainer>
        <TextWhite14CapitalizeThin>martial art</TextWhite14CapitalizeThin>
      </Content>
    </Container>
  );
};
