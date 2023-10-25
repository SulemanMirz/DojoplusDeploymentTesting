import React from 'react';
import styled from 'styled-components';
import { PlanCard } from '../components/PlanCard';

export const Content = styled.div`
  height: 100vh;
  max-width: 768px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  padding-bottom: 100px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`;

export const ContentSpacing = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
`;

const SchoolPlanListView: React.FC = () => {
  return (
    <Content>
      <ContentSpacing>
        <PlanCard
          price="$99.00"
          offer="$199.00"
          name="1 year  ADULT JIU-JITSU"
          recommended
        />
        <PlanCard price="$99.00" offer="$199.00" name="6 month" />
        <PlanCard price="$99.00" offer="$199.00" name="month  by month" />
        <PlanCard price="$99.00" offer="$199.00" name="month  by month" />
      </ContentSpacing>
    </Content>
  );
};

export default SchoolPlanListView;
