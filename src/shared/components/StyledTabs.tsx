import React from 'react';
import { styled } from '@mui/material/styles';
import TabMUI from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';

interface StyledTabsProps {
  children?: React.ReactNode;
  value?: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant: 'fullWidth' | 'standard' | 'scrollable';
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <TabList
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  backgroundColor: '#111',
  position: 'sticky',
  top: '85px',
  zIndex: 10,
  boxShadow: '0px 3px 0px rgba(24, 24, 24, 0.35)',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    transform: 'scale(2.5) translate(0px, -0.6px)',
    maxWidth: 10,
    backgroundColor: 'red',
  },
});

interface StyledTabProps {
  label?: string;
  value: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <TabMUI disableRipple {...props} />
))(({ theme }) => ({
  margin: 'auto',
  color: theme.palette.grey['500'],
  '&.Mui-selected': {
    color: '#fcfcfc',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));
