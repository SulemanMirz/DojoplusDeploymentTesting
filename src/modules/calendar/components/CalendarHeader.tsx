import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { TextWhite18UppercaseRegular } from '../../../shared/components/texts';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 3rem',
  marginBottom: 16,
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

const BackIcon = styled(ArrowBackIosIcon)({
  fontSize: 18,
  cursor: 'pointer',
});

const NextIcon = styled(ArrowForwardIosIcon)({
  fontSize: 18,
  cursor: 'pointer',
});

type CalendarHeaderProps = {
  label: string;
  onPressNext: () => void;
  onPressBack: () => void;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  label,
  onPressBack,
  onPressNext,
}) => {
  return (
    <Container>
      <BackIcon onClick={onPressBack} />
      <TextWhite18UppercaseRegular>{label}</TextWhite18UppercaseRegular>
      <NextIcon onClick={onPressNext} />
    </Container>
  );
};
