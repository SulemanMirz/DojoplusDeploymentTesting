import React from 'react';
import styled from 'styled-components';
import PlansCard from './Components/PlansCard';
import { Plans } from '../../../shared/models/school.model';

const Wrapper = styled.div`
  margin-top: 18px;
  padding-inline: 16px;
  border-radius: 4px;
  max-height: calc(100vh - 10px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;

type MorePlansProps = {
  plansData?: Plans[];
};

const MorePlans: React.FC<MorePlansProps> = ({ plansData }) => {
  return (
    <Wrapper>
      {plansData?.map((data) => {
        return <PlansCard plans={data} />;
      })}
    </Wrapper>
  );
};

export default MorePlans;
