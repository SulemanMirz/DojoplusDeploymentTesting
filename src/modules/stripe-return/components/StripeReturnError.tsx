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

type StripeReturnErrorProps = {
  onClick?: () => void;
  message: string;
  title: string;
};

export const StripeReturnError: React.FC<StripeReturnErrorProps> = ({
  onClick,
  message,
  title,
}) => (
  <>
    <Icon />
    <Title>{title}</Title>
    <SubTitle>{message}</SubTitle>
    <Button variant="contained" onClick={onClick}>
      Continue
    </Button>
  </>
);
