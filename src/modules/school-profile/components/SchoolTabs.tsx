import { useMediaQuery } from '@mui/material';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { StyledTab, StyledTabs } from '../../../shared/components/StyledTabs';

const Container = styled.div`
  position: sticky;
  top: 147px;
  z-index: 2;
`;

const SchoolTabs: React.FC = () => {
  const { push, query } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const handleChange = useCallback(
    (_, newValue) => {
      push(
        `/school/${query.schoolId}/${newValue}${
          query.returnTo ? `?returnTo=${query.returnTo}` : ''
        }`,
        null,
        {
          shallow: true,
        },
      );
    },
    [push, query.returnTo, query.schoolId],
  );
  return (
    <Container>
      <StyledTabs
        onChange={handleChange}
        variant={matches ? 'fullWidth' : 'scrollable'}
      >
        <StyledTab label="INFO" value="info" />
        <StyledTab label="SCHEDULE" value="schedules" />
        <StyledTab label="PLANS" value="plan" />
        <StyledTab label="REVIEWS" value="reviews" />
        <StyledTab label="LEADERBOARD" value="leaderboard" />
        <StyledTab label="MEMBERS" value="members" />
      </StyledTabs>
    </Container>
  );
};

export default SchoolTabs;
