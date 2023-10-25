import React from 'react';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

import { Container } from '../../../shared/components/layout/Container';
import { RankDetailsHeader } from '../../ranks/components/RankDetailsHeader';
import { FixedContainer } from '../../ranks/components/ranks-styled';

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.backgroundGray.main,
  height: '100%',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
}));

const Header = styled('header')({
  display: 'flex',
});

type AddRankLayoutProps = {
  title: string;
  children: React.ReactNode;
  onPressBack?: () => void;
};

export const AddRankLayout: React.FC<AddRankLayoutProps> = ({
  title,
  children,
  onPressBack,
}) => {
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <Wrapper>
        <Header>
          <FixedContainer />
          <RankDetailsHeader onClick={onPressBack} title={title || ''} />
        </Header>
        <Container notGutters>{children}</Container>
      </Wrapper>
    </Slide>
  );
};
