import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import IconLock from '@mui/icons-material/Lock';
import { TextWhite18UppercaseRegular } from '../../../shared/components/texts';

const Container = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid;
  border-bottom-color: ${({ color }) => color};
  margin-bottom: 8px;
  padding-bottom: 6px;
`;

export const LockIcon = styled(IconLock)`
  color: #d9d9d9;
  font-size: 16px !important;
  margin-left: 14px;
`;

type TitleSectionProps = {
  title: string;
  icon?: React.ReactNode;
  style?: any;
};

export const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  icon,
  style,
}) => {
  const theme = useTheme();
  return (
    <Container color={theme.palette.divider} style={style}>
      <TextWhite18UppercaseRegular>{title}</TextWhite18UppercaseRegular>
      {icon}
    </Container>
  );
};
