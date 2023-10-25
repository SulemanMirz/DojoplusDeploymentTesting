import React, { memo } from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const List = styled('ul')({
  padding: 0,
  margin: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const Item = styled('li')(({ theme }) => ({
  width: 'calc(100% / 7)',
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
}));

interface DayWrapperProps {
  isCurrentMount?: boolean;
  isCurrent?: boolean;
  isSelected?: boolean;
  isCurrentSeleted?: boolean;
}

const colorHandler = (params: DayWrapperProps): string => {
  const { isCurrentMount, isCurrent, isCurrentSeleted } = params;
  let color = '';
  if (isCurrentMount) {
    if (isCurrent || isCurrentSeleted) {
      color = '#fff';
    } else {
      color = '#E0E0E0';
    }
  } else {
    color = '#4F4F4F';
  }
  return color;
};

const bgColorHandler = (params: DayWrapperProps): string => {
  const { isSelected, isCurrentSeleted } = params;
  let color = '';
  if (isSelected) {
    color = '#3C3C3C';
  } else {
    color = 'none';
  }
  if (isCurrentSeleted) {
    color = '#D21632';
  }
  return color;
};

const DayWrapper = styled('span')<DayWrapperProps>(
  ({ isCurrent, isCurrentMount, isSelected, isCurrentSeleted, theme }) => ({
    // eslint-disable-next-line no-nested-ternary
    color: colorHandler({ isCurrent, isCurrentMount, isCurrentSeleted }),
    fontWeight: isCurrent ? 'bold' : 'inherit',
    fontSize: 16,
    lineHeight: '20px',
    fontFamily: 'inherit',
    cursor: isSelected ? 'pointer' : 'not-allowed',
    backgroundColor: bgColorHandler({ isCurrentSeleted, isSelected }),
    borderRadius: '50%',
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      width: 35,
      height: 35,
    },
  }),
);

interface CalendarDaysItemProps extends DayWrapperProps {
  onClick: () => void;
  day: number;
}

export const CalendarDaysItem: React.FC<CalendarDaysItemProps> = ({
  onClick,
  day,
  ...props
}) => (
  <Item>
    <DayWrapper onClick={onClick} {...props}>
      {day}
    </DayWrapper>
  </Item>
);

type CalenderDatListProps = {
  children: React.ReactNode;
};

export const CalendarDaysList = memo(({ children }: CalenderDatListProps) => (
  <Container>
    <List>{children}</List>
  </Container>
));
