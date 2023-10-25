import * as React from 'react';
import styled from 'styled-components';
import { TextWhite24CapitalizeBold } from '../../../shared/components/texts';
import {
  PlanButtonContent,
  ScheduleItem,
  ScheduleItemWrapper,
  TextGray12Regular,
} from './CardPlan';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';
import { Product } from '../../../shared/models/school.model';

export const TextWhite14UppercaseRegular = styled.p`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;

const Item = styled.div`
  display: flex;
  padding-top: 12px;
  display: flex;
  align-items: center;
`;

const PlanButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  background: #d21632;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  cursor: pointer;
  margin-top: 12px;
`;

type CardPlanProps = {
  data: Product;
  name: string;
  description?: string;
  amount?: string;
  term?: string;
  onClick?: (planId: string) => void;
  id: string;
  index: number;
};

const CardPlanDetail: React.FC<CardPlanProps> = ({
  data,
  name,
  amount,
  term,
  description,
  onClick,
  id,
  index,
}): JSX.Element => {
  return (
    <ScheduleItem>
      <ScheduleItemWrapper>
        <TextWhite14UppercaseRegular>{`${data.category.name} • ${name}`}</TextWhite14UppercaseRegular>
        <Item>
          <TextWhite24CapitalizeBold
            style={{
              whiteSpace: 'pre',
            }}>{`${amount} `}</TextWhite24CapitalizeBold>
          {term && !term.includes('undefined') && (
            <TextGray12Regular style={{ paddingTop: 0 }}>
              {term}
            </TextGray12Regular>
          )}
        </Item>
        <TextGray12Regular>{description}</TextGray12Regular>
        <PlanButtonWrapper onClick={() => onClick(id)}>
          <PlanButtonContent>view membership plans</PlanButtonContent>
        </PlanButtonWrapper>
      </ScheduleItemWrapper>
    </ScheduleItem>
  );
};

export default CardPlanDetail;
