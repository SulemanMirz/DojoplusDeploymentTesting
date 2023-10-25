import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const Content = styled.div<{
  maxWidth: string;
  isFluid?: boolean;
  isFlexGrow?: boolean;
  notGutters?: boolean;
}>`
  width: 100%;
  margin: ${({ isFluid }) => (isFluid ? 'none' : 'auto')};
  padding: ${({ isFluid, notGutters }) =>
    isFluid || notGutters ? '0px' : '0 24px'};
  max-width: ${({ maxWidth }) => maxWidth};
  flex: ${({ isFlexGrow }) => (isFlexGrow ? 1 : 'initial')};
`;

type ContainerProps = {
  isFluid?: boolean;
  isFlexGrow?: boolean;
  notGutters?: boolean;
  style?: any;
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  isFluid,
  isFlexGrow,
  notGutters,
  style,
}) => {
  const { breakpoints } = useTheme();
  const maxWidthValue = isFluid ? '100%' : `${breakpoints.values.md}px`;
  return (
    <Content
      {...(style && { style: { ...style } })}
      notGutters={notGutters}
      isFlexGrow={isFlexGrow}
      isFluid={isFluid}
      maxWidth={maxWidthValue}>
      {children}
    </Content>
  );
};
