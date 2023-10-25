import * as React from 'react';
import styled from 'styled-components';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';

const TitleWrapper = styled.p`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 500;
  margin: 0;
  line-height: 18px;
`;
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
  margin-top: 12px;
  cursor: pointer;
`;

export const PlanButtonContent = styled.p`
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
  margin: 0px;
`;

type CardPlanProps = {
  name: string;
  description?: string;
  id: string;
  setSelected: (id: string) => void;
};

const CardPlan: React.FC<CardPlanProps> = ({
  name,
  description,
  id,
  setSelected,
}): JSX.Element => {
  return (
    <ScheduleItem>
      <ScheduleItemWrapper>
        <TitleWrapper>{name}</TitleWrapper>
        {description && <TextGray12Regular>{description}</TextGray12Regular>}
        <PlanButtonWrapper onClick={() => setSelected(id)}>
          <PlanButtonContent>view membership plans</PlanButtonContent>
        </PlanButtonWrapper>
      </ScheduleItemWrapper>
    </ScheduleItem>
  );
};

export default CardPlan;
