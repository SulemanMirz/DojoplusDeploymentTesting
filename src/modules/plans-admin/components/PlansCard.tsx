import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Donut from '../../../shared/components/Donut';
import {
  TextGray10UppercaseRegular,
  TextGray14Thin,
  TextWhite18CapitalizeBold,
  TextWhite18Regular400,
} from '../../../shared/components/texts';
import { PlanSubscriber } from '../../../shared/models/school.model';
import { buttonStylesTransparent } from '../../../shared/styles/Button-style';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  width: 100%;
  padding: 14px 20px 24px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 9px;
`;

const AmountCont = styled.div`
  margin-top: 22px;
`;

const DetailsCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 22px;
`;

const NumberDescriptionCont = styled.span`
  display: flex;
  flex-direction: column;
`;

const UsersNumberText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 120%;
  text-align: center;
  color: #ffffff;
`;

type PlanCardProps = {
  planName: string | string[];
  planDescription: string | string[];
  price: number | string;
  planType: string;
  subscribers: PlanSubscriber[];
  overdue?: PlanSubscriber[];
  onDetailsClick: () => void;
};

const PlansCard: React.FC<PlanCardProps> = ({
  planName,
  planDescription,
  price,
  planType,
  subscribers,
  overdue,
  onDetailsClick,
}) => {
  const { t } = useTranslation();
  const month = t('Month').toLocaleLowerCase();
  const Details = t('Details');
  const Active = t('Active');
  const Overdue = t('Overdue');

  return (
    <CardContainer>
      <TextWhite18CapitalizeBold>{planName}</TextWhite18CapitalizeBold>
      <TextGray14Thin>{planDescription}</TextGray14Thin>
      <AmountCont>
        <TextWhite18Regular400>{`$${price}  `}</TextWhite18Regular400>
        {planType === 'Recurring' && (
          <TextGray14Thin>{`/ ${month}`}</TextGray14Thin>
        )}
      </AmountCont>
      <DetailsCont>
        <Donut
          data={
            subscribers.length
              ? [
                {
                  value: subscribers?.length - (overdue?.length || 0) || 1,
                  color: '#7062FF',
                },
                { value: overdue?.length || 0, color: '#D4FE44' },
              ]
              : [{ value: 1, color: '#484847' }]
          }
          graphRadius={24.5}
          viewSize={50}
        />
        <NumberDescriptionCont>
          <UsersNumberText>{subscribers?.length || 0}</UsersNumberText>
          <TextGray10UppercaseRegular>{Active}</TextGray10UppercaseRegular>
        </NumberDescriptionCont>
        <NumberDescriptionCont>
          <UsersNumberText>0</UsersNumberText>
          <TextGray10UppercaseRegular>{Overdue}</TextGray10UppercaseRegular>
        </NumberDescriptionCont>
        <Button
          color="secondary"
          variant="contained"
          sx={buttonStylesTransparent}
          onClick={onDetailsClick}
        >
          {Details}
        </Button>
      </DetailsCont>
    </CardContainer>
  );
};

export default PlansCard;
