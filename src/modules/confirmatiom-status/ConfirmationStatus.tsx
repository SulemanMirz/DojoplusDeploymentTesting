import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { StripeReturnError } from '../stripe-return/components/StripeReturnError';
import { StripeReturnSuccess } from '../stripe-return/components/StripeReturnSuccess';

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

export const ConfirmationStatus: React.FC<{
  title: string;
  message: string;
  success?: boolean;
}> = ({ title, message, success }) => {
  const { authUser } = useFirebaseAuth();
  const username = authUser?.userInfo?.username;

  const { t } = useTranslation();
  const Success = t('Success');
  const Successfull = t('Successfull');
  const Failure = t('Failure');
  const Failed = t('Failed');

  const onClick = (): void => {
    window.location.replace(username || 'login');
  };

  return (
    <Container>
      <Content>
        {success ? (
          <StripeReturnSuccess
            title={title || Success}
            message={message || Successfull}
            onClick={onClick}
          />
        ) : (
          <StripeReturnError
            title={title || Failure}
            message={message || Failed}
            onClick={onClick}
          />
        )}
      </Content>
    </Container>
  );
};
