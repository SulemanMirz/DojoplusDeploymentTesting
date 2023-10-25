import React from 'react';
import { useTranslation } from 'react-i18next';
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
});

type PrivateClassLayoutProps = {
  children: React.ReactNode;
  onPressBack?: () => void;
};

export const PrivateClassLayout: React.FC<PrivateClassLayoutProps> = ({
  children,
  onPressBack,
}) => {
  const { t } = useTranslation();
  const PrivateClass = t('PrivateClass');
  return (
    <Slide in direction="up" mountOnEnter unmountOnExit>
      <Wrapper>
        <Header>
          <Title>{PrivateClass}</Title>
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
