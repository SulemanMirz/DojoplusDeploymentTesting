import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

import { Container } from '../../../shared/components/layout/Container';
import { TextWhite24CapitalizeBold } from '../../../shared/components/texts';

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.backgroundGray.main,
  height: '100%',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
}));

const Header = styled('header')({
  display: 'flex',
  padding: '1rem',
});

const Title = styled(TextWhite24CapitalizeBold)({
  margin: 'auto',

  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-line-clamp': '1',
  '-webkit-box-orient': 'vertical',
});

type SeminarLayoutProps = {
  onPressBack?: () => void;
  title: string;
  children: React.ReactNode;
};

export const SeminarLayout: React.FC<SeminarLayoutProps> = ({
  children,
  onPressBack,
  title,
}) => {
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <Wrapper>
        <Header>
          <Title>{title}</Title>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={onPressBack}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Container notGutters>{children}</Container>
      </Wrapper>
    </Slide>
  );
};
