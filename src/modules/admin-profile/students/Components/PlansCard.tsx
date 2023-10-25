import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { Plans } from '../../../../shared/models/school.model';

const PlansContainer = styled.div`
  height: 112px;
  width: 100%;
  margin-top: 8px;
  background-color: #3c3c3c;
  padding-inline: 22px;
  padding-block: 16px;
  border-radius: 4px;
`;

const PlansHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PlansCategoryContainer = styled.div``;

const PlansCategory = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #fcfcfc;
  max-width: calc(100vw - 180px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlansDate = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #828282;
`;

const PlansPrice = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
type PlansCardProps = {
  plans?: Plans;
};

const PlansCard: React.FC<PlansCardProps> = ({ plans }) => {
  return (
    <PlansContainer>
      <PlansHeader>
        <PlansCategoryContainer>
          <PlansCategory>{plans?.planNameFromPlan?.[0]}</PlansCategory>
          <PlansDate>
            since{' '}
            {new Date(plans?.createdTime).toLocaleString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </PlansDate>
        </PlansCategoryContainer>
        <Button
          color="secondary"
          sx={{
            width: '61px',
            height: '33px',
            backgroundColor: '#7062FF',
            borderRadius: '6px',
            color: '#FCFCFC',
            fontSize: '10px',
            fontWeight: '600',
            padding: '8px',
          }}
        >
          ACTIVATE
        </Button>
      </PlansHeader>
      <PlansPrice>{plans?.priceFromPlan[0]}/month</PlansPrice>
    </PlansContainer>
  );
};

export default PlansCard;
