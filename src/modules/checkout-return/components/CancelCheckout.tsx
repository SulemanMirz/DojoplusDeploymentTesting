import React from 'react';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';
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

const Icon = styled(CancelIcon)`
  width: 120px !important;
  height: 120px !important;
  color: #ff4d4f;
`;

type CancelCheckoutProps = {
  onClick?: () => void;
};

export const CancelCheckout: React.FC<CancelCheckoutProps> = ({ onClick }) => (
  <>
    <Icon />
    <Title>Payment Canceled!!</Title>
    <SubTitle>Session checkout has been cancel</SubTitle>
    <Button onClick={onClick} variant="contained">
      Continue
    </Button>
  </>
);
