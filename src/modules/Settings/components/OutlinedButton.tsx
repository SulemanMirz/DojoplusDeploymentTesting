import * as React from 'react';
import styled from 'styled-components';

export const ScheduleItem = styled.div`
  padding: 16px;
  font-size: 12px;
  background-color: #333333;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const ScheduleItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextGray12Regular = styled.p`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: #828282;
  font-weight: 400;
  line-height: 14px;
  padding-top: 12px;
  margin: 0px;
`;

const PlanButtonWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  border: 1px solid #4f4f4f;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 12px 16px 0px;
  cursor: pointer;
`;

export const PlanButtonContent = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: #fcfcfc;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
`;

type OutlineButtonProps = {
  name: string;
  setSelected: () => void;
  Icon?: JSX.Element;
  onClick?: () => void;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({
  name,
  Icon,
  setSelected,
  onClick,
}): JSX.Element => {
  return (
    <PlanButtonWrapper
      onClick={() => {
        setSelected();
        onClick();
      }}>
      {Icon && React.cloneElement(Icon)}
      <PlanButtonContent>{name}</PlanButtonContent>
    </PlanButtonWrapper>
  );
};

export default OutlineButton;
