import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  width: 132px;
  height: 40px;
  border: 1px solid #4f4f4f;
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
`;

const Label = styled.p`
  height: 16px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcfcfc;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

type SeminarsProps = {
  onClick: () => void;
};

export const BuyTicketsButton: React.FC<SeminarsProps> = ({ onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <Label>Details</Label>
    </ButtonWrapper>
  );
};
