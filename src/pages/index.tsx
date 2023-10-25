import React, { FC, useEffect, useState } from 'react';
import router from 'next/router';
import styled from 'styled-components';

import { COLOR_BACKGROUND_DARK_LIGHT } from '../shared/styles/colors';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { ProfileTabLoading } from '../shared/components/TabLoading';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #282828;
`;

const App: FC = () => {
  const { authUser, loading } = useFirebaseAuth();
  const username = authUser?.userInfo?.username;
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!authUser && !username) {
        setisLoading(true);
        window.location.replace('https://on.dojo.plus/');
      } else {
        setisLoading(true);
        router.push('/home');
      }
    }
  }, [authUser, username, loading]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: COLOR_BACKGROUND_DARK_LIGHT,
      }}
    >
      {(isLoading || loading) && (
        <LoadingWrapper>
          {/* {!(authUser && username) && <ProfileTabLoading />} */}
          <ProfileTabLoading />
        </LoadingWrapper>
      )}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   // window.location.href='http://localhost:3000/home';
//   return {
//     redirect: {
//       // destination: 'https://on.dojo.plus',
//       destination: 'http://localhost:3000/home',
//       permanent: true,
//     },
//   };
// };

export default App;
