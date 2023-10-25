import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileTabLoading: React.FC = () => {
  return (
    <LoaderContainer>
      <CircularProgress size={20} />
    </LoaderContainer>
  );
};
