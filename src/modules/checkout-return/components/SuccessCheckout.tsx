import React from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

import {
  TextGray18CapitalizeThin,
  TextGray12,
} from '../../../shared/components/texts';

const Title = styled(TextGray18CapitalizeThin)`
  margin-top: 1rem;
  font-size: 24px;
`;

const SubTitle = styled(TextGray12)`
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Icon = styled(CheckCircleIcon)`
  width: 120px !important;
  height: 120px !important;
  color: #73d13d;
`;

type SuccessCheckoutProps = {
  onClick?: () => void;
};

export const SuccessCheckout: React.FC<SuccessCheckoutProps> = ({
  onClick,
}) => (
  <>
    <Icon />
    <Title>Payment Confirmed!!</Title>
    <SubTitle>Your transaction has been completed successfully</SubTitle>
    <Button onClick={onClick} variant="contained">
      Continue
    </Button>
  </>
);
