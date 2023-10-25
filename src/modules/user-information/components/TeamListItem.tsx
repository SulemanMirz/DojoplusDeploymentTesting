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

export const TeamAvatar = styled(Avatar)`
  width: 65px !important;
  height: 65px !important;
`;

export const TeamListItem: React.FC = () => {
  return (
    <Container>
      <TextGray14CapitalizeThin>team martial art</TextGray14CapitalizeThin>
      <Content>
        <AvatarContainer>
          <TeamAvatar src="" alt="Lineage Avatar" />
        </AvatarContainer>
        <TextWhite14CapitalizeThin>team name</TextWhite14CapitalizeThin>
      </Content>
    </Container>
  );
};
