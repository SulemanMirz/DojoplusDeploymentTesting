import React from 'react';
import { styled, Breakpoint } from '@mui/material/styles';
import ContainerMUI from '@mui/material/Container';

const Container = styled(ContainerMUI)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundDarkGray.main,
  paddingTop: theme.spacing(12),
  flex: 1,
  display: 'flex',
  overflow: 'scroll',
  paddingLeft: 0,
  paddingRight: 0,
}));

const Content = styled(ContainerMUI)({
  flex: 1,
  padding: 0,
  height: '100%',
});

type Props = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: Breakpoint | false;
  bg?: boolean | undefined;
};

export const Layout: React.FC<Props> = ({
  children,
  header,
  footer,
  maxWidth,
  bg,
}) => {
  const maxWidthValue = typeof maxWidth === 'undefined' ? 'md' : maxWidth;
  return (
    <>
      {header}
      <Container maxWidth={false} className={bg ? 'bg-background' : ''}>
        <Content maxWidth={maxWidthValue}>{children}</Content>
      </Container>
      {footer}
    </>
  );
};
