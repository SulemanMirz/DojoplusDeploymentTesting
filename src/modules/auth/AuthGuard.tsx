import { CircularProgress } from '@mui/material';
import router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useFireBaseAuth } from '../../context/FirebaseContext';

const Container = styled.div``;
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types, jsdoc/require-jsdoc
function AuthGuard({ children }) {
  const { schoolInfo, isInitialized } = useFireBaseAuth();

  if (!isInitialized) {
    return (
      <LoadingWrapper>
        <CircularProgress size={20} />
      </LoadingWrapper>
    );
  }

  if (
    (!schoolInfo || (schoolInfo && !Object.keys(schoolInfo).length)) &&
    typeof window !== 'undefined'
  ) {
    router.push('/home');
    return null;
  }

  return <Container>{children}</Container>;
}

export default AuthGuard;
