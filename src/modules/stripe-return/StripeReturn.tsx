import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { StripeReturnSuccess } from './components/StripeReturnSuccess';
import { StripeReturnError } from './components/StripeReturnError';

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

const SUCCESS_MESSAGE = {
  checkout: {
    title: 'Payment Confirmed!!',
    content: ' Your transaction has been completed successfully',
  },
  accountlink: {
    title: 'Stripe Bank Account',
    content: 'Stripe bank account updated successfully',
  },
  portal: {
    title: 'Stripe Portal',
    content: 'Session end Go back to app',
  },
  default: {
    title: 'Return to app',
    content: 'Go back to the app',
  },
};

const ERROR_MESSAGE = {
  checkout: {
    title: 'Payment Canceled!!',
    content: ' Session checkout has been cancel',
  },
  default: {
    title: 'Something is wrong',
    content: 'Go back to the app',
  },
};

export const StripeReturn: React.FC = () => {
  const { query } = useRouter();
  const message =
    typeof query.from === 'string' && SUCCESS_MESSAGE[query.from]
      ? SUCCESS_MESSAGE[query.from]
      : SUCCESS_MESSAGE.default;
  const errorMessage =
    typeof query.from === 'string' && ERROR_MESSAGE[query.from]
      ? ERROR_MESSAGE[query.from]
      : ERROR_MESSAGE.default;

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
          <StripeReturnSuccess
            title={message.title}
            message={message.content}
            onClick={onClick}
          />
        ) : (
          <StripeReturnError
            title={errorMessage.title}
            message={errorMessage.content}
            onClick={onClick}
          />
        )}
      </Content>
    </Container>
  );
};
