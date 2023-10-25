import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { SuccessCheckout } from './components/SuccessCheckout';
import { CancelCheckout } from './components/CancelCheckout';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 1.5rem 3rem;
  border-radius: 5px;
  min-width: 350px;
`;

const STATUS = {
  cancel: 'cancel',
  success: 'success',
};

export const CheckoutReturn: React.FC = () => {
  const { query } = useRouter();

  const onClick = (): void => {
    if (window && query.returnTo) {
      window.location.replace(query.returnTo as string);
    }
  };

  if (!query.returnTo || !query.status || !STATUS[query.status as string]) {
    return <Container>ups!! something is wrong :(</Container>;
  }

  return (
    <Container>
      <Content>
        {query.status === 'success' ? (
          <SuccessCheckout onClick={onClick} />
        ) : (
          <CancelCheckout onClick={onClick} />
        )}
      </Content>
    </Container>
  );
};
