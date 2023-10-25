import React from 'react';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

import { Container } from '../../../shared/components/layout/Container';

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.backgroundGray.main,
  height: '100%',
}));

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
}) => {
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <Wrapper>
        <Container notGutters>{children}</Container>
      </Wrapper>
    </Slide>
  );
};
