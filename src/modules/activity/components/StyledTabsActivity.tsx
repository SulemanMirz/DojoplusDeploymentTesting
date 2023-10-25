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
  backgroundColor: '#282828',
  position: 'relative',
  width: '92%',
  zIndex: 10,
  borderRadius: 4,
  minHeight: '56px',
  padding: 8,
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
  },
  '& .MuiTabs-flexContainer': {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

interface StyledTabProps {
  label?: string;
  value: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <TabMUI disableRipple {...props} />
))(() => ({
  margin: '0px',
  padding: '0px',
  maxHeight: 'auto',
  maxWidth: '23%',
  fontFamily: 'Saira',
  fontWeight: 400,
  fontSize: 14,
  color: '#fcfcfc',
  '&.Mui-selected': {
    backgroundColor: '#4f4f4f',
    color: '#fcfcfc',
    borderRadius: 4,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
  '&.MuiTab-root': {
    fontFamily: 'Saira',
    fontWeight: 400,
    fontSize: 14,
    textTransform: 'capitalize',
    minHeight: '40px',
    minWidth: '80px',
  },
}));
