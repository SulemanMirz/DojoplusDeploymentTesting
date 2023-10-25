import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { Title } from '../../../shared/components/Title';
import { StyledTab, StyledTabs } from './StyledTabsActivity';

interface ActivityTabsProps {
  username: string;
}

export const ActivityTabs: React.FC<ActivityTabsProps> = ({ username }) => {
  const { push, query } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const slug = query?.slots;
  const tab = (slug as string) || '';

  const handleChange = useCallback(
    (_, newValue) => {
      push(`/${username}/activity/${newValue}`, null, {
        shallow: true,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push],
  );
  const { t } = useTranslation('common');
  const Week = t('Week');
  const Month = t('Month');
  const Year = t('Year');
  const AllTime = t('AllTime');
  return (
    <>
      <Title name="Activity" slug={tab} />
      <StyledTabs
        onChange={handleChange}
        variant={matches ? 'fullWidth' : 'scrollable'}>
        <StyledTab label={Week} value="week" />
        <StyledTab label={Month} value="month" />
        <StyledTab label={Year} value="year" />
        <StyledTab label={AllTime} value="all-time" />
      </StyledTabs>
    </>
  );
};
