import React, { memo } from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 0),
}));

const List = styled('ul')({
  padding: 0,
  margin: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

const Item = styled('li')(({ theme }) => ({
  width: 'calc(100% / 7)',
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  fontSize: 14,
  lineHeight: '20px',
  color: theme.palette.inputColorDark.main,
  borderBottom: '1px solid #404040',
  paddingBottom: theme.spacing(2.5),
}));

type CalendarHeaderProps = {
  days: string[];
};

export const CalendarDays = memo<CalendarHeaderProps>(({ days }) => (
  <Container>
    <List>
      {days.map((day) => (
        <Item key={day}>{day}</Item>
      ))}
    </List>
  </Container>
));
